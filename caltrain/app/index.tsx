import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const [time, setTime] = useState('');
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: './details',
      params: { time },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Time Of Purchase"
        value={time}
        onChangeText={setTime}
      />
      <Button title="Submit" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
