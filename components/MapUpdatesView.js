import React, { useState } from 'react'; 
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'; 

const updatesData = [
  {
    id: 1,
    title: 'Announcement: Room AMS 104 Under Renovation',
    date: '07 - June - 2025',
    group: 'Today',
    message: 'Dear All,\n\nWe would like to inform you that room AMS 104 is currently undergoing renovation. We appreciate your understanding and patience during this time as we work to improve our facilities.\n\nThank you for your cooperation!',
  },
  {
    id: 2,
    title: 'Announcement: Room JH 26 Change Location',
    date: '25 - February - 2025',
    group: 'Earlier this year',
    message: 'Advisory:\n\nPlease be advised that the location of Room JH 26 has been temporarily changed to Room CBA 302 due to unforeseen circumstances. This change will be effective immediately until further notice.',
  },
];

const MapUpdatesView = () => {
  const [expandedAnnouncementId, setExpandedAnnouncementId] = useState(null);
  const toggleAnnouncement = (id) => {
    setExpandedAnnouncementId(expandedAnnouncementId === id ? null : id);
  };

  const groupedUpdates = updatesData.reduce((acc, update) => {
    (acc[update.group] = acc[update.group] || []).push(update);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      {Object.keys(groupedUpdates).map(groupName => (
        <View key={groupName} style={styles.groupContainer}>
          <Text style={styles.groupTitle}>{groupName}</Text>
          {groupedUpdates[groupName].map(update => (
            <View key={update.id} style={styles.updateItemContainer}>
              <TouchableOpacity style={styles.card} onPress={() => toggleAnnouncement(update.id)}>
                <View style={styles.redIndicator} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{update.title}</Text>
                  <Text style={styles.cardDate}>{update.date}</Text>
                </View>
              </TouchableOpacity>
              
              {expandedAnnouncementId === update.id && (
                <View style={styles.messageContainer}>
                  <Text style={styles.messageText}>{update.message}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupContainer: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
    marginLeft: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  updateItemContainer: {
    marginBottom: 10,
  },
  redIndicator: {
    width: 4,
    height: '100%',
    backgroundColor: '#d9534f',
    borderRadius: 2,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 12,
    color: '#888',
  },
  messageContainer: {
    backgroundColor: '#fafafa',
    borderRadius: 8,
    padding: 15,
    marginTop: -5, 
    paddingTop: 20, 
    zIndex: -1,    
  },
  messageText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

export default MapUpdatesView;