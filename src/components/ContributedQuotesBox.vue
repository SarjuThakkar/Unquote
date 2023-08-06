<!--Vue component that displays all the quotes a user has bookmarked. When the component loads it will search the bookmarks collection where userId field matches the userId in the VueX store. Then from those returned bookmarks it will read the quoteId and retrieve the quotes from the quotes collection in firebase. ALl of these will be displayed with the quote, title, and author in a table -->
<!--Vue component that displays all the quotes a user has bookmarked. When the component loads it will search the bookmarks collection where userId field matches the userId in the VueX store. Then from those returned bookmarks it will read the quoteId and retrieve the quotes from the quotes collection in firebase. ALl of these will be displayed with the quote, title, and author in a table -->
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
          <p class="mt-6 text-lg leading-8 text-gray-600">You must be signed in to view your quotes.</p>
        </div>
        <div v-else class="px-4 sm:px-6 lg:px-8 mx-auto py-8 sm:py-12 lg:py-14">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-base font-semibold leading-6 text-gray-900">Your Quotes</h1>
            </div>
          </div>
          <div class="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Quote
                  </th>
                  <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                    Title</th>
                  <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                    Author</th>
                  <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                    Times Bookmarked</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(quote, quoteIdx) in contributedQuotes" :key="quote.quoteId">
                  <td
                    :class="[quoteIdx === 0 ? '' : 'border-t border-transparent', 'relative py-4 pl-4 pr-3 text-sm sm:pl-6']">
                    <div class="font-medium text-gray-900">
                      {{ quote.quote }}
                    </div>
                    <div class="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                      <span>{{ quote.title }}</span>
                      <span class="hidden sm:inline"> by </span>
                      <span>{{ quote.author }}</span>
                      <span class="hidden sm:inline"> ||</span>
                      <span> Bookmarked {{ quote.bookmarkCount }} times</span>
                    </div>
                    <div v-if="quoteIdx !== 0" class="absolute -top-px left-6 right-0 h-px bg-gray-200" />
                  </td>
                  <td
                    :class="[quoteIdx === 0 ? '' : 'border-t border-gray-200', 'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell']">
                    {{ quote.title }}</td>
                  <td
                    :class="[quoteIdx === 0 ? '' : 'border-t border-gray-200', 'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell']">
                    {{ quote.author }}</td>
                  <td
                    :class="[quoteIdx === 0 ? '' : 'border-t border-gray-200', 'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell']">
                    {{ quote.bookmarkCount }}</td>
                  <div v-if="quoteIdx !== 0" class="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                </tr>
              </tbody>
            </table>
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
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['userId', 'contributedQuotes']),
  }
};
</script>
