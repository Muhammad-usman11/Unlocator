<template>
  <profile-info v-bind:data="data"/>
  <profile-break/>
  <profile-address v-bind:data="data"/>
  <profile-break/>
  <profile-change-password/>
</template>

<script setup>
let data = {};

data = await useCustomFetch('/user').then((res) => {
  return res.success.user;
})

definePageMeta({
  layout: 'member'
})

</script>
