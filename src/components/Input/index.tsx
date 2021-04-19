import React, { useEffect, useRef, useCallback, useState } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, FiIcon } from './styles';

interface IInputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface IInputValueRef {
  value: string;
}

const Input: React.FC<IInputProps> = ({ name, icon, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { defaultValue, fieldName, registerField } = useField(name);
  const inputValueRef = useRef<IInputValueRef>({ value: defaultValue });
  const inputElementRef = useRef<any>(null);

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current?.value);
  }, []);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
    if (inputElementRef) {
      inputElementRef.current.setNativeProps({
        styles: { fontFamily: 'Roboto-Regular' },
      });
    }
  }, [fieldName, registerField]);

  useEffect(() => {
    inputValueRef.current.value = defaultValue;
  }, [defaultValue]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      <FiIcon
        name={icon}
        color="#C4C4D1"
        size={24}
        isFilled={isFilled}
        isFocused={isFocused}
      />

      <TextInput
        defaultValue={defaultValue}
        ref={inputElementRef}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        placeholderTextColor="#C4C4D1"
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default Input;
