import React from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {appColors} from '../utils/theme/colors';

const {height} = Dimensions.get('window');
const SearchBar = ({value}) => {
  return (
    <View style={styles.textContainer}>
      <TextInput
        placeholder="Search"
        value={value}
        style={styles.textInputStyle}
      />
      <Icon name="search1" size={24} color="black" />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  textContainer: {
    height: height * 0.08,
    width: '95%',
    marginTop: 15,
    backgroundColor: appColors.white,
    borderRadius: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  textInputStyle: {
    flex: 1,
    fontWeight: '500',
    fontSize: 18,
  },
});
