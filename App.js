import React from 'react';
import {StyleSheet} from 'react-native';
// import {Details, Home} from './src/screens';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import RootNavigation from './src/navigation/RootNavigation';
// import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <RootNavigation />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
});
