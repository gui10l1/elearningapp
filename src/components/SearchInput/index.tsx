import React, { useCallback, useState } from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, FiIcon } from './styles';

interface IInputProps extends TextInputProps {
  icon: string;
}

const SearchInput: React.FC<IInputProps> = ({ icon, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container isFocused={isFocused}>
      <FiIcon name={icon} color="#C4C4D1" size={24} isFocused={isFocused} />

      <TextInput
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        placeholderTextColor="#C4C4D1"
        {...rest}
      />
    </Container>
  );
};

export default SearchInput;
