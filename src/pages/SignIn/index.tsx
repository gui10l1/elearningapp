import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import elearning from '../../assets/elearning.png';
import calculator from '../../assets/calculator.png';
import {
  Container,
  ImageWrapper,
  ELearningImage,
  CalculatorImage,
  Content,
  Title,
  Paragraph,
  Button,
  ButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const { navigate } = useNavigation();

  const pushToHome = useCallback(() => {
    navigate('Home');
  }, [navigate]);

  return (
    <Container>
      <ImageWrapper>
        <ELearningImage source={elearning} />
        <CalculatorImage source={calculator} />
      </ImageWrapper>

      <Content>
        <Title>Aprenda da melhor forma</Title>

        <Paragraph>
          Entre na plataforma e acesse cursos de diversas áreas de conhecimento.
        </Paragraph>

        <Button onPress={pushToHome}>
          <ButtonText>Começar os estudos</ButtonText>
        </Button>
      </Content>
    </Container>
  );
};

export default SignIn;
