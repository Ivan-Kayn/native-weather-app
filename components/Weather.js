import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import propTypes from 'prop-types';
import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from "expo-linear-gradient";

const weatherOptions = {
    Rain: {
        iconName: 'rainy',
        subtitle: 'Don\'t forget the umbrella',
    },
    Clouds: {
        iconName: 'cloudy',
        subtitle: 'The weather is good for walking',
    },
    Thunderstorm: {
        iconName: 'thunderstorm',
        subtitle: 'Better stay at home',
    },
    Drizzle: {
        iconName: 'contrast',
        subtitle: 'Dress warmer',
    },
    Snow: {
        iconName: 'ios-snow-sharp',
        subtitle: 'Start of  snowball battles',
    },
    Clear:{
        iconName: 'sunny-outline',
        subtitle: 'Perfect for meditation',
    }
}

export default function Weather({temp, condition, city, description}) {
    return (
        <LinearGradient
            // Background Linear Gradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.container}
        >
            <StatusBar barStyle='light-content'/>

            <View style={styles.tempContainer}>
                <Ionicons name={weatherOptions[condition].iconName} size={90} color='white'/>
                <Text style={styles.temp}>{Math.round(temp)}°C</Text>
                <Text style={styles.city}>{city}</Text>
            </View>

            <View style={{...styles.climeContainer, ...styles.textContainer}}>
                <Text style={styles.title}>{description.charAt(0).toUpperCase() + description.slice(1)}</Text>
                <Text style={styles.subtitle}> {weatherOptions[condition].subtitle} </Text>
            </View>
        </LinearGradient>
    )
}

Weather.prototypes = {
    temp: propTypes.number.isRequired,
    condition: propTypes.oneOf(['Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Clear', 'Clouds']).isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tempContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',

    },
    climeContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    temp: {
        fontSize: 42,
        color: 'white'

    },
    city:{
        fontSize: 20,
        color: 'white',
        paddingVertical: 5,
    },
    title: {
        color: 'white',
        fontSize: 44,
        fontWeight: '300',
        marginBottom: 10,
    },
    subtitle: {
        color: 'white',
        fontWeight: '600',
        fontSize: 24,
    },
    textContainer:{
        paddingHorizontal: 20,
        alignItems: 'flex-start',
    }
})
