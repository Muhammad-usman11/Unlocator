<template>
  <div class="h-full checkout-container"></div>
</template>
<script setup>
import { useLocalStorage } from '@vueuse/core';

const props = defineProps(['form', 'data']);
let paddleInstance = null;
// useHead({
//   script: [
//     {
//       src: "https://cdn.paddle.com/paddle/paddle.js",
//     },
//   ],
// });

onMounted(() => {
  window.Paddle.Environment.set('sandbox');
  window.Paddle.Setup({ vendor: 11028 });

  paddleInstance = window.Paddle;

  paddleInstance.Checkout.open({
    method: 'inline', // set to `inline`
    product: props.form.product, // replace with a product ID or plan ID
    email: props.form.email,
    country: props.data.ipData.value.iso_code,
    postcode: +props.form.zip_code,
    allowQuantity: false,
    disableLogout: true,
    frameTarget: 'checkout-container', // className of your checkout <div>
    frameInitialHeight: 450, // `450` or above
    frameStyle:
      'width:100%; min-width:312px; background-color: transparent; border: none;', // `min-width` must be set to `286px` or above with checkout padding off; `312px` with checkout padding on.
    successCallback: function (data) {
      useLocalStorage('checkouId', data.checkout.id);
      navigateTo('/confirm');
    },
  });
});
</script>
