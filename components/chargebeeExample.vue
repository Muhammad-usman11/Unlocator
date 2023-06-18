<template>

</template>

<script setup>

import {useHead} from "#head";

useHead({
  script: [
    {
      src: 'https://js.chargebee.com/v2/chargebee.js'
    }
  ]
});

let cbInstance = null;
let cart = null;

onMounted(() => {
  try {
    cbInstance = window.Chargebee.getInstance()
  } catch (e) {
    cbInstance = window.Chargebee.init({
      site: 'unlocator-test',
      publishableKey: 'test_mNyv1oheh8WUYNI64cd4cdC7jRRDbxbEw5',
      isItemsModel: true
    });
  }
  cbInstance.setCheckoutCallbacks(function (cart) {
    return {
      success: function (hpid) {
        //todo redirect to thank you
        navigateTo('/thank-you');
        console.log('success', hpid)
      }
    }
  })
});

// on submit
cart = cbInstance.getCart();
const product = cbInstance.initializeProduct(planPriceId, planPriceQuantity)
cart.replaceProduct(product);


//todo Adding a coupon
// product.addCoupon("fourty")
const customer = {
  email: data.email,
};
cart.setCustomer(customer);
// Opening the checkout
cart.proceedToCheckout();

</script>
