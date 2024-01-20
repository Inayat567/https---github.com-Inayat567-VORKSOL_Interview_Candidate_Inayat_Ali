import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {TextProp} from '../../Constants/Types';

const Heading = (props: TextProp) => (
  <Text style={styles.text}>{props.title}</Text>
);

export default Heading;

const styles = StyleSheet.create({
  text: {
    fontSize: 36,
    color: '#3a3b3c',
    lineHeight: 36,
    marginVertical: 10,
    marginHorizontal: '10%',
    fontWeight: 'bold',
  },
});
