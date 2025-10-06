import React, { useCallback } from 'react';
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  StyleSheet,
  TargetedEvent,
  TextInputFocusEventData,
  View,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useColor } from '@src/context';
import { Palette } from '@src/utils';
import { InputProps } from './TextInputProps';
import { Fonts, Text } from '../Text/Text';

export const Input = React.memo(
  React.forwardRef((props: InputProps, ref?: React.Ref<RNTextInput | null>) => {
    const {
      backgroundColor = 'white',
      borderColor = 'black',
      error,
      errorContainerStyle,
      errorStyle,
      inputContainerStyle,
      inputStyle,
      label,
      labelColor = 'black',
      leftIcon,
      leftIconContainerStyle,
      onBlur,
      onFocus,
      onFocusBorderColor = '#C42126',
      onMouseEnter,
      onMouseLeave,
      outlineGapColor = 'white',
      placeholder,
      rightIcon,
      rightIconContainerStyle,
      style,
      variant = 'outlined',
      borderRadius,
      ...rest
    } = props;

    const { color } = useColor();

    const styles = inputStyles(color, borderRadius);

    const hovered = useSharedValue(false);
    const focused = useSharedValue(false);

    const handleMouseEnter = useCallback(
      (event: NativeSyntheticEvent<TargetedEvent>) => {
        onMouseEnter?.(event);
        hovered.value = true;
      },
      [hovered, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (event: NativeSyntheticEvent<TargetedEvent>) => {
        onMouseLeave?.(event);
        hovered.value = false;
      },
      [hovered, onMouseLeave]
    );

    const handleFocus = useCallback(
      (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus?.(event);
        focused.value = true;
      },
      [focused, onFocus]
    );

    const handleBlur = useCallback(
      (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(event);
        focused.value = false;
      },
      [focused, onBlur]
    );

    const animatedInputContainerStyle = {
      backgroundColor,
    };

    return (
      <View style={style}>
        <View
          style={[
            styles.inputContainer,
            animatedInputContainerStyle,
            inputContainerStyle,
          ]}>
          {leftIcon && (
            <View style={[styles.leading, leftIconContainerStyle]}>
              {leftIcon}
            </View>
          )}

          <RNTextInput
            ref={ref}
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={color.placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...({
              onMouseEnter: handleMouseEnter,
              onMouseLeave: handleMouseLeave,
              ...rest,
            } as any)}
          />

          {rightIcon && (
            <View style={[styles.trailing, rightIconContainerStyle]}>
              {rightIcon}
            </View>
          )}
        </View>
        <View style={[styles.errorView, errorContainerStyle]}>
          {error ? (
            <Text style={[styles.helperText, errorStyle]}>{error}</Text>
          ) : null}
        </View>
      </View>
    );
  })
);

const inputStyles = (
  { primaryColor, textColor }: Palette,
  borderRadius: number | undefined
) =>
  StyleSheet.create({
    errorView: {
      marginHorizontal: 5,
      marginTop: 4,
      marginBottom: 10,
    },
    helperText: {
      fontSize: 14,
      color: primaryColor,
    },
    input: {
      flex: 1,
      color: textColor,
      fontFamily: Fonts.Poppins,
      fontSize: 14,
      height: 50,
      paddingHorizontal: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      borderRadius: borderRadius ? borderRadius : 10,
    },
    leading: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    trailing: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: 10,
    },
  });
