import {StyleSheet, View, useWindowDimensions, TextInput} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

type InputProp = {
  value: string;
  placeholder: string;
  setValue: Dispatch<SetStateAction<any>>;
  name: string;
};

const IconedInput = (props: InputProp) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <View style={styles.subContainer}>
        <TextInput
          blurOnSubmit
          style={styles.input}
          value={props.value}
          placeholder={props.placeholder}
          onChange={val => {
            props.setValue(val);
          }}
        />
        <Icon
          style={styles.icon}
          name={props.name}
          color="lightgray"
          size={20}
        />
      </View>
    </View>
  );
};

// const simpleButton = () => (
//   <TouchableOpacity
//     onPress={handlePress} //() => NativeModules.CameraModule.captureImage()
//     style={styles.button}>
//     <Text style={styles.buttonText}>Show</Text>
//     {/* {imageData.length > 0 && <Image source={{uri: ''}} />} */}
//   </TouchableOpacity>
// );

export default IconedInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  input: {
    width: '90%',
    paddingHorizontal: 30,
  },
  icon: {
    marginRight: 20,
  },
});
