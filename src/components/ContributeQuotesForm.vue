<template>
  <div class="bg-white">
    <main class="isolate">
      <!-- Hero section -->
      <div class="relative isolate px-6 pt-14 lg:px-8">
        <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true">
          <div
            class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
        </div>
        <div v-if="userId === null" class="px-4 sm:px-6 lg:px-8 mx-auto py-8 sm:py-12 lg:py-14">
          <p class="mt-6 text-lg leading-8 text-gray-600">You must be signed in in order to submit quotes.</p>
        </div>
        <div v-else class="px-4 sm:px-6 lg:px-8 mx-auto py-8 sm:py-12 lg:py-14">
          <form @submit.prevent="submitForm">
            <div class="space-y-12">
              <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">Contribute</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">Share your favorite quotes for other readers to discover.
                </p>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-4">
                    <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Book Title</label>
                    <div class="mt-2">
                      <div
                        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input v-model="title" type="text" id="title" required name="title" autocomplete="title"
                          class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                  </div>

                  <div class="sm:col-span-4">
                    <label for="author" class="block text-sm font-medium leading-6 text-gray-900">Author</label>
                    <div class="mt-2">
                      <div
                        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input v-model="author" type="text" id="author" required name="author" autocomplete="author"
                          class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                  </div>

                  <div v-for="(quote, index) in quotes" :key="index" class="col-span-full">
                    <label :for="'quote' + index" class="block text-sm font-medium leading-6 text-gray-900">Quote {{ index
                      + 1 }}:</label>
                    <div class="mt-2">
                      <textarea v-model="quote.text" :id="'quote' + index" required name="quote" rows="3"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                  <div class="sm:col-span-4 space-x-2">
                    <button @click.prevent="removeQuoteField" type="button"
                      class="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      <MinusIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button @click.prevent="addQuoteField" type="button"
                      class="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      <PlusIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
              <button type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
            </div>
          </form>
        </div>
        <div
          class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true">
          <div
            class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { PlusIcon, MinusIcon } from '@heroicons/vue/20/solid'
</script>


<script>
import { db } from '../main';
import { doc, writeBatch, collection } from 'firebase/firestore';
// Get the user ID from the store
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['userId', 'contributedQuotes']),
  },
  data() {
    return {
      title: '',
      author: '',
      quotes: [{ text: '' }], // Initial quote input field
    };
  },
  methods: {
    addQuoteField() {
      this.quotes.push({ text: '' });
    },
    removeQuoteField() {
      if (this.quotes.length > 1) {
        this.quotes.pop();
      }
    },
    async submitForm() {
      try {
        const batch = writeBatch(db);
        this.quotes.forEach((quote) => {
          // Add quotes to contributedQuotes array
          this.contributedQuotes.push({
            quote: quote.text,
            userId: this.userId,
            title: this.title,
            author: this.author,
            bookmarkCount: 0,
          });
          batch.set(doc(collection(db, 'quotes')), {
            quote: quote.text,
            userId: this.userId,
            title: this.title,
            author: this.author,
            bookmarkCount: 0,
          });
        });
        await batch.commit();
        this.$store.commit('setContributedQuotes', this.contributedQuotes);
        // Clear the form after submission
        this.title = '';
        this.author = '';
        this.quotes = [{ text: '' }];
      } catch (error) {
        console.error('Error saving data to Firestore:', error);
      }
    },
  },
};
</script>
