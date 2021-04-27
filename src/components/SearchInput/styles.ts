import styled, { css } from 'styled-components/native';
import { TextInput as Input } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface IContainerProps {
  isFocused: boolean;
}

interface IIconProps {
  isFocused: boolean;
}

export const Container = styled.View<IContainerProps>`
  background-color: #fff;

  border-radius: 100px;

  width: 100%;

  height: 56px;

  flex-direction: row;
  align-items: center;

  padding: 0 24px;
`;

export const FiIcon = styled(Icon)<IIconProps>`
  margin-right: 16px;

  ${props =>
    props.isFocused &&
    css`
      color: #ff6680;
    `}
`;

export const TextInput = styled(Input)`
  flex: 1;

  height: 56px;

  font-size: 15px;

  font-family: 'Roboto-Regular';
`;
