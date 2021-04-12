import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Alert} from 'react-native';
import Loading from "./components/Loading";
import * as Location from "expo-location";
import Weather from "./components/Weather";

const API_KEY = 'fc455064eed5c2b0cf38983f2a2d3441'

export default class extends React.Component {
    state = {
        firstLoad: true,
        isLoading: true,
        city: '',
        temp: '',
        condition: '',
        description: '',
        latitude: '',
        longitude: ''
    }

    getLocation = async () => {
        try {
            const response = await Location.requestPermissionsAsync();
            const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
            this.setState({
                latitude: latitude,
                longitude: longitude,
                firstLoad: false,
            })
            await this.getWeather(this.state.latitude, this.state.longitude);
        } catch (err) {
            Alert.alert('Cannot find location', 'sad :(')
        }
    }

    randomLocation = async () => {
        const latitude = Math.random() * 180 - 90;
        const longitude = Math.random() * 360 - 180;
        this.setState({
            latitude: latitude,
            longitude: longitude,
            firstLoad: false,
        })
        await this.getWeather(latitude, longitude);

    }

    getWeather = async (latitude, longitude) => {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
            .then((resp) => resp.json()) // Convert data to json
            .then((data) => {
                this.setState({
                    isLoading: false,
                    city: data.name,
                    temp: data.main.temp,
                    condition: data.weather[0].main,
                    description: data.weather[0].description
                })
            })
            .catch((e) => {
                console.log(e);
            });
    }

    componentDidMount() {
        if(this.state.firstLoad) {
            this.getLocation()
                .then(()=> {
                    this.setState({
                        firstLoad: false,
                    })
                })
        }
    }


    render() {
        const {isLoading, temp, condition, city, description, longitude, latitude} = this.state;
        return (
            isLoading ?
                <Loading/> :
                <Weather
                    temp={temp}
                    condition={condition}
                    city={city}
                    latitude={latitude}
                    longitude={longitude}
                    description={description}
                    randomLocation={this.randomLocation}
                />

        );
    }
}



