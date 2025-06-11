import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MainRouter from './MainRouter';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthProvider';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaProvider style={styles.container}>
          <SafeAreaView style={{ flex: 1, width: '100%' }}>
            <PaperProvider>
              <MainRouter />
            </PaperProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});