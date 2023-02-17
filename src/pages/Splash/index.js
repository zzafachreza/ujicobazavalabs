import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import { MyButton } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { apiURL, getData, webURL, wenURL } from '../../utils/localStorage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
export default function Splash({ navigation }) {


  const [zavalabs, setZavalabs] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      axios.post(apiURL + 'company').then(r => {
        setZavalabs(r.data.data);
      });
    }

    setTimeout(() => {

      navigation.replace('Login')

    }, 1500)
  }, [isFocused]);


  return (
    <>
      <StatusBar backgroundColor={zavalabs.warna_utama} barStyle="light-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: zavalabs.warna_utama,
        }}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <Image
            source={{
              uri: webURL + zavalabs.foto
            }}
            style={
              {
                width: windowWidth - 100,
                height: 250,
                borderRadius: 30,
                marginBottom: 20,
                resizeMode: 'contain'
              }
            }
          />


          <ActivityIndicator size="large" color={colors.white} />

          <Text style={{
            marginTop: 20,
            fontFamily: fonts.secondary[600],
            fontSize: windowHeight / 28,
            color: colors.white
          }}>{zavalabs.nama}</Text>
          <Text style={{
            marginBottom: 10,
            fontFamily: fonts.secondary[400],
            fontSize: windowHeight / 35,
            color: colors.white
          }}>{zavalabs.deskripsi}</Text>
        </View>




      </View>
    </>
  );
}

const styles = StyleSheet.create({});
