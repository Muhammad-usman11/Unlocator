<template>
  <region-form v-bind:data="data"/>
</template>

<script setup>

const route = useRoute()

let data = {};

data = await useCustomFetch(`/admin/region/${route.params.id}`).then((res) => {
  return res.success.region;
})

definePageMeta({
  layout: 'admin'
})

</script>
