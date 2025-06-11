import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function BottomNavBar() {
    const navigation = useNavigation();
    const [isActive, setIsActive] = useState('movie');
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: 'rgb(255, 115, 0)', width: '100%' }}>
      <IconButton
        icon="movie"
        size={24}
        iconColor="#fff"
        onPress={() => navigation.navigate('Movies')}
      />
      <IconButton
        icon="television"
        size={24}
        iconColor="#fff"
        onPress={() => navigation.navigate('Series')}
      />
      <IconButton
        icon="account"
        size={24}
        iconColor="#fff"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}