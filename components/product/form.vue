<template>
  <div class="overflow-hidden rounded-lg bg-white shadow">
    <div class="px-4 py-5 sm:p-6">
      <div class="pt-4">
        <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
          <p class="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
              <div class="mt-1">
                <input type="text" v-model="data.title" id="title" autocomplete="title"
                       class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
              <div class="mt-1">
                <input id="price" v-model="data.default_price" type="number" autocomplete="price" step=".01"
                       class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="currency" class="block text-sm font-medium text-gray-700">Currencies</label>
              <div class="mt-1">
                <select id="currency" name="currency[]" multiple autocomplete="currency"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                  <option v-for="currency in currencies" :value="currency"
                          :selected="props?.data?.currencies.includes(currency)">{{ currency }}
                  </option>
                </select>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="default-currency" class="block text-sm font-medium text-gray-700">Default Currency</label>
              <div class="mt-1">
                <input id="default-currency" v-model="data.default_currency" type="text" autocomplete="default-currency"
                       class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="category" class="block text-sm font-medium text-gray-700">Categories</label>
              <div class="mt-1">
                <select id="category" name="category[]" multiple autocomplete="category"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                  <option v-for="category in categories" :value="category.id"
                          :selected="data.categories.includes(category.id)">{{ category.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="sm:col-span-6">
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 grid-child">
                <div class="col-span-6 md:col-span-3 lg:col-span-2" v-for="(value, key) in gateways">
                  <label :for="key" class="block text-sm font-medium text-gray-700">
                    {{ key }} <span v-if="!value" class="text-xs text-gray-400">(optional)</span>
                  </label>
                  <div class="mt-1">
                    <input type="text" v-model="data.gateway_ids[key]" :id="key" :autocomplete="key" :required="value"
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
                  </div>
                </div>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <div class="mt-1">
              <textarea id="description" v-model="data.description" rows="3"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
              </div>
            </div>
            <div class="pt-5">
              <div class="flex justify-end">
                <button type="submit"
                        id="product-submit-btn"
                        class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  {{ route.params?.id ? 'Save' : 'Add' }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

import useCustomFetch from "~/composables/useCustomFetch";
import $ from 'jquery';
import select2 from 'select2';

const route = useRoute();
const router = useRouter();

const props = defineProps(['data']);

let data = {
  title: props?.data?.title ?? '',
  default_price: props?.data?.default_price ?? null,
  currencies: props?.data?.currencies ?? [],
  default_currency: props?.data?.default_currency ?? '',
  gateway_ids: props?.data?.gateway_ids ?? {},
  categories: [],
  description: props?.data?.description ?? ''
}

if (props.data !== undefined) {
  props.data.categories.forEach((category) => {
    data.categories.push(category.id)
  });
}

let categories = [];
let currencies = [];
let gateways = [];

await useCustomFetch('/admin/category').then((res) => {
  categories = res.success.categories
});

await useCustomFetch('/admin/country/currency').then((res) => {
  currencies = res.success.currencies;
});

await useCustomFetch('/admin/product/gateway-ids').then((res) => {
  gateways = res.success.gateway_ids;
});

await onMounted(() => {
  select2($);
  $('#currency').select2({
    placeholder: 'select currencies',
    multiple: true
  }).change(() => {
    data.default_currency = [];
    $('#currency').select2('data').forEach((formCurrency) => {
      data.default_currency.push(formCurrency.id);
    });
  });
  $('#category').select2({
    placeholder: 'select categories',
    multiple: true
  }).change(() => {
    data.categories = [];
    $('#category').select2('data').forEach((formCategory) => {
      data.categories.push(formCategory.id);
    });
  });
});

const handleSubmit = async () => {
  const button = document.getElementById('product-submit-btn');
  button.setAttribute('disabled', 'disabled');
  if (route.params?.id != null) {
    button.innerText = 'Saving...';
    const result = await useCustomFetch(`/admin/product/${route.params.id}`, {
      method: 'Post',
      body: data
    }).then(() => {
      button.innerText = 'Saved!';
      router.push({path: '/admin/product'});
    });
  } else {
    button.innerText = 'Adding...';
    const result = await useCustomFetch('/admin/product', {
      method: 'Post',
      body: data
    }).then(() => {
      button.innerText = 'Added!';
      router.push({path: '/admin/product'});
    });
  }
}
</script>
