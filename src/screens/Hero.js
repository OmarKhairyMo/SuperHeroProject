import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationKey} from '../navigation/NavigationKey';
import {SUPER_HEROS_LIST} from '../utils/constants/SuperHerosList';
import {appColors} from '../utils/theme/colors';

const SPACING = 10;

const {width} = Dimensions.get('window');

const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Hero = ({navigation}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Text
        style={{
          position: 'absolute',
          top: 90,
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 22,
          color: appColors.black,
        }}>
        Choose Your Favourite Superhero
      </Text>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        data={SUPER_HEROS_LIST}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={item => item.key || item.id}
        horizontal
        decelerationRate={0}
        bounces={false}
        snapToInterval={ITEM_SIZE}
        contentContainerStyle={{alignItems: 'center'}}
        renderItem={({item, index}) => {
          if (!item.poster) {
            return <View style={{width: SPACER_ITEM_SIZE}} />;
          }
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [75, 25, 75],
          });
          return (
            <Animated.View
              style={{
                width: ITEM_SIZE,
                transform: [{translateY}],
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(NavigationKey.RandomMovies, {
                    heroName: item.title,
                    heroPoster: item.poster,
                  })
                }
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  backgroundColor: appColors.white,
                  borderRadius: 34,
                }}>
                <View style={styles.posterImage}>
                  <Image
                    source={{uri: item.poster}}
                    style={styles.posterImage}
                  />
                </View>

                <Text
                  style={{fontSize: 24, color: appColors.black}}
                  numberOfLines={1}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          width: 120,
          height: 50,
          backgroundColor: appColors.primary,
          marginBottom: SPACING,
          borderRadius: 8,
        }}>
        <Text style={{color: 'white'}}>Random Hero</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
    overflow: 'hidden',
  },
});
