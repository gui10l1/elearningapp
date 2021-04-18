import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View } from 'react-native';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#6548A3" />
      <View style={{ backgroundColor: '#6548A3', flex: 1 }}>
        <Routes />
      </View>
    </NavigationContainer>
  );
};

export default App;
