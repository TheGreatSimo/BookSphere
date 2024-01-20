import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "booksphere-5a19b.firebaseapp.com",
  projectId: "booksphere-5a19b",
  storageBucket: "booksphere-5a19b.appspot.com",
  messagingSenderId: "750010563837",
  appId: "1:750010563837:web:8a4fbee92bc572d2a71294",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);