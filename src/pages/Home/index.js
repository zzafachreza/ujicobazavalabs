import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { Icon } from 'react-native-elements'

export default function Home({ navigation }) {


  const MyFitur = ({ title, desc, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        backgroundColor: colors.primary,
        alignItems: 'center'
      }}>
        <Image source={require('../../assets/logo.png')} style={{
          width: 50, height: 50
        }} />
        <View style={{
          flex: 1,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            color: colors.white,
          }}>{title}</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            color: colors.white,
          }}>{desc}</Text>
        </View>
        <Icon type='ionicon' name='chevron-forward-outline' color={colors.white} />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <MyFitur title='Fitur Alarm' desc='Merupakan Fitur alarm simpe' onPress={() => navigation.navigate('ZavalabsAlarm')} />
      </ScrollView>

    </SafeAreaView>
  )
}