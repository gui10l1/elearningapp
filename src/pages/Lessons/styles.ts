import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { ILesson } from '.';

interface IPlayerButtonProps {
  isFinished: boolean;
}

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
  font-size: 30px;
  font-family: 'Rubik-Regular';
  color: #3d3d4c;
`;

export const CoursesQuantityText = styled.Text`
  font-size: 15px;
  font-family: 'Roboto-Regular';
  color: #a0a0b2;
`;

export const LessonsList = styled(FlatList as new () => FlatList<ILesson>)`
  width: 100%;

  margin-top: 8px;

  margin-bottom: 16px;
`;

export const Lesson = styled.View`
  width: 100%;
  height: 100px;

  flex-direction: row;
  align-items: center;

  margin-top: 16px;
`;

export const ButtonPlayer = styled(RectButton)<IPlayerButtonProps>`
  ${props =>
    props.isFinished
      ? css`
          background-color: #61c5bd;
        `
      : css`
          background-color: #ff6680;
        `}

  height: 68px;
  width: 68px;

  border-radius: 16px;

  align-items: center;
  justify-content: center;

  margin-right: -34px;

  z-index: 1;
`;

export const LessonContent = styled.View`
  flex: 1;

  height: 100%;
  background-color: #fff;

  padding: 16px 16px 16px 56px;

  border-radius: 16px;
`;

export const LessonTitle = styled.Text`
  font-size: 15px;
  font-family: 'Rubik-Regular';
  color: #6c6c80;

  margin-bottom: 16px;

  max-width: 133px;
`;

export const LessonDescription = styled.View`
  flex-direction: row;

  width: 100%;

  justify-content: space-between;
`;

export const LessonDescriptionText = styled.Text`
  font-size: 13px;
  font-family: 'Roboto-Regular';
  color: #c4c4d1;

  margin-right: 8px;
`;

export const Duration = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DurationText = styled.Text`
  font-size: 13px;
  font-family: 'Roboto-Regular';
  color: #c4c4d1;

  margin-left: 3px;
`;

export const Badge = styled.Text`
  font-family: 'Roboto-Regular';
  background: #61c5bd;
  font-size: 13px;

  border-radius: 12px;

  color: #fff;

  padding: 0 10px;
`;
