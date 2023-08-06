<template>
  <SiteHeader />
  <BookmarksTable />
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue';
import BookmarksTable from '../components/BookmarksTable.vue';

export default {
  name: 'BookmarksPage',
  components: {
    SiteHeader,
    BookmarksTable,
  },
};
</script>
