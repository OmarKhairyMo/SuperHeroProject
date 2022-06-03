import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getMovieListBySearch, getMovieListByTitle} from '../api/helpers';
import {Loader} from '../components/Loader';
import SearchBar from '../components/SearchBar';
import {appColors} from '../utils/theme/colors';

const SEARCH_DEBOUNCE_DURATION = 600; //ms

const {height, width} = Dimensions.get('window');

const RandomMovies = ({route}) => {
  const {heroName, heroPoster} = route.params;
  const [movieList, setMovieList] = useState([]);
  const [term, setTerm] = useState('');
  const [isloading, setLoading] = useState(true);
  const [isError, setError] = useState(false); // Request Error
  const [searchError, setSearchError] = useState(false); // Search Not Found

  // console.log(movieList, 'This is the hero name ?');
  const fetchData = async searchTerm => {
    setLoading(true);
    try {
      const data = await axios.get(
        searchTerm
          ? getMovieListBySearch(searchTerm)
          : getMovieListByTitle(heroName),
      );
      // handle Wrong Search
      if (data?.data?.Response === 'False') {
        setSearchError(true);
        setMovieList([]);
      } else {
        setSearchError(false);
        setMovieList(searchTerm ? [data.data] : data.data.Search);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // side effect to fetch data on mount and when the user stop typing for 400 ms
  useEffect(() => {
    if (term) {
      const searchDebounce = setTimeout(() => {
        fetchData(term);
      }, SEARCH_DEBOUNCE_DURATION);

      return () => clearTimeout(searchDebounce);
    } else {
      fetchData(term);
    }
  }, [term]);

  if (isloading) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      <SearchBar value={term} onChangeText={e => setTerm(e)} />
      <Image
        blurRadius={20}
        source={{uri: heroPoster}}
        style={[StyleSheet.absoluteFillObject, {opacity: 0.9}]}
      />

      {/* list of Movies */}
      {searchError ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: appColors.white, fontSize: 24}}>
            Search Not Found
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            ListHeaderComponent={() => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 100,
                }}>
                <Text
                  style={{
                    fontSize: 34,
                    fontWeight: 'bold',
                    color: appColors.white,
                  }}>
                  {heroName}
                </Text>
                <Text style={{color: appColors.white, marginTop: 15}}>
                  Choose your favourit {heroName} movie
                </Text>
              </View>
            )}
            data={movieList}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  width: width / 2.3,
                  marginHorizontal: 10,
                  borderRadius: 15,
                  height: 250,
                  marginTop: 20,
                  marginBottom: index === movieList.length - 1 ? 30 : 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.34,
                  shadowRadius: 6.27,

                  elevation: 10,
                }}>
                <Image
                  style={{width: '100%', height: '100%', borderRadius: 15}}
                  source={
                    item.Poster === 'N/A'
                      ? require('../assets/img/noposter.jpg')
                      : {uri: item.Poster}
                  }
                />
              </TouchableOpacity>
            )}
            keyExtractor={(_, index) => `${index}`}
          />
        </>
      )}
    </View>
  );
};

export default RandomMovies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
  },
});
