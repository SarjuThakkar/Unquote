<template>
  <SiteHeader />
  <ContributeQuotesForm />
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue';
import ContributeQuotesForm from '../components/ContributeQuotesForm.vue';

export default {
  name: 'ContributeQuotesPage',
  components: {
    SiteHeader,
    ContributeQuotesForm,
  },
};
</script>
