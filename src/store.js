// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    signedIn: false,
    userId: null,
    contributedQuotes: [],
    bookmarkedQuotes: [],
    discoverQuotes: [],
    discoverQuoteIndex: -1,
  },
  mutations: {
    setSignedIn(state, isSignedIn) {
      state.signedIn = isSignedIn;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setContributedQuotes(state, contributedQuotes) {
      state.contributedQuotes = contributedQuotes;
    },
    setBookmarkedQuotes(state, bookmarkedQuotes) {
      state.bookmarkedQuotes = bookmarkedQuotes;
    },
    setDiscoverQuotes(state, discoverQuotes) {
      state.discoverQuotes = discoverQuotes;
    },
    setDiscoverQuotesIndex(state, discoverQuoteIndex) {
      state.discoverQuoteIndex = discoverQuoteIndex;
    }
  },
});

export default store;
