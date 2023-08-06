// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router instance
import store from './store';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, query, collection, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './assets/css/main.css'; // Import the main.css file

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
let app;
// export db and app
export { db, app };
// check if user is signed in using onAuthStateChanged await
const auth = getAuth();
auth.onAuthStateChanged(async (user) => {
  if (user) {
    store.commit('setSignedIn', true);
    store.commit('setUserId', user.uid);
  } else {
    store.commit('setSignedIn', false);
    store.commit('setUserId', null);
  }
  if (!app) {
    if (user) {
      store.commit('setBookmarkedQuotes', await getBookmarksForUser(user.uid));
      store.commit('setContributedQuotes', await getContributedQuotesForUser(user.uid));
    }
    store.commit('setDiscoverQuotes', await getDiscoverQuotes());
    app = createApp(App).use(store).use(router).mount('#app')
  }
});

async function getBookmarksForUser(userId) {
  var bookmarkedQuotes = [];
  try {
    const q = query(collection(db, 'bookmarks'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      // Get the quoteId from the bookmark
      const quoteId = doc.data().quoteId;
      // Get the quote from the quotes collection where the document Id matches the quoteId from the bookmark
      const quoteSnapshot = await getDocs(
        query(collection(db, 'quotes'), where('__name__', '==', quoteId)),
      );
      quoteSnapshot.forEach((doc) => {
        // Push firebase doc data to quotes
        bookmarkedQuotes.push({ ...doc.data(), quoteId: doc.id });
      });
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
  return bookmarkedQuotes;
}

async function getContributedQuotesForUser(userId) {
  var contributedQuotes = [];
  try {
    const q = query(collection(db, 'quotes'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      contributedQuotes.push({ ...doc.data() });
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
  console.log(contributedQuotes)
  return contributedQuotes;
}

async function getDiscoverQuotes() {
  var quotesList = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'quotes'));
    querySnapshot.forEach((doc) => {
      // Push firebase doc data and document id to quotesList
      quotesList.push({ ...doc.data(), quoteId: doc.id });
    });
    // shuffle the quotesList so that the quotes are in a random order
    quotesList.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
  return quotesList;
}
