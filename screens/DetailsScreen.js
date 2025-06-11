import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Card, PaperProvider, Portal, Modal, IconButton, Divider, ActivityIndicator } from 'react-native-paper';
import WebView from 'react-native-webview';
import useFetch from '../hooks/useFetch';
import { ScrollView } from 'react-native-gesture-handler';
import ShowsList from '../comps/ShowsList';
import ShowCard from '../comps/ShowCard';


export default function DetailsScreen({ navigation, route }) {

  const { showId, type } = route.params;
  const { width, height } = Dimensions.get('window');
  const [isWatching, setIsWatching] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  const { data, loading, error } = useFetch(`${type}/${showId}`);
  const {data:SimilarShows, loading: SimilarShowsLoading, error: SimilarShowsErr} 
        = useFetch(`${type}/${showId}/similar`)
  
  const { data: videos, loading: loadingVideos, error: errorVideos } = useFetch(`${type}/${showId}/videos`);
  if (loading || loadingVideos || !data || !videos) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color='orange'/>
      </View>
    );
  }

  const trailer = videos.find(
    (video) =>
      video.type === 'Trailer' &&
      video.official === true &&
      video.site === 'YouTube'
  );

  return (
    <PaperProvider>
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Card>
        <View style={{ height: height * 0.29 + 80, width: width, position: 'relative' }}>
        <TouchableOpacity
          onPress={() => setImageVisible(`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`)}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Card.Cover
            source={{ uri: `https://image.tmdb.org/t/p/w500/${data.backdrop_path}` }}
            style={{
              width: width,
              height: height * 0.29,
              alignSelf: 'center',
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
          </TouchableOpacity>
          {trailer && (
            <TouchableOpacity
              style={{
                
                backgroundColor: 'rgb(255, 115, 0)',
                borderRadius: 5,
                alignSelf: 'center',
                position: 'absolute',
                bottom: 85,
                right: 10,
                marginBottom: 10,
              }}
              onPress={() => setIsWatching(true)}
            >
              <IconButton
                icon="play" />
            </TouchableOpacity>
          )}
          <View style={{ position: 'absolute', bottom: 0, left: 10, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity 
              onPress={() => setImageVisible(`https://image.tmdb.org/t/p/w500/${data.poster_path}`)}
            >
              <Image 
              source={{ uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}` }}
              style={{ width: 107, height: 160, borderRadius: 5, borderWidth: 1, borderColor: '#ccc' }}
              resizeMode="cover"
            />
            </TouchableOpacity>
          <View style={{ flex: 1 }}>
          <Card.Title
            title={data.title || data.name}
            subtitle={data.release_date || data.first_air_date}
            titleNumberOfLines={1}
            subtitleNumberOfLines={1}
            titleStyle={{ fontSize: 24, fontWeight: 'bold', color: '#000', marginTop:56 }}
          />
          </View>
          </View>
          </View>
          
          <Card.Content>
            {data.tagline ? (
              <Text style={{ fontStyle: 'italic', color: '#888', marginBottom: 5, fontSize: 16 }}>
                "{data.tagline}"
              </Text>
            ) : null}

            <Text style={{ fontSize: 14, color: '#666' }}>
              Original Title: <Text style={{fontWeight:"600"}}>{data.original_title || data.original_name}</Text>
            </Text>

            <Text style={{ fontSize: 14, color: '#666' }}>
              First Air Date: <Text style={{fontWeight:"600"}}>{data.first_air_date || data.release_date}</Text>
            </Text>

            <Text style={{ fontSize: 14, color: '#666' }}>
              Status: <Text style={{fontWeight:"600"}}> {data.status}</Text>
            </Text>

            {data.genres?.length > 0 && (
              <View style={{ flex:1, flexDirection: 'column', marginTop: 5 }}>
                <Text style={{ fontSize: 14, color: '#666' }}>
                  Genres:
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
                {data.genres.map((genre) => (
                  <Text key={genre.id} style={{fontWeight:'600', fontSize: 14, color: '#666', marginLeft: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 3, marginRight: 5, backgroundColor: '#f0f0f0' }}>
                    {genre.name}
                  </Text>
                ))
                }
                </View>
              </View>
            )}
            {data.episode_run_time?.length > 0 && (
              <Text style={{ fontSize: 14, color: '#666' }}>
                Episode Runtime: {data.episode_run_time[0]} mins
              </Text>
            )}

            <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>
              Rate: 
              <Text style={{ fontWeight: '600' }}>
                {data.vote_average} ({data.vote_count} votes)
              </Text>
            </Text>

            {data.languages?.length > 0 && (
              <Text style={{ fontSize: 14, color: '#666' }}>
                Languages: 
                <Text style={{ fontWeight: '600' }}>
                  {data.languages.map(lang => lang.name).join(', ')}
                </Text>
              </Text>
            )}
            <Text style={{ fontSize: 20, color: '#666', marginTop: 5, fontWeight: 'bold' }}>
              Story:
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 10, color: '#333', marginLeft: 10 }}>
              {data.overview}
            </Text>

            {data.production_companies?.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 16, color: '#666', fontWeight: 'bold' }}>
                  Production Companies:
                </Text>
                <View style={{ flexDirection: 'column', margin:5, flexWrap: 'wrap', marginTop: 5 }}>
                  {data.production_companies.map((company) => (
                    <TouchableOpacity key={company.id} 
                      onPress={() => {
                        if (company.logo_path) {
                          setImageVisible(`https://image.tmdb.org/t/p/w500/${company.logo_path}`);
                        } else {
                          alert('No logo available for this company');
                        }
                      }}
                      style={{ 
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 5, 
                        fontSize: 18,
                        color: '#666',
                        marginRight: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        padding: 3,
                        marginVertical: 2,
                        backgroundColor: '#f0f0f0',}}>
                    <Image
                      key={company.id}
                      source={{ uri: `https://image.tmdb.org/t/p/w500/${company.logo_path}` }}
                      style={{ width: 80, height: 40, marginRight: 5, borderRadius: 5, marginRight:16 }} />
                    <Text> {company.name} </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            
            )}

          </Card.Content>
        </Card>

        <Portal>
          <Modal
            visible={isWatching}
            onDismiss={() => setIsWatching(false)}
            contentContainerStyle={{
              backgroundColor: 'white',
              padding: 0,
              borderRadius: 10,
              width: width * 0.9,
              height: height * 0.35,
              alignSelf: 'center',
              overflow: 'hidden',
            }}
          >
            <WebView
              source={{ uri: `https://www.youtube.com/embed/${trailer?.key}` }}
              style={{ flex: 1 }}
              javaScriptEnabled
              allowsFullscreenVideo
            />
          </Modal>
        </Portal>
      {!SimilarShowsLoading && <Text style={{fontSize: 24, fontWeight: '700', margin: 10}}>Similar</Text>}
          <Divider 
            style={{
              width: '90%',
              backgroundColor:'rgb(255, 123, 0)',
              alignSelf: 'center',}}
            bold={false} />
          <ShowsList shows={SimilarShows} loading={SimilarShowsLoading} error={SimilarShowsErr} isHorizontal={true} Component={ShowCard} type={type} />
      </ScrollView>
      {imageVisible && (
        <Portal>
          <Modal
            visible={imageVisible}
            onDismiss={() => setImageVisible(false)}
            contentContainerStyle={{
              backgroundColor: 'white',
              padding: 0,
              borderRadius: 10,
              width: width * 0.8,
              height: 'auto',
              alignSelf: 'center',
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: imageVisible }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </Modal>
        </Portal>
      )}

    </PaperProvider>

  );
}
