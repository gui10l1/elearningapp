import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

const LoadingScreen: FC = () => {
  return (
    <Container>
      <ActivityIndicator size={30} color="#fff" />
    </Container>
  );
};

export default LoadingScreen;
