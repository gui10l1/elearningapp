import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';

export const Header = styled.View`
  width: 100%;

  background-color: #6548a3;

  padding: 0 24px;

  flex-direction: row;
  justify-content: space-between;
`;

export const Container = styled.View`
  flex: 1;

  background-color: #f0edf5;

  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  margin-top: 32px;

  position: relative;
`;

export const Video = styled.View`
  background-color: #3d3d4c;
  width: 100%;
  height: 210px;

  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  align-items: center;
  justify-content: center;
`;

export const PlayerImage = styled.Image`
  width: 64px;
  height: 64px;
`;

export const Content = styled.ScrollView`
  margin-top: 24px;
  padding: 0 25px;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-family: 'Rubik-Regular';
  color: #3d3d4c;

  margin-bottom: 17px;
`;

export const LessonInfo = styled.View`
  flex-direction: row;
`;

export const LessonName = styled.Text`
  font-size: 14px;
  color: #a0a0b2;
  margin-right: 18px;
`;

export const Duration = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: 26px;
`;

export const DurationText = styled.Text`
  color: #a0a0b2;
  font-size: 14px;
`;

export const FiClock = styled(Icon)`
  color: #a0a0b2;
  margin-right: 8px;
`;

export const Descripition = styled.Text`
  font-size: 15px;
  color: #6c6c80;
  font-family: 'Roboto-Regular';
  line-height: 25px;

  margin-bottom: 77px;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled(RectButton)`
  flex-direction: row;
  align-items: center;

  padding: 19px 24px;

  border-radius: 40px;
`;

export const BackButtonText = styled.Text`
  color: #ff6680;
  font-size: 15px;

  margin-left: 8px;
`;

export const ForwardButton = styled(RectButton)`
  flex-direction: row;
  align-items: center;

  padding: 19px 24px;

  background-color: #ff6680;

  border-radius: 40px;
`;

export const ForwardButtonText = styled.Text`
  color: #fff;
  font-size: 15px;

  margin-right: 8px;
`;
