import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APP_KEY,
  authDomain: 'hex-vue-chatroom.firebaseapp.com',
  projectId: 'hex-vue-chatroom',
  storageBucket: 'hex-vue-chatroom.appspot.com',
  messagingSenderId: '474580482983',
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL:
    'https://hex-vue-chatroom-default-rtdb.asia-southeast1.firebasedatabase.app',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getDatabase(app)
