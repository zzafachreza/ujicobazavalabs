import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createAlarm } from 'react-native-simple-alarm';
import moment from 'moment'
import { colors } from '../../utils';
import { MyButton, MyGap } from '../../components';
import ReactNativeAN from 'react-native-alarm-notification';
import PushNotification from 'react-native-push-notification';
export default function ZavalabsAlarm() {

    const createAlarm = async () => {

        console.log(moment().add(1, 'minute').toISOString());
        console.log(new Date(Date.now() + 60 * 1000));

        // PushNotification.localNotificationSchedule({
        //     channelId: 'ujicobazavalabs', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        //     title: 'zavalabs Informasi', // (optional)
        //     message: 'Waktu pamakain ruangan akan habis 10 menit lagi', // (required)
        //     //... You can use all the options from localNotifications
        //     date: new Date(Date.now() + 3 * 1000), // in 60 secs
        //     allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        //     /* Android Only Properties */
        //     repeatType: "time",
        //     repeatTime: 2000,
        //     date: new Date(Date.now() + 2000)
        // });




    }


    // useEffect(() => {
    //     getAlarms()
    // }, []);

    const getAlarms = () => {
        ReactNativeAN.stopAlarmSound();
    }

    const deleteAllAlarms = () => {
        ReactNativeAN.deleteAlarm(1);
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <MyButton title="Atur Alarm" warna={colors.primary} onPress={createAlarm} />
            <MyGap jarak={10} />
            <MyButton title="Cek Alarm" warna={colors.primary} onPress={getAlarms} />
            <MyGap jarak={10} />
            <MyButton title="Hapus Alarm" warna={colors.primary} onPress={deleteAllAlarms} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})