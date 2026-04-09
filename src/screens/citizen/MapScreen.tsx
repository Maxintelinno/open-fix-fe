import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';
import { theme } from '../../theme';
import { CaseStatus } from '../../types';
import { mockCases } from '../../data/mockData';
import { StatusBadge } from '../../components/StatusBadge';
import { useTranslation } from 'react-i18next';

const MapScreen: React.FC = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<CaseStatus | 'ALL'>('ALL');
  const [viewMode, setViewMode] = useState<'MAP' | 'LIST'>('MAP');

  const filters: { label: string; value: CaseStatus | 'ALL' }[] = [
    { label: t('map.filter_all'), value: 'ALL' },
    { label: t('map.filter_pending'), value: 'PENDING' },
    { label: t('map.filter_in_progress'), value: 'IN_PROGRESS' },
    { label: t('map.filter_completed'), value: 'COMPLETED' },
  ];

  const filteredCases = activeFilter === 'ALL' 
    ? mockCases 
    : mockCases.filter(c => c.status === activeFilter);

  return (
    <SafeAreaView style={styles.container}>
      {/* Search and Filters */}
      <View style={styles.topContainer}>
        <View style={styles.searchBar}>
          <Text style={{ marginRight: 10 }}>🔍</Text>
          <TextInput 
            placeholder={t('map.search_placeholder')} 
            style={styles.searchInput}
            placeholderTextColor={theme.colors.gray[400]}
          />
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filterContainer}
        >
          {filters.map((f) => (
            <TouchableOpacity 
              key={f.value} 
              style={[
                styles.filterChip,
                activeFilter === f.value && styles.filterChipActive
              ]}
              onPress={() => setActiveFilter(f.value)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === f.value && styles.filterTextActive
              ]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {viewMode === 'MAP' ? (
        <View style={styles.mapContainer}>
          {/* Mock Map Placeholder */}
          <View style={styles.mockMap}>
             <View style={styles.mapTexture}>
               {/* Just lines and dots to simulate a map */}
               <View style={[styles.mapLine, { top: '20%', height: 2, width: '100%', backgroundColor: '#E2E8F0' }]} />
               <View style={[styles.mapLine, { left: '40%', width: 2, height: '100%', backgroundColor: '#E2E8F0' }]} />
               <View style={[styles.mapLine, { top: '60%', height: 2, width: '100%', transform: [{ rotate: '15deg' }], backgroundColor: '#E2E8F0' }]} />
               
               {/* Markers */}
               {filteredCases.map((item, index) => (
                 <TouchableOpacity 
                   key={item.id}
                   style={[
                     styles.marker, 
                     { 
                       top: `${20 + (index * 15)}%`, 
                       left: `${15 + (index * 20)}%` 
                     }
                   ]}
                 >
                   <View style={[
                     styles.markerDot, 
                     { backgroundColor: item.status === 'PENDING' ? theme.colors.warning.base : item.status === 'IN_PROGRESS' ? theme.colors.secondary : theme.colors.success.base }
                   ]} />
                   <View style={styles.markerStem} />
                 </TouchableOpacity>
               ))}
             </View>
             
             <Text style={styles.mapPlaceholderText}>{t('map.title')}</Text>
             <Text style={styles.mapPlaceholderSubtext}>{t('home.info_card')}</Text>
          </View>

          {/* Floating Action Buttons */}
          <View style={styles.fabContainer}>
             <TouchableOpacity style={styles.fab} onPress={() => setViewMode('LIST')}>
                <Text style={styles.fabIcon}>📜</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.fab}>
                <Text style={styles.fabIcon}>🎯</Text>
             </TouchableOpacity>
          </View>

          {/* Issue Preview (Bottom Card) */}
          <View style={styles.previewCard}>
             <View style={styles.dragHandle} />
             <View style={styles.previewContent}>
                <View style={{ flex: 1 }}>
                   <Text style={styles.previewTitle}>{mockCases[1].title}</Text>
                   <Text style={styles.previewAddress}>{mockCases[1].location.address}</Text>
                   <View style={{ marginTop: 8 }}>
                      <StatusBadge status={mockCases[1].status} />
                   </View>
                </View>
                <View style={styles.previewImagePlaceholder}>
                   <Text>📸</Text>
                </View>
             </View>
          </View>
        </View>
      ) : (
        <FlatList
          data={filteredCases}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem}>
               <View style={styles.listItemHeader}>
                  <Text style={styles.listItemTitle}>{item.title}</Text>
                  <StatusBadge status={item.status} />
               </View>
               <Text style={styles.listItemAddress}>📍 {item.location.address}</Text>
               <Text style={styles.listItemDistance}>0.4 km {t('map.nearby')}</Text>
            </TouchableOpacity>
          )}
          ListHeaderComponent={() => (
             <View style={styles.listHeader}>
                <Text style={styles.listHeaderText}>{t('map.nearby')}</Text>
                <TouchableOpacity onPress={() => setViewMode('MAP')}>
                   <Text style={styles.viewToggleText}>{t('map.title')}</Text>
                </TouchableOpacity>
             </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
    zIndex: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
  },
  filterContainer: {
    paddingVertical: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[100],
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterChipActive: {
    backgroundColor: '#EFF6FF',
    borderColor: theme.colors.secondary,
  },
  filterText: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
  },
  filterTextActive: {
    color: theme.colors.secondary,
  },
  mapContainer: {
    flex: 1,
  },
  mockMap: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapTexture: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  mapLine: {
    position: 'absolute',
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
  },
  markerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  markerStem: {
    width: 2,
    height: 4,
    backgroundColor: 'white',
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.gray[400],
  },
  mapPlaceholderSubtext: {
    fontSize: 12,
    color: theme.colors.gray[400],
    marginTop: 4,
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
    top: 16,
    gap: 12,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  fabIcon: {
    fontSize: 20,
  },
  previewCard: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.gray[300],
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  previewContent: {
    flexDirection: 'row',
  },
  previewTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  previewAddress: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  previewImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  listContainer: {
    padding: theme.spacing.md,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  listHeaderText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  viewToggleText: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: '500',
  },
  listItem: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 16,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listItemTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'semibold',
    color: theme.colors.text.primary,
    flex: 1,
    marginRight: 8,
  },
  listItemAddress: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  listItemDistance: {
    fontSize: 10,
    color: theme.colors.text.muted,
  },
});

export default MapScreen;
