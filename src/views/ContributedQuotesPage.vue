<template>
  <SiteHeader />
  <ContributedQuotesBox />
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue';
import ContributedQuotesBox from '../components/ContributedQuotesBox.vue';

export default {
  name: 'ContributedQuotesPage',
  components: {
    SiteHeader,
    ContributedQuotesBox,
  },
};
</script>
