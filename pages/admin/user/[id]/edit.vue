<template>
  <profile-info v-bind:data="data"/>
  <profile-break/>
  <profile-address v-bind:data="data"/>
  <profile-break/>
  <profile-change-password/>
  <profile-break/>
  <profile-vpn-password v-bind:data="data"/>
</template>

<script setup>

const route = useRoute()

let data = {};

data = await useCustomFetch(`/admin/user/${route.params.id}`).then((res) => {
  return res.success.user;
})

definePageMeta({
  layout: 'admin'
})

</script>
