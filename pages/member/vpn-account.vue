<template>
  <div class="overflow-hidden shadow sm:rounded-md">
    <div class="mx-auto max-w-7xl lg:px-8 bg-white px-4 py-5 sm:p-6">
      <div class="mt-2 flex flex-col ">
        <div>
          <h3 class="text-xl font-semibold leading-6 text-blue-600">VPN Account</h3>
        </div>
        <div class="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 pb-3 border-b-2 mb-3">
          <div class="sm:col-span-3">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1">
              <input type="email" id="email" :value="vpnAccount.username" disabled readonly
                     class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1">
              <input type="text" id="password" :value="vpnAccount.password" disabled readonly
                     class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold leading-6 text-blue-600">Change Password</h3>
        </div>
        <div class="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-9">
          <div class="sm:col-span-4">
            <label for="new-password" class="block text-sm font-medium text-gray-700">New Password</label>
            <div class="mt-1">
              <input type="text" id="new-password" v-model="newPassword.password"
                     class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="password" class="block text-sm font-medium text-gray-700">New Password Confirmation</label>
            <div class="mt-1">
              <input type="text" id="password-confirmation" v-model="newPassword.password_confirmation"
                     class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
            </div>
          </div>

          <div class="sm:col-span-1 self-end">
            <button type="button"
                    @click="handleSubmit"
                    class="inline-flex justify-self-stretch items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import useCustomFetch from "~/composables/useCustomFetch";

definePageMeta({
  layout: 'member'
})

let vpnAccount = {};
let newPassword = {
  password: '',
  password_confirmation: ''
}

await useCustomFetch('/user/vpn-account').then((res) => {
  vpnAccount = res.success.account;
});

const handleSubmit = async (event) => {
  const button = event.target;
  button.setAttribute('disabled', 'disabled');
  button.innerText = 'Saving...';
  const result = await useCustomFetch('/user/vpn-account/update-password', {
    method: 'POST',
    body: newPassword
  }).then((res) => {
    button.innerText = 'Saved!';
    setTimeout(() => {
      button.disabled = false;
      button.innerText = 'Save';
    }, 2000);
  });
}

</script>

<style scoped>

</style>
