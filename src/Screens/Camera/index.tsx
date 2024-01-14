import {
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  NativeModules,
  FlatList,
  Image,
  Alert,
  NativeEventEmitter,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {Button} from '../../Components';

const Camera = () => {
  const [imageData, setImageData] = useState<any>([]);
  const {CameraModule} = NativeModules;
  useEffect(() => {
    // const onImageCaptured = (event: any) => {
    //   const capturedImageData = event?.imageData;
    //   setImageData(prevImageData => [...prevImageData, capturedImageData]);
    //   console.log(capturedImageData);
    //   console.log(event);
    // };
    const eventEmitter = new NativeEventEmitter(NativeModules.CameraModule);

    eventEmitter.addListener('onImageCaptured', event => {
      const capturedImageData = event?.imageData;
      setImageData(prevImageData => [...prevImageData, capturedImageData]);
      console.log(capturedImageData);
      console.log(event);
    });

    return () => {
      eventEmitter.removeAllListeners('onImageCaptured');
    };
  }, []);

  const handlePress = () => {
    CameraModule.captureImage();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={imageData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={{width: 100, height: 100}} />
        )}
      />
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
