import React, { FC } from 'react';
import { Image } from 'react-native';

import elearningLogo from '../../assets/elearninglogo.png';
import { Container, Loading } from './styles';

const SplashScreen: FC = () => (
  <Container>
    <Image source={elearningLogo} />

    <Loading size={20} color="#fff" />
  </Container>
);

export default SplashScreen;
