<!--A vue component site header with my website name on the left side and router links to navigate to my other pages. On small devices it should become a a hamburger menu with dropdown to select. Use tailwindcss and style to be modern, responsive, and beautiful-->
<template>
  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <router-link to="/discover" class="-m-1.5 p-1.5">
        <span class="sr-only">Unquote</span>
        <img class="h-8 w-auto" src="../assets/un-2.png" alt="" />
      </router-link>
      <div class="flex lg:hidden">
        <button v-if="!mobileMenuOpen" type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <router-link v-for="item in navigation" :key="item.name" :to="item.href"
          class="text-sm font-semibold leading-6 text-gray-900">{{ item.name }}</router-link>
        <button v-if="!signedIn" @click="signInWithGoogle" class="text-sm font-semibold leading-6 text-gray-900">Log in
          <span aria-hidden="true">&rarr;</span></button>
        <button v-if="signedIn" @click="signOut" class="text-sm font-semibold leading-6 text-gray-900">Log out
          <span aria-hidden="true">&rarr;</span></button>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <router-link to="/discover" class="-m-1.5 p-1.5">
            <span class="sr-only">Unquote</span>
            <img class="h-8 w-auto" src="../assets/un-2.png" alt="" />
          </router-link>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <router-link v-for="item in navigation" :key="item.name" :to="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{
                  item.name }}</router-link>
            </div>
            <div class="py-6">
              <button v-if="!signedIn" @click="signInWithGoogle"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log
                in</button>
              <button v-if="signedIn" @click="signOut"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log
                out</button>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Discover', href: '/discover' },
  { name: 'Bookmarks', href: '/bookmarks' },
  { name: 'Contribute', href: '/contribute-quotes' },
  { name: 'Your Quotes', href: '/contributed-quotes' },
  { name: 'About', href: '/about' },
]

const mobileMenuOpen = ref(false)
</script>

<script>
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['signedIn', 'userId']),
  },
  methods: {
    ...mapMutations(['setSignedIn', 'setUserId']),
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error(error);
      }
    },
    // sign out user firebase auth
    async signOut() {
      const auth = getAuth();
      try {
        await auth.signOut();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
