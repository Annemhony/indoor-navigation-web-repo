import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const floors = ['1st Floor', '2nd Floor', '3rd Floor'];

const FloorLevelMenu = ({ isVisible, onClose, onSelect, selectedFloor, position }) => {
  if (!isVisible) return null;

  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View style={[styles.menuContainer, { top: position.top, left: position.left }]}>
          {floors.map((floor) => (
            <TouchableOpacity key={floor} style={styles.menuItem} onPress={() => onSelect(floor)}>
              {selectedFloor === floor && <View style={styles.selectedIndicator} />}
              <Text style={styles.menuItemText}>{floor}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
  },
  selectedIndicator: {
    width: 4,
    height: 25,
    backgroundColor: '#d9534f',
    borderRadius: 2,
    marginRight: 10,
  },
});

export default FloorLevelMenu;