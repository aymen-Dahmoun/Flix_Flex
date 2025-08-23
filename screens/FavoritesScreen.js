import { ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import ShowsList from '../comps/ShowsList';
import { getFavorites } from '../utils/operationsOnLcalStorage';
import WideCard from '../comps/WideCard';
import { useSharedValue } from 'react-native-reanimated';
import { AnimatedSectionTitle } from '../comps/AnimatedLayouts';

export default function FavoritesScreen() {
  const [faves, setFaves] = useState([]);
  const scrollY = useSharedValue(0);


  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await getFavorites();
      setFaves(data);
    };
    fetchFavorites();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <AnimatedSectionTitle title="Favorites" scrollY={scrollY} />
      <ShowsList
        shows={faves}
        loading={false}
        error={false}
        isHorizontal={false}
        Component={WideCard}
        type="movie"
      />
    </ScrollView>
  );
}
