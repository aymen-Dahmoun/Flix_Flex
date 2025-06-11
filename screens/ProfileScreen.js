import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../context/AuthProvider'; // Adjust path if needed
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebaseClient';
import logo from '../assets/logo.jpg'

export default function UserScreen({navigation}) {
    const { user } = useAuth(); // Assuming user has an `email` field
    const handleLogout = async () => {
        try {
            await signOut(firebaseAuth);
            navigation.replace('Login')
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <View style={{ padding: 20, backgroundColor:'white', width: "100%", height:"100%" }}>
            <Text style={{ fontSize: 18, marginBottom: 20, fontWeight:'800' }}>
                <Text style={{fontSize:28, fontWeight:'600'}}> Hello </Text>
                {user?.email}
            </Text>
            <Image 
                style={{height:180, width:180, alignSelf:'center', borderRadius: 90, marginBottom: 20}}
                source={logo}
            />
            <TouchableOpacity style={{ 
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: 'rgb(255, 115, 0)',
                borderRadius: 40,
                width: 200,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf:'center', 
                margin:20,
            }}
            onPress={()=> navigation.navigate('Favorite')}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: 'rgb(255, 115, 0)',}}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ 
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: 'rgb(255, 115, 0)',
                borderRadius: 40,
                width: 200,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf:'center', 
                margin:20,
            }}
            onPress={handleLogout}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: 'rgb(255, 115, 0)',}}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}