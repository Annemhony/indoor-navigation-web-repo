import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ onMenuPress, onDirectionsPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
        <Ionicons name="menu" size={28} color="#d9534f" />
      </TouchableOpacity>
      
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#999"
      />

      <View style={styles.rightIconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search" size={26} color="#d9534f" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton} onPress={onDirectionsPress}>
          <Ionicons name="git-network-outline" size={26} color="#d9534f" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 350,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  rightIconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 5,
    marginLeft: 5,
  },
});

export default SearchBar;