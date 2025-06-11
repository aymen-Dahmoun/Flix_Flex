import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MoviesListScreen from './screens/MoviesListScreen';
import SeriesListScreen from './screens/SeriesListScreen';
import DetailsScreen from './screens/DetailsScreen';
import SignInScreen from './screens/SignInScreen';
import ProfileScreen from './screens/ProfileScreen';

import { useAuth } from './context/AuthProvider';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createStackNavigator();
import MainLayout from './comps/MainLayout';
import FavoritesScreen from './screens/FavoritesScreen';

export default function MainRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={user ? 'Movies' : 'Login'} screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Movies">
            {() => (
              <MainLayout>
                <MoviesListScreen />
              </MainLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="Series">
            {() => (
              <MainLayout>
                <SeriesListScreen />
              </MainLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="Favorites">
            {() => (
              <MainLayout>
                <MoviesListScreen />
              </MainLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="Details">
            {(props) => (
              <MainLayout>
                <DetailsScreen {...props}/>
              </MainLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="Profile">
            {(props) => (
              <MainLayout>
                <ProfileScreen {...props}/>
              </MainLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="Favorite">
            {(props) => (
              <MainLayout>
                <FavoritesScreen {...props}/>
              </MainLayout>
            )}
          </Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name="Register" component={SignUpScreen} />
          <Stack.Screen name="Login" component={SignInScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}