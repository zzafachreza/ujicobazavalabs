import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
} from 'react-native';
import { MyButton } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {
  const top = new Animated.Value(0.3);

  const animasi = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(top, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(top, {
          toValue: 0.3,
          duration: 1000,
        }),
      ]),
      {
        iterations: 1,
      },
    ).start();
  };



  useEffect(() => {
    setTimeout(() => {

      navigation.replace('Home')

    }, 1500)
  }, []);


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <Image
          source={require('../../assets/logo.png')}
          style={
            {
              width: windowWidth - 100,
              height: 300,
              borderRadius: 30,
              margin: 10,
              resizeMode: 'contain'
            }
          }
        />
        <ActivityIndicator size="large" color={colors.white} />


      </View>




    </View>
  );
}

const styles = StyleSheet.create({});
