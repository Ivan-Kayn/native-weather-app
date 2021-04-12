import React from 'react';
import {StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";


export default function Loading() {
    return (
        <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={{...styles.container, ...styles.horizontal}}>
            <StatusBar barStyle='dark-content'/>
            <ActivityIndicator size="large" color="#ffffff" />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        padding: 10
    },
    text: {
        color: '#2c2c2c',
        fontSize: 30,
    }
});


