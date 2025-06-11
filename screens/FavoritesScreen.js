import { ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import ShowsList from '../comps/ShowsList';
import { getFavorites } from '../utils/operationsOnLcalStorage';
import WideCard from '../comps/WideCard';

export default function FavoritesScreen() {
  const [faves, setFaves] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await getFavorites();
      setFaves(data);
    };
    fetchFavorites();
  }, []);

  return (
    <ScrollView>
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
