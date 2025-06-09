import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import FloorLevelMenu from './FloorLevelMenu';

const categories = [
  { name: 'Buildings', icon: 'building' },
  { name: 'Rooms', icon: 'door-open' },
  { name: 'Offices', icon: 'briefcase' },
  { name: 'Facilities', icon: 'school' },
];

const CategoryButtons = ({ onMapChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('Buildings');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState('1st Floor');
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const roomsButtonRef = useRef(null);

  const handleRoomsPress = () => {
    roomsButtonRef.current.measure((fx, fy, width, height, px, py) => {
      setButtonPosition({ top: py + height + 5, left: px });
    });
    setMenuVisible(true);
  };

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
    setMenuVisible(false);
    onMapChange('indoor');
  };

  const handleCategoryPress = (categoryName) => {
    setSelectedCategory(categoryName);

    if (categoryName === 'Rooms') {
      handleRoomsPress();
    } else if (categoryName === 'Buildings') {
      onMapChange('ground');
      setMenuVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;

          return (
            <TouchableOpacity
              key={category.name}
              ref={category.name === 'Rooms' ? roomsButtonRef : null}
              style={[styles.button, isSelected && styles.selectedButton]}
              onPress={() => handleCategoryPress(category.name)}
            >
              <FontAwesome5
                name={category.icon}
                size={16}
                color={isSelected ? 'white' : 'black'}
              />
              <Text style={[styles.text, isSelected && styles.selectedButtonText]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FloorLevelMenu
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
        onSelect={handleFloorSelect}
        selectedFloor={selectedFloor}
        position={buttonPosition}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginRight: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black', 
  },
  selectedButton: {
    backgroundColor: '#d9534f',
  },
  selectedButtonText: {
    color: 'white',
  },
});

export default CategoryButtons;