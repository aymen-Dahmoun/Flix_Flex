import { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView,
  Dimensions 
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import useSearch from '../hooks/useSearch';
import { useNavigation } from '@react-navigation/native';

export default function TopNavBar({ title }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { result, loading, err } = useSearch(searchQuery);
  const navigation = useNavigation();
  
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

const resultsComp = (item, idx) => {
  if (item.media_type === 'person') return null;
  return (
    <TouchableOpacity 
      key={item.id || idx}
      onPress={() => navigation.navigate('Details', { showId: item.id, type: item.media_type }) }
      style={{
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: idx < result.length - 1 ? 1 : 0,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fff',
        marginHorizontal: 2,
        borderRadius: idx === 0 ? 8 : idx === result.length - 1 ? 8 : 0,
        marginBottom: idx === result.length - 1 ? 0 : 1,
      }}
      activeOpacity={0.7}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ 
            fontSize: 16, 
            fontWeight: '500', 
            color: '#333',
            marginBottom: 2
          }}>
            {item.name || item.title || item.original_name || item.original_title}
          </Text>
          {item.overview && (
            <Text 
              style={{ 
                fontSize: 12, 
                color: '#666',
                lineHeight: 16
              }}
              numberOfLines={2}
            >
              {item.overview}
            </Text>
          )}
          {item.release_date && (
            <Text style={{ 
              fontSize: 11, 
              color: '#999',
              marginTop: 2,
              fontStyle: 'italic'
            }}>
              {new Date(item.release_date).getFullYear()}
            </Text>
          )}
        </View>
        <View style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: '#ff7300',
          marginLeft: 12
        }} />
      </View>
    </TouchableOpacity>
  );
};  return (
    <View style={{
      flexDirection: 'column',
      backgroundColor: 'rgb(255, 115, 0)',
      width: '100%',
      paddingTop: 10,
      paddingHorizontal: 16,
      paddingBottom: searchQuery.length > 0 ? 10 : 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    }}>
      {/* Header with title */}
      {title && (
        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center'
          }}>
            {title}
          </Text>
        </View>
      )}

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearchChange}
          value={searchQuery}
          style={{ 
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 25,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
          }}
          inputStyle={{
            fontSize: 16,
            color: '#333'
          }}
          iconColor="#ff7300"
          clearIcon="close-circle"
          onClearIconPress={clearSearch}
        />
      </View>

      {searchQuery.length > 0 && (
        <View style={{
          backgroundColor: 'transparent',
          borderRadius: 12,
          marginTop: 12,
          maxHeight: 280,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 8,
        }}>
          {loading && (
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 24,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ActivityIndicator size="large" color="#ff7300" />
              <Text style={{ 
                marginTop: 12, 
                color: '#666',
                fontSize: 14 
              }}>
                Searching...
              </Text>
            </View>
          )}
          
          {err && (
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 20,
              alignItems: 'center'
            }}>
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: '#fee',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12
              }}>
                <Text style={{ fontSize: 24 }}>⚠️</Text>
              </View>
              <Text style={{ 
                color: '#d32f2f',
                fontSize: 16,
                fontWeight: '500',
                textAlign: 'center',
                marginBottom: 4
              }}>
                Search Error
              </Text>
              <Text style={{ 
                color: '#666',
                fontSize: 12,
                textAlign: 'center',
                lineHeight: 16
              }}>
                {err.message || 'Something went wrong'}
              </Text>
            </View>
          )}
          
          {result && result.length > 0 ? (
            <ScrollView 
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                maxHeight: 280
              }}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {result.map(resultsComp)}
            </ScrollView>
          ) : !loading && !err && (
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 24,
              alignItems: 'center'
            }}>
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: '#f5f5f5',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12
              }}>
                <Text style={{ fontSize: 24 }}>🔍</Text>
              </View>
              <Text style={{ 
                color: '#999',
                fontSize: 16,
                fontWeight: '500',
                marginBottom: 4
              }}>
                No Results Found
              </Text>
              <Text style={{ 
                color: '#bbb',
                fontSize: 12,
                textAlign: 'center'
              }}>
                Try searching with different keywords
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}