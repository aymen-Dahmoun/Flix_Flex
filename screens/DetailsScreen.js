import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Alert } from 'react-native';
import { Card, PaperProvider, Portal, Modal, IconButton, Divider, ActivityIndicator } from 'react-native-paper';
import WebView from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';
import useFetch from '../hooks/useFetch';
import ShowsList from '../comps/ShowsList';
import ShowCard from '../comps/ShowCard';
import ImageViewing from 'react-native-image-viewing';

export default function DetailsScreen({ route }) {
  const { showId, type } = route.params;
  const { width, height } = Dimensions.get('window');

  const [isWatching, setIsWatching] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  const queryOpts = { staleTime: 3 * 60 * 1000 }; // 3 minutes
  const { data, loading, error } = useFetch(`${type}/${showId}`, {}, queryOpts);
  const { data: videos, loading: loadingVideos } = useFetch(`${type}/${showId}/videos`, {}, queryOpts);
  const { data: similarShows, loading: loadingSimilar } = useFetch(`${type}/${showId}/similar`, {}, queryOpts);

  if (loading || loadingVideos || !data) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  const trailer = videos?.find(
    (video) => video.type === 'Trailer' && video.official && video.site === 'YouTube'
  );

  const images = [
    data.backdrop_path && { uri: `https://image.tmdb.org/t/p/w500/${data.backdrop_path}` },
    data.poster_path && { uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}` },
    ...(data.production_companies?.map(
      (c) => c.logo_path && { uri: `https://image.tmdb.org/t/p/w500/${c.logo_path}` }
    ) || []),
  ].filter(Boolean);

  const openImage = (path, index = 0) => {
    if (!path) {
      Alert.alert('No image available');
      return;
    }
    setImageIndex(index);
    setIsImageViewVisible(true);
  };

  return (
    <PaperProvider>
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* Hero Section */}
        <View style={{ borderBlockColor: '#fff'}}>
          <View style={{ height: height * 0.29 + 80, width }}>
            <TouchableOpacity onPress={() => openImage(data.backdrop_path, 0)}>
              <Card.Cover
                source={{ uri: `https://image.tmdb.org/t/p/w500/${data.backdrop_path}` }}
                style={{ width, height: height * 0.29, borderRadius: 8 }}
                resizeMode="cover"
              />
            </TouchableOpacity>

            {trailer && (
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgb(255, 115, 0)',
                  borderRadius: 5,
                  position: 'absolute',
                  bottom: 85,
                  right: 10,
                }}
                onPress={() => setIsWatching(true)}
              >
                <IconButton icon="play" iconColor="white" />
              </TouchableOpacity>
            )}

            {/* Poster + Title */}
            <View style={{ position: 'absolute', bottom: 0, left: 10, flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => openImage(data.poster_path, 1)}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}` }}
                  style={{
                    width: 107,
                    height: 160,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#ccc',
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Card.Title
                  title={data.title || data.name}
                  subtitle={data.release_date || data.first_air_date}
                  titleNumberOfLines={1}
                  subtitleNumberOfLines={1}
                  titleStyle={{ fontSize: 24, fontWeight: 'bold', color: '#000', marginTop: 90 }}
                />
              </View>
            </View>
          </View>

          {/* Metadata */}
          <Card.Content>
            {data.tagline ? (
              <Text style={{ fontStyle: 'italic', color: '#888', marginBottom: 5, fontSize: 16 }}>
                "{data.tagline}"
              </Text>
            ) : null}

            <Text style={{ fontSize: 14, color: '#666' }}>
              Original Title:{' '}
              <Text style={{ fontWeight: '600' }}>
                {data.original_title || data.original_name}
              </Text>
            </Text>

            <Text style={{ fontSize: 14, color: '#666' }}>
              First Air Date:{' '}
              <Text style={{ fontWeight: '600' }}>
                {data.first_air_date || data.release_date}
              </Text>
            </Text>

            <Text style={{ fontSize: 14, color: '#666' }}>
              Status: <Text style={{ fontWeight: '600' }}>{data.status}</Text>
            </Text>

            {/* Genres */}
            {data.genres?.length > 0 && (
              <View style={{ marginTop: 5 }}>
                <Text style={{ fontSize: 14, color: '#666' }}>Genres:</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
                  {data.genres.map((genre) => (
                    <Text
                      key={genre.id}
                      style={{
                        fontWeight: '600',
                        fontSize: 14,
                        color: '#666',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        padding: 3,
                        margin: 3,
                        backgroundColor: '#f0f0f0',
                      }}
                    >
                      {genre.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Runtime */}
            {data.episode_run_time?.length > 0 && (
              <Text style={{ fontSize: 14, color: '#666' }}>
                Episode Runtime: {data.episode_run_time[0]} mins
              </Text>
            )}

            {/* Rating */}
            <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>
              Rate:{' '}
              <Text style={{ fontWeight: '600' }}>
                {data.vote_average} ({data.vote_count} votes)
              </Text>
            </Text>

            {/* Overview */}
            <Text style={{ fontSize: 20, color: '#666', marginTop: 10, fontWeight: 'bold' }}>
              Story:
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 10, color: '#333' }}>
              {data.overview}
            </Text>

            {/* Production Companies */}
            {data.production_companies?.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 16, color: '#666', fontWeight: 'bold' }}>
                  Production Companies:
                </Text>
                {data.production_companies.map((company, idx) => (
                  <TouchableOpacity
                    key={company.id}
                    onPress={() => openImage(company.logo_path, 2 + idx)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 5,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                      padding: 5,
                      backgroundColor: '#f0f0f0',
                    }}
                  >
                    {company.logo_path && (
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500/${company.logo_path}`,
                        }}
                        style={{ width: 80, height: 40, borderRadius: 5, marginRight: 10 }}
                      />
                    )}
                    <Text>{company.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Card.Content>
        </View>

        {/* Similar Shows */}
        {!loadingSimilar && (
          <View style={{ marginTop: 20, marginBottom: 30 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', margin: 10 }}>Similar</Text>

            <ShowsList
              shows={similarShows}
              loading={loadingSimilar}
              error={null}
              isHorizontal
              Component={ShowCard}
              type={type}
            />
          </View>
        )}
      </ScrollView>

      {/* Trailer Modal */}
      <Portal>
        <Modal
          visible={isWatching}
          onDismiss={() => setIsWatching(false)}
          contentContainerStyle={{
            backgroundColor: 'white',
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

      <ImageViewing
        images={images}
        imageIndex={imageIndex}
        visible={isImageViewVisible}
        onRequestClose={() => setIsImageViewVisible(false)}
        backgroundColor='rgba(0, 0, 0, 0.1)'
      />
    </PaperProvider>
  );
}
