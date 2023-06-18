<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
          <p class="mt-1 text-sm text-gray-600">This information will be displayed publicly so be careful what you
            share.</p>
        </div>
      </div>
      <div class="mt-5 md:col-span-2 md:mt-0">
        <form @submit.prevent="handleSubmit">
          <div class="shadow sm:overflow-hidden sm:rounded-md">
            <div class="bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                  <input type="text" v-model="info.first_name" id="first-name" autocomplete="given-name"
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                  <input type="text" v-model="info.last_name" id="last-name" autocomplete="family-name"
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                </div>

                <div class="col-span-6">
                  <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                  <input type="text" v-model="info.email" id="email-address" autocomplete="email"
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button type="submit"
                      id="info-submit-btn"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script setup>
const route = useRoute()

const props = defineProps(['data']);

let info = {
  first_name: props.data.user_details?.first_name ?? null,
  last_name: props.data.user_details?.last_name ?? null,
  email: props.data.email ?? null
}

const handleSubmit = async () => {
  const button = document.getElementById('info-submit-btn');
  button.setAttribute('disabled', 'disabled');
  button.innerText = 'Saving...';
  if (route.params?.id != null) {
    const result = await useCustomFetch(`/admin/user/${route.params.id}/profile`, {
      method: 'Post',
      body: info
    }).then(() => {
      button.innerText = 'Saved!';
      setTimeout(() => {
        button.disabled = false;
        button.innerText = 'Save';
      }, 2000)
    });
  } else {
    const result = await useCustomFetch('/user/profile', {
      method: 'Post',
      body: info
    }).then(() => {
      button.innerText = 'Saved!';
      setTimeout(() => {
        button.disabled = false;
        button.innerText = 'Save';
      }, 2000)
    });
  }
}

</script>
