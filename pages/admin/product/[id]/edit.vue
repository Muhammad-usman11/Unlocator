<template>
  <product-form v-bind:data="data"/>
</template>

<script setup>
const route = useRoute()

let data = {};

data = await useCustomFetch(`/admin/product/${route.params.id}`).then((res) => {
  return res.success.product;
})

definePageMeta({
  layout: 'admin'
})

</script>
