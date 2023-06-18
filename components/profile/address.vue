<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
          <p class="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
        </div>
      </div>
      <div class="mt-5 md:col-span-2 md:mt-0">
        <form @submit.prevent="handleSubmit">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" v-model="address.city" id="city" autocomplete="city"
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="street" class="block text-sm font-medium text-gray-700">Street</label>
                  <input type="text" v-model="address.street" id="street" autocomplete="street"
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="apartment" class="block text-sm font-medium text-gray-700">apt.</label>
                  <input type="text" v-model="address.apartment" id="apartment" autocomplete="apt"
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="state" class="block text-sm font-medium text-gray-700">State</label>
                  <input type="text" v-model="address.state" id="state" autocomplete="state"
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="zip-code" class="block text-sm font-medium text-gray-700">ZIP code</label>
                  <input type="text" v-model="address.zip_code" id="zip-code" autocomplete="zip-code"
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button type="submit"
                      id="address-submit-btn"
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

const props = defineProps(['data']);

let address = {
  city: props.data.user_details?.city ?? null,
  street: props.data.user_details?.street ?? null,
  apartment: props.data.user_details?.apartment ?? null,
  state: props.data.user_details?.state ?? null,
  zip_code: props.data.user_details?.zip_code ?? null,
};

const route = useRoute()

const handleSubmit = async () => {
  const button = document.getElementById('address-submit-btn');
  button.setAttribute('disabled', 'disabled');
  button.innerText = 'Saving...';
  if (route.params?.id != null) {
    const result = await useCustomFetch(`/admin/user/${route.params.id}/address`, {
      method: 'Post',
      body: address
    }).then(() => {
      button.innerText = 'Saved!';
      setTimeout(() => {
        button.disabled = false;
        button.innerText = 'Save';
      }, 2000)
    });
  } else {
    const result = await useCustomFetch('/user/address', {
      method: 'Post',
      body: address
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
