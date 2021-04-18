import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import FavoritesCourses from '../pages/FavoritesCourses';
import Lessons from '../pages/Lessons';
import Lesson from '../pages/Lesson';

const App = createStackNavigator();

const Routes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#6548A3' },
    }}
  >
    <App.Screen name="SignIn" component={SignIn} />
    <App.Screen name="Home" component={Home} />
    <App.Screen name="Favorites" component={FavoritesCourses} />
    <App.Screen name="Lessons" component={Lessons} />
    <App.Screen name="Lesson" component={Lesson} />
  </App.Navigator>
);

export default Routes;
