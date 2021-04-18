import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex-direction: column;
`;

export const ImageWrapper = styled.View`
  width: 100%;
`;

export const ELearningImage = styled.Image`
  flex: 1;

  position: absolute;

  top: 0;

  width: 100%;
`;

export const CalculatorImage = styled.Image`
  margin-top: 100px;
  margin-left: 33px;
`;

export const Content = styled.View`
  padding: 0 40px;
  padding-bottom: 40px;
`;

export const Title = styled.Text`
  color: #ff6680;
  font-family: 'Rubik-Regular';
  font-size: 36px;
`;

export const Paragraph = styled.Text`
  color: #edebf5;
  font-family: 'Roboto-Regular';
  font-size: 15px;

  line-height: 25px;

  margin-top: 16px;

  max-width: 190px;
`;

export const Button = styled(RectButton)`
  align-items: center;
  justify-content: center;

  background-color: #ff6680;

  border-radius: 100px;

  width: 100%;
  height: 56px;

  margin-top: 40px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: 'Roboto-Regular';
  font-size: 15px;
`;
