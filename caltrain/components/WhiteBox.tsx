import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface WhiteBoxProps {
  children: React.ReactNode;
  style?: ViewStyle; // Optional custom styling
}

const WhiteBox: React.FC<WhiteBoxProps> = ({ children, style }) => {
  return (
    <View style={[styles.whiteBox, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  whiteBox: {
    width: '80%',
    height: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
  },
});

export default WhiteBox;
