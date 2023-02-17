import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiURL } from '../localStorage';

// const [zavalabs, setZavalabs] = useState({});
let warna = {};


axios.post(apiURL + 'company').then(r => {
  console.log('test warna', r.data.data);
  warna = r.data.data;
});

console.log('nyew masuk', warna)


export const colors = {
  primary: '#1A3A59',
  secondary: '#E43C1C',
  tertiary: '#8F8D8D',
  background: '#6B63FF',
  success: '#7FFF00',
  warning: '#F37120',
  danger: '#FF0000',
  black: 'black',
  white: 'white',
  border: '#A9A9A9',
  zavalabs: '#EFEFEF'
};
