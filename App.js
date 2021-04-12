import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Alert} from 'react-native';
import Loading from "./components/Loading";
import * as Location from "expo-location";
import Weather from "./components/Weather";

const API_KEY = 'fc455064eed5c2b0cf38983f2a2d3441'

export default class extends React.Component {
    state = {
        isLoading: true,
    }

    getLocation = async () => {
        try {
            const response = await Location.requestPermissionsAsync();
            console.log(response);
            const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
            this.getWeather(latitude, longitude);
        } catch (err) {
            Alert.alert('Cannot find location', 'sad :(')
        }
    }

    getWeather = async (latitude, longitude) => {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
            .then((resp) => resp.json()) // Convert data to json
            .then((data) => {
                console.log(data.name)
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
        this.getLocation();
    }

    render() {
        const {isLoading, temp, condition, city, description} = this.state;
        return (
            isLoading ? <Loading/> : <Weather temp={temp} condition={condition} city={city} description={description}/>

        );
    }
}



