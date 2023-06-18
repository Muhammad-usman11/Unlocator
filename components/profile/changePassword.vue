<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Change Password</h3>
          <p class="mt-1 text-sm text-gray-600">You can change your password here!</p>
        </div>
      </div>
      <div class="mt-5 md:col-span-2 md:mt-0">
        <form @submit.prevent="handleSubmit">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div v-if="route.params?.id == null" class="col-span-6">
                  <label for="current-password" class="block text-sm font-medium text-gray-700">Current Password</label>
                  <input type="password" v-model="passwords.current_password" id="current-password" autocomplete="email"
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label for="password" class="block text-sm font-medium text-gray-700">New Password</label>
                  <input type="password" v-model="passwords.password" id="password" autocomplete="given-name"
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input type="password" v-model="passwords.password_confirmation" id="confirm-password"
                         autocomplete="family-name"
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button type="submit"
                      id="password-submit-btn"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Change
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

let passwords = {
  current_password: '',
  password: '',
  password_confirmation: ''
}

const handleSubmit = async () => {
  const button = document.getElementById('password-submit-btn');
  button.setAttribute('disabled', 'disabled');
  button.innerText = 'Changing...';
  if (route.params?.id != null) {
    const result = await useCustomFetch(`/admin/user/${route.params.id}/password`, {
      method: 'Post',
      body: passwords
    }).then(() => {
      button.innerText = 'Changed!';
      setTimeout(() => {
        button.disabled = false;
        button.innerText = 'Change';
      }, 2000)
    });
  } else {
    const result = await useCustomFetch('/user/password', {
      method: 'Post',
      body: passwords
    }).then(() => {
      button.innerText = 'Changed!';
      setTimeout(() => {
        button.disabled = false;
        button.innerText = 'Change';
      }, 2000)
    });
  }
}

</script>
