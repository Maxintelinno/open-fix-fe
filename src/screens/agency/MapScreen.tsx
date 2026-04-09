import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { mockCases } from '../../data/mockData';
import { AgencyStatusBadge } from '../../components/agency/StatusBadge';
import { UrgencyBadge } from '../../components/agency/UrgencyBadge';

const { width, height } = Dimensions.get('window');

const MapScreen: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCase, setSelectedCase] = useState(mockCases[1]); // Mock selected case
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Map Content Placeholder */}
      <View style={styles.mapPlaceholder}>
         {/* Simple background representing a map */}
         <View style={styles.mapBase}>
            {/* Mock Markers */}
            <TouchableOpacity 
              style={[styles.marker, { top: height * 0.2, left: width * 0.3, backgroundColor: theme.colors.danger.base }]}
              onPress={() => setSelectedCase(mockCases[0])}
            >
              <Text style={styles.markerText}>💡</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.marker, { top: height * 0.35, left: width * 0.6, backgroundColor: theme.colors.warning.base }]}
              onPress={() => setSelectedCase(mockCases[1])}
            >
              <Text style={styles.markerText}>🚧</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.marker, { top: height * 0.15, left: width * 0.7, backgroundColor: theme.colors.success.base }]}
              onPress={() => setSelectedCase(mockCases[2])}
            >
              <Text style={styles.markerText}>🗑️</Text>
            </TouchableOpacity>
         </View>

         {/* Floating Search */}
         <View style={styles.floatingSearch}>
            <View style={styles.searchContainer}>
               <Text style={styles.searchIcon}>🔍</Text>
               <TextInput 
                 style={styles.searchInput} 
                 placeholder={t('map.search_placeholder')}
               />
            </View>
         </View>

         {/* Filter Chips */}
         <View style={styles.floatingChips}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
               <TouchableOpacity style={[styles.chip, styles.activeChip]}>
                  <Text style={styles.activeChipText}>{t('cases.all')}</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.chip}>
                  <Text style={styles.chipText}>{t('status.pending')}</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.chip}>
                  <Text style={styles.chipText}>{t('status.in_progress')}</Text>
               </TouchableOpacity>
            </ScrollView>
         </View>

         {/* Selected Case Preview */}
         <View style={styles.previewContainer}>
            <View style={[styles.previewCard, theme.shadows.md]}>
               <View style={styles.previewHeader}>
                  <Text style={styles.previewTitle} numberOfLines={1}>{selectedCase.title}</Text>
                  <UrgencyBadge urgency={selectedCase.urgency || 'low'} />
               </View>
               <View style={styles.previewBody}>
                  <View style={styles.previewTextContainer}>
                     <Text style={styles.previewLocation}>📍 {selectedCase.location.address}</Text>
                     <View style={styles.previewStatusRow}>
                        <AgencyStatusBadge status={selectedCase.status} size="sm" />
                        <Text style={styles.previewDate}>{new Date(selectedCase.createdAt).toLocaleDateString('th-TH')}</Text>
                     </View>
                  </View>
                  <TouchableOpacity style={styles.detailButton}>
                     <Text style={styles.detailButtonText}>{t('cases.view_detail')}</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>

         {/* Current Location Button */}
         <TouchableOpacity style={[styles.locationButton, theme.shadows.sm]}>
            <Text style={styles.locationButtonIcon}>📍</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Internal ScrollView import workaround for this turn
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  mapPlaceholder: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#E5E7EB',
  },
  mapBase: {
    flex: 1,
    backgroundColor: '#DBEAFE', // Light blue map-like color
  },
  marker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  markerText: {
    fontSize: 18,
  },
  floatingSearch: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  floatingChips: {
    position: 'absolute',
    top: 85,
    width: '100%',
  },
  chipsScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chip: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activeChip: {
    backgroundColor: theme.colors.secondary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  activeChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  previewContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  previewCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    flex: 1,
    marginRight: 10,
  },
  previewBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previewTextContainer: {
    flex: 1,
  },
  previewLocation: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  previewStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  previewDate: {
    fontSize: 11,
    color: theme.colors.text.muted,
  },
  detailButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  detailButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  locationButton: {
    position: 'absolute',
    bottom: 200,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  locationButtonIcon: {
    fontSize: 24,
  },
});

export default MapScreen;
