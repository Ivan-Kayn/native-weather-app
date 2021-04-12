import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import propTypes from 'prop-types';
import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from "expo-linear-gradient";
import ButtonComponent from './ButtonComponent';

function convertDEGtoDMS(degValue, type) {
    function formatLatitude(deg, min, sec) {
        return `${deg}° ${min}' ${sec}" ${deg > 0 ? 'N':'S'}`
    }
    function formatLongitude(deg, min, sec) {
        return `${deg}° ${min}' ${sec}" ${deg > 0 ? 'E':'O'}`
    }
    let Deg = Math.floor(degValue);
    let Min = Math.floor(((degValue - Deg) * 60));
    let Sec = Math.floor((((degValue - Deg) * 60) - Min) * 60);
    if (Sec === 60) {
        Min++;
        Sec = 0;
    }
    if (Min === 60) {
        Deg++;
        Min = 0;
    }

    if(type === 'latitude'){
        return formatLatitude(Deg, Min, Sec);
    }
    if(type === 'longitude'){
        return formatLongitude(Deg, Min, Sec);
    }
    return console.log('please specify the type');

}


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
    Clear: {
        iconName: 'sunny-outline',
        subtitle: 'Perfect for meditation',
    },
    Mist: {
        iconName: 'sunny-outline',
        subtitle: 'I don\'n know :)',
    },
    Smoke: {
        iconName: 'sunny-outline',
        subtitle: 'I don\'n know :)',
    },
    Haze: {
        iconName: 'sunny-outline',
        subtitle: 'I don\'n know :)',
    },
    Dust: {
        iconName: 'sunny-outline',
        subtitle: 'I don\'n know :)',
    },
    Ash: {
        iconName: 'sunny-outline',
        subtitle: 'I don\'n know :)',
    },
    Squall: {
        iconName: 'sunny-outline',
        subtitle: 'I don\'n know :)',
    },
    Tornado: {
        iconName: 'sunny-outline',
        subtitle: 'I don\'n know :)',
    }
}

export default function Weather({temp, condition, city, description, randomLocation, latitude, longitude}) {
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
                <View style={styles.coordinatesContainer}>
                    <Text style={styles.coordinates}>{convertDEGtoDMS(latitude, 'latitude')}</Text>
                    <Text style={styles.coordinates}>{convertDEGtoDMS(longitude, 'longitude')}</Text>
                </View>
            </View>

            <View style={{...styles.climeContainer, ...styles.textContainer}}>
                <Text style={styles.title}>{description.charAt(0).toUpperCase() + description.slice(1)}</Text>
                <Text style={styles.subtitle}> {weatherOptions[condition].subtitle} </Text>
            </View>
            <ButtonComponent
                randomLocation={randomLocation}
            > hello</ButtonComponent>
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
    coordinatesContainer: {
        flexDirection: 'row',
        color: 'white',
    },
    coordinates: {
        color: 'white',
        paddingHorizontal: 10,
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
    city: {
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
    textContainer: {
        paddingHorizontal: 20,
        alignItems: 'flex-start',
    }
})
