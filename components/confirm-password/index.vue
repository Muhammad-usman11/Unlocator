<template>
  <div>
    <section
      class="relative flex flex-wrap-reverse bg-white lg:flex-nowrap lg:h-screen"
    >
      <img
        src="images/logo.png"
        class="absolute z-10 lg:left-10 lg:top-10 top-4 left-3 max-w-[150px]"
      />

      <div
        class="relative w-full px-4 py-12 mb-borders lg:pt-44 imgs-bg sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24"
      >
        <div class="max-w-lg mx-auto mb-10">
          <common-Alert />
          <h3 class="text-lg font-medium">Secure your Account</h3>

          <p class="mt-2 text-sm text-gray-500">
            Almost done, create a password to secure your account.
          </p>
        </div>

        <form
          @submit="handleSubmit"
          class="max-w-lg mx-auto mt-8 mb-0 space-y-4 pb-28"
        >
          <div class="mb-7">
            <label for="password" class="block mb-2 text-sm font-medium"
              >Create Password</label
            >

            <div class="relative">
              <input
                :type="passwordType"
                class="d-input input-default"
                placeholder="Enter password"
                v-model="password"
              />

              <span
                class="absolute inset-y-0 grid px-4 cursor-pointer end-0 place-content-center"
                @click="showPassword"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium"
              >Confirm Password</label
            >

            <div class="relative">
              <input
                :type="passwordType"
                class="d-input input-default"
                placeholder="Enter Confirm password"
                v-model="confirmPassword"
              />

              <p class="mt-3 text-sm text-red-500">{{ notSame }}</p>

              <span
                class="absolute inset-y-0 grid px-4 cursor-pointer end-0 place-content-center"
                @click="showPassword"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div class="!mt-8">
            <button type="submit" class="primary-btn">Get Started</button>
          </div>
        </form>

        <p
          class="absolute text-xs text-center -translate-x-1/2 w-full max-w-[500px] px-10 bottom-10 left-1/2 text-[#7E868C]"
        >
          © 2023 Client Inc. All trademarks and registered trademarks are the
          property of their respective owners.
        </p>
      </div>

      <div class="relative w-full h-44 sm:h-96 lg:h-full lg:w-1/2 mb-image-col">
        <img
          alt="Welcome"
          src="images/side.png"
          class="absolute inset-0 object-cover w-full h-full"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core';

const password = ref('');
const confirmPassword = ref('');
const notSame = ref('');
const passwordType = ref('password');

const userId = useLocalStorage('userId');
const checkoutId = useLocalStorage('checkouId');

const data = {
  user_id: userId,
  checkout_id: checkoutId,
  password: password,
  password_confirmation: confirmPassword,
};

const showPassword = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text';
  } else {
    passwordType.value = 'password';
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password.value === confirmPassword.value) {
    notSame.value = '';

    try {
      const res = await useFetch('/api/activate-password', {
        method: 'POST',
        body: data,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  } else {
    notSame.value = 'Password not same';
  }
};
</script>
