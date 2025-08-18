
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import ShowCard from '../comps/ShowCard';
import WideCard from '../comps/WideCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useFetch from '../hooks/useFetch';
import ShowsList from '../comps/ShowsList';

export default function SeriesListScreen() {

  const [seriesList, setSeriessList] = useState([]);
  const [page, setPage] = useState(1);
  const {data: series, isLoading: loadingSeries, error: errorSeries} = useFetch('discover/tv', {
    include_adult: false,
    include_video: true,
    language: "en-US",
    sort_by: "popularity.desc",
    page: page,
  }, { staleTime: 60 * 60 * 1000 });
  const {data: trending, isLoading: loadingTrending, error: errorTrending} = useFetch('tv/top_rated', {
    include_adult: false,
    include_video: true,
    language: "en-US",
    page: 1,
    sort_by: "popularity.desc",
  }, { staleTime: 60 * 60 * 1000 });
  const {data: popular, isLoading: loadingPopular, error: errorPopular} = useFetch('tv/popular', {
    include_adult: false,
    include_video: true,
    language: "en-US",
    page: 1,
    sort_by: "popularity.desc",
  }, { staleTime: 60 * 60 * 1000 });
  const {data: upcomings, isLoading: loadingUpcomings,
    error: errorUpcomings} = useFetch('tv/on_the_air', {}, { staleTime: 60 * 60 * 1000 });
    
  useEffect(() => {
    if (series?.length > 0) {
      setSeriessList(prev => {
      const fullData = [...prev, ...series];
      const filteredData = Array.from(new Map(fullData.map(m => [m.id, m])).values());
      return filteredData;
    });
    }
  }, [series]);

  return (
    <SafeAreaProvider
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            backgroundColor:'white',
            flex: 1,}}>

      <View style={{ width: '100%', flex: 1, justifyContent: 'space-around', alignItems: 'flex-start' }}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
          <Text style={{fontSize: 28, fontWeight: '700', margin: 10}}>Series</Text>
          {!loadingUpcomings && <Text style={{fontSize: 24, fontWeight: '700', margin: 10}}>On Air, Next Week</Text>}
          <ShowsList shows={upcomings} loading={loadingUpcomings} error={errorUpcomings} Component={ShowCard} type={'tv'} />
          {!loadingTrending && <Text style={{fontSize: 24, fontWeight: '700'}}>Top Rated Five</Text>}
          <ShowsList shows={trending.slice(0, 5)} loading={loadingTrending} error={errorTrending} Component={ShowCard} type={'tv'}/>
          {!loadingSeries && <Text style={{fontSize: 24, fontWeight: '700', margin: 10}}>Popular</Text>}
          <ShowsList shows={popular} loading={loadingPopular} error={errorPopular} isHorizontal={true} Component={ShowCard} type={'tv'} />
          {!loadingSeries && <Text style={{fontSize: 24, fontWeight: '700', margin: 10}}>Discover</Text>}
          <ShowsList shows={seriesList} loading={loadingSeries} error={errorSeries} isHorizontal={false} Component={WideCard} type={'tv'} />
          <TouchableOpacity style={{ height: 40, width: 150, alignSelf:'center', borderWidth:1, borderColor: 'rgb(255, 115, 0)', borderRadius:40, flex:1, alignItems:'center', justifyContent:'center', margin:10 }} 
            onPress={()=>setPage(prev => prev + 1)} >
            <Text style={{fontSize: 16, fontWeight: '700', margin: 10}}>More</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );

}