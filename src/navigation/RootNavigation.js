import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useMemo} from 'react';
import {Image} from 'react-native';
import Details from '../screens/Details';
import Hero from '../screens/Hero';
import RandomMovies from '../screens/RandomMovies';
import {NavigationKey} from './NavigationKey';

export const Stack = createStackNavigator();

const rootScreenOptions = {
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerTitle: () => (
    <Image
      source={require('../assets/img/logo.png')}
      style={{width: 100, height: 50, resizeMode: 'contain'}}
    />
  ),
};

const RootNavigator = () => {
  const screens = useMemo(() => {
    return (
      <>
        <Stack.Screen
          options={rootScreenOptions}
          name={NavigationKey.Hero}
          component={Hero}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={NavigationKey.RandomMovies}
          component={RandomMovies}
        />
        <Stack.Screen name={NavigationKey.Details} component={Details} />
      </>
    );
  }, []);

  return (
    <Stack.Navigator screenOptions={rootScreenOptions}>
      {screens}
    </Stack.Navigator>
  );
};

export default () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);
