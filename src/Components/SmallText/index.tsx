import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {TextProp} from '../../Constants/Types';

const SmallText = (props: TextProp) => (
  <Text style={styles.text}>{props.title}</Text>
);

export default SmallText;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 18,
    color: 'gray',
    marginLeft: '10%',
    marginRight: '15%',
  },
});
