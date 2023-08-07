<!-- Vue Component which shows a quote from a book followed by a button, which once clicked reveals the author and book title the quote is from-->
<template>
  <div class="relative isolate px-6 pt-14 lg:px-8">
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="mx-auto max-w-2xl py-8 sm:py-12 lg:py-14">
      <div class="text-center">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">"{{ quote }}"</h1>
        <p v-if="reveal" class="mt-6 text-lg leading-8 text-gray-600">{{ title }} by {{ author }}</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <button v-if="!reveal" @click="reveal = true"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Unquote</button>
          <button :disabled="bookmarked" @click="saveToBookmarks"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <BookmarkSolid v-if="signedIn && bookmarked" class="w-6 h-6" />
            <BookmarkOutline v-else class="w-6 h-6" />
          </button>
          <button @click="getQuote" class="text-sm font-semibold leading-6 text-gray-900">New Quote <span
              aria-hidden="true">→</span></button>
        </div>
        <p v-if="showBookmarkMessage" class="mt-6 text-lg leading-8 text-gray-600">You must be logged in in order to
          bookmark quotes</p>
      </div>
    </div>
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true">
      <div
        class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
  </div>
</template>

<script setup>
import { BookmarkIcon as BookmarkOutline } from '@heroicons/vue/24/outline'
import { BookmarkIcon as BookmarkSolid } from '@heroicons/vue/24/solid'
</script>

<script>
import { mapState, mapMutations } from 'vuex';
import { db } from '../main';
import { setDoc, doc } from 'firebase/firestore';

export default {
  computed: {
    ...mapState(['signedIn', 'userId', 'discoverQuotes', 'bookmarkedQuotes', 'discoverQuoteIndex']),
  },
  data() {
    return {
      quote: 'Loading...',
      author: 'Loading..',
      title: 'Loading...',
      quoteId: '',
      reveal: false,
      showBookmarkMessage: false,
      bookmarked: false,
    };
  },
  mounted() {
    // Get the first quote from the discoverQuotes list
    this.getQuote();
    // If the user is signed in, check if the quote is bookmarked
  },
  methods: {
    ...mapMutations(['setDiscoverQuotesIndex', 'setBookmarkedQuotes']),
    getQuote() {
      // Get next quote from discoverQuotes and set the quote, author, and book;
      this.quoteIndex = (this.discoverQuoteIndex + 1) % this.discoverQuotes.length; // Increment the quoteIndex and loop back to 0 when it reaches the end of the quotesList
      this.$store.commit('setDiscoverQuotesIndex', this.quoteIndex); // Update the quoteIndex in the store
      this.quote = this.discoverQuotes[this.discoverQuoteIndex].quote;
      this.author = this.discoverQuotes[this.discoverQuoteIndex].author;
      this.title = this.discoverQuotes[this.discoverQuoteIndex].title;
      this.quoteId = this.discoverQuotes[this.discoverQuoteIndex].quoteId;
      this.reveal = false; // Hide the author and book after getting a new quote
      this.showBookmarkMessage = false; // Hide the bookmark message after getting a new quote
      this.bookmarked = false; // Reset the bookmarked flag
      if (this.signedIn) {
        this.bookmarked = this.bookmarkedQuotes.find((quote) => quote.quoteId === this.quoteId);
      }
    },
    async saveToBookmarks() {
      if (this.signedIn) {
        // Save the quote to the bookmark table which maps a userId to a quoteId
        await setDoc(doc(db, 'bookmarks', `${this.userId}_${this.quoteId}`), {
          userId: this.userId,
          quoteId: this.quoteId,
        });
        // increment the bookmark count for the quote and keep the rest of the fields the same
        await setDoc(
          doc(db, 'quotes', this.quoteId),
          {
            bookmarkCount: parseInt(this.discoverQuotes[this.discoverQuoteIndex].bookmarkCount) + 1,
          },
          { merge: true },
        );
        // Add the quote to the bookmarkedQuotes list in the store
        this.bookmarkedQuotes.push({
          quoteId: this.quoteId,
          quote: this.quote,
          author: this.author,
          title: this.title
        });
        // Update the bookmarkedQuotes list in the store
        this.$store.commit('setBookmarkedQuotes', this.bookmarkedQuotes);
        this.bookmarked = true;
        this.showBookmarkMessage = false;
      } else {
        // Show a message to the user that they need to sign in to save the quote
        this.showBookmarkMessage = true;
      }
    },
  },
};
</script>
