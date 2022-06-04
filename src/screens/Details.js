import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {getSingleMovie} from '../api/helpers';
import {appColors} from '../utils/theme/colors';
const SPACING = 15;

const Details = ({route}) => {
  const {movieID, movieList} = route.params;
  const [currentMovie, setCurrentMovie] = useState({});

  const fetchSingleMovie = async id => {
    try {
      const data = await axios.get(getSingleMovie(id));
      setCurrentMovie(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(currentMovie);
  const handleRandomMovie = () => {
    let rand = movieList[(Math.random() * movieList?.length) | 0];
    fetchSingleMovie(rand.imdbID);
  };
  useEffect(() => {
    fetchSingleMovie(movieID);
  }, [movieID]);

  return (
    <>
      <View style={[StyleSheet.absoluteFillObject]}>
        <View style={[StyleSheet.absoluteFillObject]}>
          <Image
            source={{uri: currentMovie.Poster}}
            style={[StyleSheet.absoluteFillObject]}
          />
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>{currentMovie.Title}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.lengthStyle}>Length: {currentMovie.Runtime}</Text>
          <Text style={[styles.lengthStyle, {marginLeft: 10}]}>
            Released:{currentMovie.Released}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            width: 45,
            height: 5,
            marginTop: 20,
          }}
        />

        <View style={{marginVertical: SPACING}}>
          <View style={{flexDirection: 'row', marginVertical: SPACING}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: appColors.white,
                fontSize: 18,
              }}>
              Rating: {currentMovie.imdbRating}
            </Text>
          </View>
          <Text style={{color: appColors.white}}>{currentMovie.Plot}</Text>
        </View>

        <TouchableOpacity
          onPress={() => handleRandomMovie()}
          style={{
            height: 60,
            width: 60,
            borderRadius: 60,
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            left: 15,
          }}>
          <Icon name="caretright" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  titleContainer: {
    // height: Dimensions.get('window').height / 2.5,
    marginTop: 50,
    paddingHorizontal: SPACING,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 34,
    color: 'white',
    textTransform: 'uppercase',
  },
  lengthStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: appColors.white,
    opacity: 0.7,
    paddingTop: 5,
  },
  fotter: {
    paddingLeft: SPACING,
    justifyContent: 'flex-end',
    flex: 0.8,
  },
});
