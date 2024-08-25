import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const useFlashingText = (duration: number = 1000) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const flashAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: duration, // Control the speed of the flashing
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: duration, // Control the speed of the flashing
          useNativeDriver: true,
        }),
      ])
    );

    flashAnimation.start();

    // Clean up the animation when the component unmounts
    return () => flashAnimation.stop();
  }, [opacity, duration]);

  return opacity;
};

export default useFlashingText;
