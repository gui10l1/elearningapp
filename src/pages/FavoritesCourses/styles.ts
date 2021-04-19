import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

export const Header = styled.View`
  width: 100%;

  background-color: #6548a3;

  padding: 0 24px;
`;

export const HeaderLogo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 24px;
`;

export const Container = styled.View`
  flex: 1;

  background-color: #f0edf5;

  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  margin-top: 32px;

  padding: 24px 24px 0;

  position: relative;
`;

export const ContainerHeader = styled.View`
  background-color: #f0edf5;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerHeaderText = styled.Text`
  font-size: 20px;
  font-family: 'Rubik-Regular';
  color: #3d3d4c;
`;

export const Courses = styled.ScrollView`
  margin-top: 8px;
  margin-bottom: 80px;

  height: 100%;

  flex: 1;
`;

export const Course = styled.View`
  width: 156px;
  height: 172px;

  border-radius: 16px;

  background-color: #fff;

  padding: 24px 25px;

  margin-left: 16px;
  margin-top: 18px;

  position: relative;
`;

export const FiTrash = styled(Icon)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const CourseImage = styled.Image`
  height: 64px;
  width: 64px;

  margin-bottom: 20px;
`;

export const CourseName = styled.Text`
  font-size: 15px;
  font-family: 'Rubik-Regular';
  color: #6c6c80;

  margin-bottom: 4px;
`;

export const CourseQuantity = styled.Text`
  font-size: 10px;
  font-family: 'Roboto-Regular';
  color: #c4c4d1;
`;

export const ContainerFooter = styled.View`
  position: absolute;

  bottom: 0;

  width: 100%;
  height: 70px;

  background-color: #fff;

  flex-direction: row;
`;

export const Home = styled(RectButton)`
  width: 50%;

  align-items: center;
  justify-content: center;
  flex-direction: row;

  position: relative;
`;

export const HomeButtonText = styled.Text`
  font-family: 'Roboto-Regular';
  color: #c4c4d1;
  margin-left: 14px;
`;

export const Favorites = styled(RectButton)`
  width: 50%;

  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const FavoritesText = styled.Text`
  font-family: 'Roboto-Regular';
  color: #ff6680;
  margin-left: 14px;
`;

export const Line = styled.View`
  position: absolute;
  top: 0;

  height: 2px;
  width: 100%;
  background-color: #ff6680;
`;
