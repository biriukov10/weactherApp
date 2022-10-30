import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as Location from 'expo-location'
import { Alert, StyleSheet, Text, View } from 'react-native';
import Loading from './Loading'
import axios from 'axios'

const API_KEY = "a2a61fb2b168fc964748ad4df22db418"

export default class extends React.Component {
  state = {
    isLoading: true,
  }

  getWeather = async (lat, lon) => {
    const { data } = await axios.get(`
      https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}
    `);
    console.log(data, '1');
  }

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync()
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync()
      this.getWeather(latitude, longitude)
      this.setState({ isLoading: false })
    } catch(error) {
      Alert.alert('Не могу определить местоположжение:(')
    }
  }


  componentDidMount() {
    this.getLocation()
  }

  render() {
    const { isLoading } = this.state
    return (
      isLoading ? <Loading /> : null
    );
  }
}
