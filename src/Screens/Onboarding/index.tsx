import {StyleSheet, Text, View, useWindowDimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import IconedInput from '../../Components/IconInput';
import Animated, {
  FadeInDown,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import {Heading, SmallText, Button} from '../../Components';
import {Gesture, FlatList} from 'react-native-gesture-handler';

const Onboarding = () => {
  const {width, height} = useWindowDimensions();
  const Height = useSharedValue(height);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const HomeScreenHeight = useSharedValue(0);
  const offset = useSharedValue(500);

  const handleContinue = () => {
    HomeScreenHeight.value = withSpring(180, {duration: 500});
  };

  const handleGetStarted = () => {
    Alert.alert('Button Clicked');
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      // offset.value = HomeScreenHeight.value;
      // console.log(offset.value);
    })
    .onChange(event => {
      // offset.value = event.translationX < -200 ? -200 : event.translationX;
      // offset.value = offset.value + HomeScreenHeight.value;
      // console.log(HomeScreenHeight.value, Height.value);
      // Height.value = height - offset.value;
    })
    .onFinalize(() => {
      // Height.value = height - offset.value;
      // console.log('Final: ', Height.value);
      // HomeScreenHeight.value = offset.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    // width,
    height: Height.value - 500,
  }));

  const screen1 = () => {
    return (
      <Animated.View
        entering={FadeInDown.duration(400).delay(600)}
        style={[styles.box, {width, height: '95%'}]}>
        <Heading title="Know Everything about the weather" />
        <SmallText title="start now and learn more about local weather instantly" />
        <View style={styles.buttonContainer}>
          <Button title="Continue" handlePress={handleContinue} />
        </View>
      </Animated.View>
    );
  };

  const screen2 = () => {
    return (
      <Animated.View style={[styles.box, {width, height: '95%'}]}>
        <Heading title="Create an Account" />
        <IconedInput
          value={email}
          setValue={setEmail}
          placeholder="Enter Email"
          name="mail"
        />
        <IconedInput
          value={password}
          setValue={setPassword}
          placeholder="Enter Password"
          name="lock-closed"
        />
        <View style={styles.loginButtonContainer}>
          <Button
            title="Get Started "
            iconed={true}
            iconName="arrow-forward"
            handlePress={handleGetStarted}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.text}>
            Already having an account??{' '}
            <Text style={styles.textLink}>Login</Text>
          </Text>
        </View>
        <Text style={styles.text}>
          By Signing In you have accepted out{' '}
          <Text style={styles.textLink}>terms and conditions</Text> and{' '}
          <Text style={styles.textLink}>Privacy Policy</Text>
        </Text>
      </Animated.View>
    );
  };

  const data = [
    {id: 1, component: screen1},
    {id: 2, component: screen2},
  ];

  const onScroll = useAnimatedScrollHandler({
    onBeginDrag({contentOffset}) {
      offset.value = HomeScreenHeight.value;
      console.log('onBeginDrag: ', contentOffset);
    },
    onScroll({contentOffset}) {
      offset.value = contentOffset.x * 0.5 + HomeScreenHeight.value;
      console.log(HomeScreenHeight.value, Height.value);
      Height.value = withSpring(height + offset.value, {
        velocity: 100,
        duration: 1000,
      });
      console.log(contentOffset);
    },
    onEndDrag({contentOffset}) {
      offset.value = contentOffset.x * 0.5 + HomeScreenHeight.value;
      console.log('onEndDrag: ', contentOffset);
      Height.value = withSpring(height + offset.value, {
        velocity: 100,
        duration: 1000,
      });
      console.log('Final: ', Height.value);
    },
  });

  return (
    <View style={styles.container}>
      {/* <GestureDetector gesture={pan}> */}
      <Animated.View style={[styles.mainContainer, animatedStyle]}>
        <Animated.FlatList
          disableScrollViewPanResponder
          disableIntervalMomentum
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={width / 2} // Adjust this value
          scrollEventThrottle={10}
          onScroll={onScroll}
          getItemLayout={(data, index) => ({
            length: 50,
            offset: 50 * index,
            index,
          })}
          data={data}
          keyExtractor={item => item.id.toString()}
          pagingEnabled
          horizontal
          renderItem={({item}) => (
            <View key={item.id} style={{width}}>
              {item.component()}
            </View>
          )}
        />
      </Animated.View>
      {/* </GestureDetector> */}
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  mainContainer: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    position: 'absolute',
    width: '100%',
    right: '10%',
    bottom: 20,
  },
  loginButtonContainer: {
    alignItems: 'flex-end',
    marginRight: 20,
  },
  box: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  text: {
    margin: 10,
    color: 'darkgray',
    textAlign: 'center',
    width: '90%',
  },
  textLink: {
    color: 'red',
    fontWeight: 'bold',
  },
});
