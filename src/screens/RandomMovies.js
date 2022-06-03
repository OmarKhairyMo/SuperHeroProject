import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import {appColors} from '../utils/theme/colors';
import axios from 'axios';
import api from '../api/api';
import {getMovieListByTitle} from '../api/helpers';
import {Loader} from '../components/Loader';
const {height, width} = Dimensions.get('window');

const RandomMovies = ({route}) => {
  const {heroName, heroPoster} = route.params;
  console.log(heroName, 'This is the hero name ?');
  const [movieList, setMovieList] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await axios.get(getMovieListByTitle(heroName));
      setMovieList(data.data.Search);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (isloading) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      <SearchBar />
      <Image
        blurRadius={20}
        source={{uri: heroPoster}}
        style={[StyleSheet.absoluteFillObject, {opacity: 0.9}]}
      />

      {/* list of Movies */}

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
