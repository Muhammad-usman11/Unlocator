<template>
  <div class="bg-gray-50 py-5 flex items-center justify-center min-h-screen">
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <h1 class="sr-only">Checkout</h1>

        <form class="lg:grid" @submit.prevent="handleSubmit">
          <div>
            <div>
              <h2 class="text-lg font-medium text-gray-900">User Details</h2>
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3 mt-4">
                  <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                  <div class="mt-1">
                    <input required type="email" id="email-address" v-model="data.email" autocomplete="email"
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3 mt-4">
                  <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                  <div class="mt-1">
                    <input required type="password" id="password" v-model="data.password" autocomplete="password"
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-10 border-t border-gray-200 pt-10">
              <RadioGroup v-model="selectedProduct">
                <RadioGroupLabel class="text-lg font-medium text-gray-900">Products</RadioGroupLabel>

                <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                  <RadioGroupOption as="template" v-for="product in products" class="plan"
                                    :key="product.plan_id"
                                    :value="product" v-slot="{ checked, active }" v-model="data.product">
                    <div
                        :class="[checked ? 'border-transparent' : 'border-gray-300', active ? 'ring-2 ring-blue-500' : '', 'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none']">
                      <span class="flex flex-1">
                        <span class="flex flex-col">
                          <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">{{
                              product.title
                            }}</RadioGroupLabel>
                          <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500">{{
                              product.description
                            }}</RadioGroupDescription>
                          <RadioGroupDescription as="span" class="mt-6 text-sm font-medium text-gray-900">{{
                              product.default_price
                            }} USD</RadioGroupDescription>
                        </span>
                      </span>
                      <CheckCircleIcon v-if="checked" class="h-5 w-5 text-blue-600" aria-hidden="true"/>
                      <span
                          :class="[active ? 'border' : 'border-2', checked ? 'border-blue-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']"
                          aria-hidden="true"/>
                    </div>
                  </RadioGroupOption>
                </div>
              </RadioGroup>
            </div>
            <div class="mt-8 max-w-[35%] mx-auto">
              <div class="col-span-6 sm:col-span-3 mt-4 mb-2" v-if="ipData.requires_zip_code">
                <label for="zip-code" class="block text-sm font-medium text-gray-700">Zip Code</label>
                <div class="mt-1">
                  <input required type="text" id="zip-code" v-model="data.zip_code" autocomplete="zip-code"
                         class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
                </div>
              </div>
              <button type="submit"
                      id="checkout-btn"
                      class="w-full rounded-md border border-transparent bg-blue-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                Checkout
              </button>
              <div
                  class="border-gray-300 relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none hidden checkout-container"></div>
            </div>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'
import {CheckCircleIcon} from '@heroicons/vue/20/solid'

useHead({
  script: [
    {
      src: 'https://cdn.paddle.com/paddle/paddle.js'
    }
  ]
});

let paddleInstance = null;
let submitted = ref(false);
const products = ref();
const selectedProduct = ref();
const ipData = ref();
await useFetch('/api/ip').then(res => {
    ipData.value = res.data.value;
});
if (!ipData.value || !ipData.value.is_paddle_eligible) {
  navigateTo("/not-paddle-eligible");
}

onMounted(() => {
  window.Paddle.Environment.set('sandbox');
  window.Paddle.Setup({vendor: 11028});

  paddleInstance = window.Paddle;

  watch(selectedProduct, () => {
    if (submitted.value) {
      data.product = selectedProduct.value.plan_id;
      paddleInstance.Checkout.open({
        method: 'inline', // set to `inline`
        product: data.product, // replace with a product ID or plan ID
        email: data.email,
        country: ipData.value.iso_code,
        postcode: data.zip_code,
        allowQuantity: false,
        disableLogout: true,
        frameTarget: 'checkout-container', // className of your checkout <div>
        frameInitialHeight: 450, // `450` or above
        frameStyle: 'width:100%; min-width:312px; background-color: transparent; border: none;',// `min-width` must be set to `286px` or above with checkout padding off; `312px` with checkout padding on.
        successCallback: function (data) {
          navigateTo('/thank-you');
        },
      });
    }
  });
});

definePageMeta({
  auth: false
});

// await useCustomFetch('/product', {
//   params: {
//     category: 'web',
//     gateway: 'paddle'
//   }
// }).then((response) => {
//   products = response.success.products;
// });

await useFetch('/api/products').then((res) => {
  products.value = res.data.value
  selectedProduct.value = products.value[1];
})

let data = {
  email: '',
  password: '',
  product: '',
  zip_code: null
}

const handleSubmit = () => {
  data.product = selectedProduct.value.plan_id;
  const body = {
    email: data.email,
    password: data.password,
    password_confirmation: data.password
  }

  useFetch('/api/register', {
    method: 'post',
    body: body
  });

  const button = document.getElementById('checkout-btn');
  button.remove();
  document.getElementById('password').parentElement.parentElement.remove();
  const emailInput = document.getElementById('email-address');
  emailInput.setAttribute('disabled', 'disabled')
  emailInput.parentElement.parentElement.classList.remove('sm:col-span-3')
  submitted.value = true;
  document.getElementsByClassName('checkout-container')[0].classList.remove('hidden');

  paddleInstance.Checkout.open({
    method: 'inline', // set to `inline`
    product: data.product, // replace with a product ID or plan ID
    email: data.email,
    country: ipData.value.iso_code,
    postcode: +data.zip_code,
    allowQuantity: false,
    disableLogout: true,
    frameTarget: 'checkout-container', // className of your checkout <div>
    frameInitialHeight: 450, // `450` or above
    frameStyle: 'width:100%; min-width:312px; background-color: transparent; border: none;',// `min-width` must be set to `286px` or above with checkout padding off; `312px` with checkout padding on.
    successCallback: function (data) {
      navigateTo('/thank-you');
    },
  });
}
</script>
