import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { firebaseAuth } from '../firebaseClient';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email.trim(), password);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Register</Text>
        <Divider style={styles.divider} bold />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scroll: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginTop: 20,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgb(255, 123, 0)',
    borderRadius: 12,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 30,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgb(255, 115, 0)',
    borderRadius: 40,
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgb(255, 115, 0)',
  },
  linkText: {
    color: 'gray',
    marginTop: 20,
  },
  divider: {
    width: '90%',
    marginBottom: 20,
    backgroundColor: 'rgb(255, 123, 0)',
  },
});
