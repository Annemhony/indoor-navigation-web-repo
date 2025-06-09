import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapUpdatesView from './MapUpdatesView';

const { width } = Dimensions.get('window');
const sidebarWidth = width * 0.25;

const Sidebar = ({ isVisible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-sidebarWidth)).current;
  const [sidebarView, setSidebarView] = useState('main');
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => {
        setSidebarView('main');
      }, 300);
    }
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : -sidebarWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  if (!isVisible && slideAnim._value === -sidebarWidth) {
    return null;
  }

  const handleBackPress = () => {
    setSidebarView('main');
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.header}>
          {sidebarView === 'main' ? (
            <>
              <Image source={require('../assets/logo.png')} style={styles.logo} />
              <View>
                <Image source={require('../assets/GoUNC.png')} style={styles.titleImage} />
                <Image source={require('../assets/Your Campus Guide.png')} style={styles.subtitleImage} />
              </View>
            </>
          ) : (
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
              <Text style={styles.backButtonText}>Updates</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={30} color="#333" />
          </TouchableOpacity>
        </View>

        {sidebarView === 'main' ? (
          <View style={styles.menu}>
        
            <TouchableOpacity
              onPress={() => { }}
              onMouseEnter={() => setHoveredItem('saved')}
              onMouseLeave={() => setHoveredItem(null)}
              style={[styles.menuItem, hoveredItem === 'saved' && styles.hoveredMenuItem]}
            >
              <Ionicons
                name="bookmark-outline"
                size={24}
                color={hoveredItem === 'saved' ? '#d9534f' : '#555'}
              />
              <Text style={[styles.menuItemText, hoveredItem === 'saved' && styles.hoveredMenuItemText]}>
                Saved Locations
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSidebarView('updates')}
              onMouseEnter={() => setHoveredItem('updates')}
              onMouseLeave={() => setHoveredItem(null)}
              style={[styles.menuItem, hoveredItem === 'updates' && styles.hoveredMenuItem]}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color={hoveredItem === 'updates' ? '#d9534f' : '#555'}
              />
              <Text style={[styles.menuItemText, hoveredItem === 'updates' && styles.hoveredMenuItemText]}>
                Map Updates
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <MapUpdatesView />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: sidebarWidth,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 20,
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  closeButton: {
    marginLeft: 'auto',
  },
  titleImage: {
    width: 100,
    height: 25,
    resizeMode: 'contain',
  },
  subtitleImage: {
    width: 140,
    height: 20,
    resizeMode: 'contain',
    marginTop: 4,
  },
  menu: {
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    transitionDuration: '0.2s', 
  },
  menuItemText: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  
  hoveredMenuItem: {
    backgroundColor: '#FEEBEE',
  },
  hoveredMenuItemText: {
    color: '#d9534f',
  },
});

export default Sidebar;