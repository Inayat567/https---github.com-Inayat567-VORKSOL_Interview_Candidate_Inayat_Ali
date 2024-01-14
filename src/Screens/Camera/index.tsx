import {
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  NativeModules,
  FlatList,
  Image,
  Alert,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {Button} from '../../Components';

const Camera = () => {
  const {CameraModule} = NativeModules;

  console.log(CameraModule);
  const [imageData, setImageData] = useState<any>([]);
  useEffect(() => {
    const onImageCaptured = (event: any) => {
      imageData.push(event.imageData);
      setImageData(imageData);
    };

    DeviceEventEmitter.addListener('onImageCaptured', onImageCaptured);

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, [imageData]);

  const handlePress = () => {
    if (!!DeviceEventEmitter?.emit) {
      // @ts-ignore
      DeviceEventEmitter.emit('captureImage');
    } else {
      CameraModule.captureImage((error, result) => {
        Alert.alert(`Error: ${error}, Result: ${result}`);
      });
    }
  };

  return (
    <View style={styles.container}>
      {imageData.length > 0 && (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={imageData}
          renderItem={img => {
            return (
              <View>
                <Text>Just Testing</Text>
                {/* <Image source={} /> */}
              </View>
            );
          }}
        />
      )}
      <View>
        <Button
          iconed={true}
          iconName="camera"
          title="Open Camera   "
          handlePress={handlePress}
        />
      </View>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
