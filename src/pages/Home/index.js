import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, StatusBar, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData, webURL } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { SliderBox } from "react-native-image-slider-box";


export default function Home({ navigation }) {


  const [ENTRIES, SETENTITIES] = useState([]);
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  const [zavalabs, setZavalabs] = useState({});
  const [menu, setMenu] = useState([]);
  useEffect(() => {

    __getTransaction();
    if (isFocused) {
      axios.post(apiURL + 'slider').then(res => {
        console.log(res.data)
        SETENTITIES(res.data);
      })
      axios.post(apiURL + 'company').then(r => {
        setZavalabs(r.data.data);
      });
      axios.post(apiURL + 'menu').then(r => {
        console.log(r.data);
        setMenu(r.data);
      });



    }

  }, [isFocused]);

  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);
    })



  }


  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };



  const __renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{
        width: windowWidth / 2.5,
        margin: 5,
      }} >
        <View style={{
          width: windowWidth / 2.5,
          borderWidth: 0,
          borderColor: colors.primary,
          backgroundColor: zavalabs.warna_utama,
          height: windowHeight / 5.5,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={{
            uri: webURL + item.image
          }} style={{
            width: windowHeight / 6,
            height: windowHeight / 12,
            resizeMode: 'contain'
          }} />
        </View>
        <Text style={{
          marginTop: 5,
          fontFamily: fonts.secondary[600],
          color: colors.black,
          textAlign: 'center'

        }}>{item.nama}</Text>
      </TouchableOpacity>
    )
  }


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      <StatusBar backgroundColor={zavalabs.warna_utama} barStyle="light-content" />
      {/* header */}
      <View style={{
        backgroundColor: zavalabs.warna_utama,
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>

        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>Selamat datang, {user.nama_lengkap}</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>{zavalabs.nama}</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>{zavalabs.deskripsi}</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.replace('Splash')} style={{
            // padding: 10,
          }}>
            <Image style={{
              width: 50,
              resizeMode: 'contain',
              height: 50
            }} source={{
              uri: webURL + zavalabs.foto
            }} />
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => Linking.openURL('https://zavalabs.okeadmin.com/')} style={{
            // padding: 10,
            justifyContent: 'center',
            alignItems: 'flex-end',
            flex: 1,
            // paddingHorizontal: 10,
            paddingLeft: 10,
          }}>
            <Icon type='ionicon' name='cog' color={colors.white} />
          </TouchableOpacity> */}

        </View>


      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SliderBox
          images={ENTRIES}
          sliderBoxHeight={200}
          onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
          // dotColor={zavalabs.warna_utama}
          inactiveDotColor="#90A4AE"
        />

        <View style={{
          flex: 1,
          paddingTop: 25,
          // backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <FlatList data={menu} numColumns={2} renderItem={__renderItem} />

        </View>
      </ScrollView>



    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: windowHeight,
    height: windowWidth / 2,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});