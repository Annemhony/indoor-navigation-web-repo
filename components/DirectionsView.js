import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DirectionsView = ({ onClose, onStartRouting }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={30} color="#333" />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Ionicons name="radio-button-off-outline" size={24} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Starting Location"
          placeholderTextColor="#999"
          value={startLocation}
          onChangeText={setStartLocation}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="location-sharp" size={24} color="#d9534f" />
        <TextInput
          style={styles.input}
          placeholder="Ending Location"
          placeholderTextColor="#999"
          value={endLocation}
          onChangeText={setEndLocation}
        />
      </View>

      <TouchableOpacity style={styles.startButton} onPress={onStartRouting}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <View style={styles.directionsHeader}>
        <Ionicons name="git-network-outline" size={28} color="#d9534f" />
        <Text style={styles.directionsTitle}>Directions</Text>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Ionicons name="bookmark-outline" size={24} color="#555" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 380,
    backgroundColor: '#f8f9fa',
    borderRightWidth: 1,
    borderRightColor: '#e9ecef',
    padding: 20,
    paddingTop: 50,
    elevation: 10,
    zIndex: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#dee2e6',
    marginVertical: 25,
  },
  directionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  directionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  bookmarkButton: {
    marginLeft: 'auto',
    padding: 5,
  },
});

export default DirectionsView;