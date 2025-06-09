// In App.js

import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import StaticMap from './components/StaticMap';
import SearchBar from './components/SearchBar';
import CategoryButtons from './components/CategoryButtons';
import Sidebar from './components/Sidebar';
import DirectionsView from './components/DirectionsView';

// Your map image imports are perfect
const groundMap = require('./assets/main-map.png');
const indoorMap = require('./assets/sample-indoor-overview.png');
const routingMap = require('./assets/sample-routing.png');


export default function App() {
  const [currentMap, setCurrentMap] = useState(groundMap);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [uiMode, setUiMode] = useState('main');

  const handleMapChange = (mapType) => {
    if (mapType === 'indoor') {
      setCurrentMap(indoorMap);
    } else {
      setCurrentMap(groundMap);
    }
  };

  const handleStartRouting = () => {
    setCurrentMap(routingMap);
  };

  // --- THIS IS THE MODIFIED FUNCTION ---
  // It no longer resets the map, only the UI mode.
  const handleCloseDirections = () => {
    setUiMode('main');
    // We have removed this line: setCurrentMap(groundMap);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <StaticMap mapImage={currentMap} />

      <Sidebar isVisible={isSidebarVisible} onClose={() => setSidebarVisible(false)} />

      {uiMode === 'main' ? (
        <View style={styles.topBarContainer}>
          <SearchBar 
            onMenuPress={() => setSidebarVisible(true)}
            onDirectionsPress={() => setUiMode('directions')} 
          />
          <CategoryButtons onMapChange={handleMapChange} />
        </View>
      ) : (
        <DirectionsView 
          onClose={handleCloseDirections} 
          onStartRouting={handleStartRouting}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', 
  },
  topBarContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});