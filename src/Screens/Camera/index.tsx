import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  Image,
  NativeEventEmitter,
} from 'react-native';
// import base64 from 'react-native-base64';
import RNFetchBlob from 'rn-fetch-blob';

import React, {useEffect, useState} from 'react';
import {Button} from '../../Components';

const Camera = () => {
  const [imageData, setImageData] = useState(null);
  const {CameraModule} = NativeModules;

  useEffect(() => {
    // console.log('Updated Image Data:', imageData);
    const eventEmitter = new NativeEventEmitter(NativeModules.CameraModule);
    const subscription = eventEmitter.addListener(
      'onImageCaptured',
      async image => {
        try {
          const base64String = await RNFetchBlob.base64.encode(image.imageData);
          // console.log(base64String);
          setImageData(prevImageData => {
            // console.log('Updated Image Data:', prevImageData);
            return `data:image/png;base64,${base64String}`;
          });
        } catch (error) {
          // console.error('Error encoding image:', error);
        }
      },
    );

    return () => {
      subscription.remove();
      console.log('Clean-up and Updated Image Data:', imageData);
    };
  }, [imageData]); // Empty dependency array to run the effect only once

  // useEffect(() => {
  //   console.log('Updated Image Data:', imageData);
  // }, [imageData]);

  const handlePress = () => {
    CameraModule.captureImage();
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.8, alignItems: 'center', justifyContent: 'center'}}>
        {imageData ? (
          <Image
            style={{
              width: '90%',
              height: '95%',
              resizeMode: 'contain',
              borderWidth: 1,
              borderColor: 'red',
            }}
            source={{uri: imageData}}
          />
        ) : (
          <Text>No image captured yet.</Text>
        )}
        {/* <FlatList
        data={imageData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={{width: 100, height: 100}} />
        )}
      /> */}
      </View>
      <View style={{flex: 0.2}}>
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
