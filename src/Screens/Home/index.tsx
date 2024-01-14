import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button} from '../../Components';
import {NavigationProps} from '../../Constants/Types';

const Home = ({navigation}: NavigationProps) => {
  const handlePress = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Button title="Camera" handlePress={() => handlePress('Camera')} />
        <Button title="Start" handlePress={() => handlePress('Onboarding')} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  subContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    left: '38%',
  },
});
