import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export default function MyPicker({
  label,
  iconname,
  onValueChange,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  label2,
  styleLabel,
  colorIcon = colors.primary,
  data = [],
}) {

  const [zavalabs, setZavalabs] = useState({});

  useEffect(() => {

    axios.post(apiURL + 'company').then(r => {
      setZavalabs(r.data.data);
    });
  }, [])

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 0,
        }}>
        <Icon type="ionicon" name={iconname} color={zavalabs.warna_utama} size={16} />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: zavalabs.warna_utama,
            left: 10,
            fontSize: 12,
            ...styleLabel,
          }}>
          {label}
        </Text>
      </View>

      <View style={{
        backgroundColor: colors.zavalabs,
        borderRadius: 10,
        marginTop: 5,
        fontFamily: fonts.secondary[600],
        borderColor: colors.primary,
      }}>
        <Picker style={{ height: 48, transform: [{ scale: 0.9 }] }}
          selectedValue={value} onValueChange={onValueChange}>
          {data.map(item => {
            return <Picker.Item textStyle={{ fontSize: 12 }} value={item.value} label={item.label} />;
          })}
        </Picker>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
