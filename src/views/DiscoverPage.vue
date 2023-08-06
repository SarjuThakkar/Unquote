<template>
  <SiteHeader />
  <QuoteBox />
</template>

<script>
import QuoteBox from '../components/QuoteBox.vue';
import SiteHeader from '../components/SiteHeader.vue';

export default {
  name: 'DiscoverPage',
  components: {
    QuoteBox,
    SiteHeader,
  },
};
</script>
