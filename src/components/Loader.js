import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {appColors} from '../utils/theme/colors';

export const Loader = ({color, size}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        color={color || appColors.primary}
        size={size || 'large'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
