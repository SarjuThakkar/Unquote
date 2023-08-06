<template>
  <SiteHeader />
  <AboutUnquote />
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue';
import AboutUnquote from '@/components/AboutUnquote.vue';

export default {
  name: 'HomePage',
  components: {
    SiteHeader,
    AboutUnquote,
  },
};
</script>
