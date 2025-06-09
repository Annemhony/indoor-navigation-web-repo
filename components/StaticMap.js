import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';


const groundMap = require('../assets/main-map.png');
const markers = [
  { id: 1, title: 'University of Nueva Caceres', top: '79%', left: '49%' },
  { id: 2, title: 'Dr. Jaime Hernandez Monument', top: '25%', left: '39%' },
  { id: 4, title: 'UNC Chapel', top: '68%', left: '85%' },
  { id: 5, title: 'University of Nueva Caceres School of Law', top: '97%', left: '46%' },
  { id: 6, title: 'Library', top: '97%', left: '57%' },
];


const StaticMap = ({ mapImage }) => {
  const showMarkers = mapImage === groundMap;

  return (
    <ImageBackground
      source={mapImage}
      style={styles.mapBackground}
    >
      {showMarkers && markers.map(marker => (
        <TouchableOpacity
          key={marker.id}
          style={[styles.markerContainer, { top: marker.top, left: marker.left }]}
          onPress={() => Alert.alert('Location', `You tapped on ${marker.title}`)}
        >
          <View style={styles.markerPin} />
          <Text style={styles.markerText}>{marker.title}</Text>
        </TouchableOpacity>
      ))}
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  mapBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  markerPin: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#d9534f',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  markerText: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginTop: 5,
    textAlign: 'center',
    maxWidth: 120,
  },
});

export default StaticMap;