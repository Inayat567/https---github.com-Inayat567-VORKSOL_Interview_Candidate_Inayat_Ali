import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {ButtonProp} from '../../Constants/Types';

const Button = (props: ButtonProp) => {
  return (
    <TouchableOpacity
      style={[styles.button, {width: props.iconed ? '40%' : '30%'}]}
      onPress={props.handlePress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#B75020', '#F75E2D']}
        style={styles.gradient}>
        <Text style={styles.buttonText}>{props.title}</Text>
        {props.iconed && props.iconName && (
          <Icon name={props.iconName} color="white" size={20} />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  gradient: {
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
});
