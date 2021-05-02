import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { FlatList, Pressable } from 'react-native';

import { ICourse } from '.';

interface IModalButtonProps {
  type: 'dismiss' | 'accept';
}

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

export const Courses = styled(FlatList as new () => FlatList<ICourse>)`
  margin-top: 8px;
  margin-bottom: 80px;

  height: 100%;

  flex: 1;
`;

export const CourseContainer = styled.View`
  position: relative;
`;

export const Course = styled.TouchableOpacity`
  width: 156px;
  height: 172px;

  border-radius: 16px;

  background-color: #fff;

  padding: 24px 25px;

  margin-top: 18px;

  z-index: 15;
`;

export const FiTrash = styled(Icon)`
  position: absolute;
  top: 30px;
  right: 12px;

  z-index: 20;
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

export const ModalContainer = styled.View`
  flex: 1;

  background-color: rgba(0, 0, 0, 0.2);

  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.View`
  width: 277px;
  height: 242px;

  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 32px;

  background-color: #fff;

  border-radius: 16px;
`;

export const ModalText = styled.Text`
  color: #6c6c80;
  font-family: 'Rubik-Regular';
  font-size: 15px;

  text-align: center;
`;

export const ButtonWrapper = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ModalButton = styled(Pressable)<IModalButtonProps>`
  padding: 11px 24px;

  border-radius: 100px;

  background-color: transparent;

  ${props =>
    props.type === 'accept' &&
    css`
      background-color: #ff6680;
    `}
`;

export const AcceptButtonText = styled.Text`
  font-size: 15px;
  font-family: 'Roboto-Regular';
  color: #fff;
`;

export const DismissButtonText = styled.Text`
  font-size: 15px;
  font-family: 'Roboto-Regular';
  color: #ff6680;
`;
