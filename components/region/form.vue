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
              <label for="tag" class="block text-sm font-medium text-gray-700">Channel</label>
              <div class="mt-1">
                <input id="tag" v-model="data.tag" type="text" autocomplete="tag"
                       class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="value" class="block text-sm font-medium text-gray-700">Regions</label>
              <div class="mt-1">
                <select id="value" name="value[]" multiple autocomplete="value"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                  <option v-for="value in values" :value="value"
                          :selected="data.values.includes(value)">{{ value }}
                  </option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="default-selected" class="block text-sm font-medium text-gray-700">default Region</label>
              <div class="mt-1">
                <input id="default-selected" v-model="data.default_selected" type="text" autocomplete="default-selected"
                       class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
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
                        id="region-submit-btn"
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
let values = [];

let data = {
  title: props?.data?.title ?? '',
  tag: props?.data?._id ?? null,
  values: props?.data?.values ?? [],
  default_selected: props?.data?.default_selected ?? '',
  description: props?.data?.description ?? ''
}

if (props.data !== undefined) {
  props.data.values.forEach((value) => {
    if (value.id)
      data.values.push(value.id)
  });
  values = data.values;
}

await onMounted(() => {
  select2($);
  $('#value').select2({
    placeholder: 'select values',
    multiple: true,
    tags: true
  }).change(() => {
    data.values = [];
    $('#value').select2('data').forEach((formValue) => {
      data.values.push(formValue.id);
    });
  });
});

const handleSubmit = async () => {
  const button = document.getElementById('region-submit-btn');
  button.setAttribute('disabled', 'disabled');
  if (route.params?.id != null) {
    button.innerText = 'Saving...';
    const result = await useCustomFetch(`/admin/region/${route.params.id}`, {
      method: 'Post',
      body: data
    }).then(() => {
      button.innerText = 'Saved!';
      router.push({path: '/admin/region'});
    });
  } else {
    button.innerText = 'Adding...';
    const result = await useCustomFetch('/admin/region', {
      method: 'Post',
      body: data
    }).then(() => {
      button.innerText = 'Added!';
      router.push({path: '/admin/region'});
    });
  }
}
</script>
