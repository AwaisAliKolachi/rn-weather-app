import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { useColor } from '@src/context';
import { Palette, scaledSize } from '@src/utils';

import { Text } from '../Text/Text';

export interface IndicatorProps {
  isLoading: boolean;
}

export type IndicatorRef = {
  hide: () => void;
  show: () => void;
};

export const IndicatorViewRef = (
  props: IndicatorProps,
  ref: React.Ref<IndicatorRef>
) => {
  const { isLoading = true } = props;
  const { color } = useColor();
  const [loading, setIsLoading] = useState(isLoading);

  const pressCount = useRef(0);

  const show = useCallback(() => setIsLoading(true), []);

  const hide = useCallback(() => setIsLoading(false), []);

  const handlePressCount = useCallback(() => {
    pressCount.current = pressCount.current + 1;

    if (pressCount.current === 2) {
      setIsLoading(false);
      pressCount.current = 0;
    }
  }, []);

  useImperativeHandle(ref, () => {
    return {
      hide,
      show,
    };
  }, [hide, show]);

  const styles = indicatorStyles(color);

  if (!loading) return <></>;

  return (
    <Pressable onPress={handlePressCount} style={styles.container}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size={'small'}
          color={color.primaryColor}
          style={styles.loaderStyle}
        />
      </View>
    </Pressable>
  );
};

export const IndicatorView = React.forwardRef<IndicatorRef, IndicatorProps>(
  IndicatorViewRef
);

export const indicatorStyles = ({ overlay, textColor }: Palette) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: overlay,
      ...StyleSheet.absoluteFillObject,
    },
    loaderContainer: {
      alignItems: 'center',
      backgroundColor: textColor,
      borderRadius: scaledSize(50),
      justifyContent: 'center',
      top: scaledSize(50),
    },
    loaderStyle: {
      padding: scaledSize(7),
    },
  });

  return styles;
};
