import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, StatusBar } from 'react-native';
import { fonts, windowWidth, colors, windowHeight } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, storeData, webURL } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';

import { useIsFocused } from '@react-navigation/native';
export default function Login({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    username: null,
    password: null
  });
  const [loading, setLoading] = useState(false);



  const masuk = () => {


    if (kirim.username == null && kirim.password == null) {
      alert('ID Anggota dan Passwoord tidak boleh kosong !');
    } else if (kirim.username == null) {
      alert('ID Anggota tidak boleh kosong !');
    } else if (kirim.password == null) {
      alert('Passwoord tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('Home')
          }

        });



    }




  }

  const [zavalabs, setZavalabs] = useState({});
  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  useEffect(() => {

    axios.post(apiURL + 'company').then(r => {
      setZavalabs(r.data.data);
    });

  }, []);



  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: colors.white }}>
      <StatusBar backgroundColor={zavalabs.warna_utama} barStyle="light-content" />
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingTop: 10 }}>

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
                width: 150,
                height: 150,
                resizeMode: 'contain'
              }
            }
          />

          <Text style={{
            marginTop: 10,
            fontFamily: fonts.secondary[600],
            fontSize: windowHeight / 28,
          }}>{zavalabs.nama}</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowHeight / 35,
          }}>{zavalabs.deskripsi}</Text>

        </View>


      </View>
      <MyGap jarak={10} />
      <View style={{ padding: 10, marginVertical: 10, flex: 1 }}>
        <MyInput label="Username" onChangeText={val => setKirim({
          ...kirim,
          username: val
        })}
          iconname="at" placeholder="Masukan usernmae Anda" />
        <MyGap jarak={20} />
        <MyInput
          onChangeText={val => setKirim({
            ...kirim,
            password: val
          })}
          secureTextEntry={true}
          label="Password"
          iconname="lock-closed-outline"
          placeholder="Masukan password Anda"
        />
        <MyGap jarak={40} />
        {!loading &&

          <>
            <MyButton
              onPress={masuk}
              title="Masuk"
              warna={colors.primary}
              Icons="log-in-outline"
            />
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}><Text style={{
              fontSize: windowWidth / 28,
              marginTop: 10,
              fontFamily: fonts.primary[400],
              textAlign: 'center',
              color: colors.tertiary
            }}>Belum punya akun ? <Text style={{
              fontSize: windowWidth / 28,
              marginTop: 10,
              fontFamily: fonts.primary[600],
              textAlign: 'center',
              color: colors.tertiary
            }}>Daftar disini</Text></Text></TouchableOpacity>
          </>
        }

      </View>
      {loading && <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator color={zavalabs.warna_utama} size="large" />
      </View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
