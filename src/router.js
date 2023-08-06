// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import store from './store';

const routes = [
  {
    path: '/about',
    name: 'HomePage',
    component: () => import('./views/HomePage.vue'), // Import your Home component
  },
  {
    path: '/discover',
    name: 'DiscoverPage',
    component: () => import('./views/DiscoverPage.vue'),
  },
  {
    path: '/bookmarks',
    name: 'BookmarksPage',
    component: () => import('./views/BookmarksPage.vue'),
  },
  {
    path: '/contribute-quotes',
    name: 'ContributeQuotesPage',
    component: () => import('./views/ContributeQuotesPage.vue'),
  },
  {
    path: '/contributed-quotes',
    name: 'ContributedQuotesPage',
    component: () => import('./views/ContributedQuotesPage.vue'),
  },
  // If path is /, redirect to about if user not signed in, otherwise redirect to discover
  {
    path: '/',
    redirect: () => {
      if (store.state.signedIn) {
        return '/discover';
      } else {
        return '/about';
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
