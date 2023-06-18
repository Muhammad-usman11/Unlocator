<template>
  <div class="mb-4">
    <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
      >Email Address</label
    >
    <div class="mt-2">
      <input
        type="email"
        v-model="props.form.email"
        id="email"
        class="block w-full border-1 rounded-md py-1.5 text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm sm:leading-6"
        :class="{
          'border-1 border-[#E54D2E] shadow-[0_0_0_4px_rgba(250,199,190,1)] background-[#FFF0EE]':
            errors.email.value,
        }"
      />
      <p class="text-[#E54D2E] mt-3 text-sm">
        {{ errors.emailMessage.value }}
      </p>
    </div>
  </div>
  <div class="font-['Poppins'] text-sm font-normal text-[#11181C] mb-6">
    <div class="relative flex items-start py-2">
      <div class="flex items-center h-6">
        <div>
          <input
            id="terms"
            aria-describedby="terms"
            v-model="props.form.terms"
            type="checkbox"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:border-blue-600"
            :class="{
              'border-1 border-[#E54D2E] shadow-[0_0_0_4px_rgba(250,199,190,1)] background-[#FFF0EE]':
                errors.terms.value,
            }"
          />
        </div>
      </div>
      <div class="ml-3 text-sm leading-6">
        <span id="terms" class="text-gray-500"
          >I accept the
          <span class="text-[#0091FF] underline cursor-pointer"
            >Terms of Use</span
          >
          and
          <span class="text-[#0091FF] underline cursor-pointer"
            >Privacy Policy</span
          ></span
        >
      </div>
    </div>
    <div class="relative flex items-start py-2">
      <div class="flex items-center h-6">
        <input
          id="newsletter"
          aria-describedby="newsletter"
          type="checkbox"
          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
        />
      </div>
      <div class="ml-3 text-sm leading-6">
        <span id="newsletter" class="text-gray-500"
          >I’d like to receive product news and promotions</span
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useErrorStore } from '~/store/errors';
import { storeToRefs } from 'pinia';

const props = defineProps(['form']);
const errorStore = useErrorStore();
const errors = storeToRefs(errorStore);
</script>
