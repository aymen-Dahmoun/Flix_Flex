import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} = Constants.expoConfig?.extra || {};

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// console.log('Initializing Firebase with config:', {
//   hasApiKey: !!FIREBASE_API_KEY,
//   hasProjectId: !!FIREBASE_PROJECT_ID,
//   projectId: FIREBASE_PROJECT_ID
// });

export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const firebaseDB = getFirestore(firebaseApp);

// // Add debug logging for exports
// console.log('Firebase exports:', {
//   app: !!firebaseApp,
//   auth: !!firebaseAuth,
//   db: !!firebaseDB
// });