<template>
  <div class="mb-4">
    <Listbox as="div" v-model="selected">
      <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"
        >Country</ListboxLabel
      >
      <div class="relative mt-2">
        <ListboxButton
          class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
        >
          <span class="block truncate">{{ selected[1] }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              as="template"
              v-for="value in countries"
              :key="value[0]"
              :value="value[1]"
              v-slot="{ active, selected }"
            >
              <li
                :class="[
                  active ? 'bg-blue-600 text-white' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-semibold' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ value[1] }}</span
                >

                <span
                  v-if="selected"
                  :class="[
                    active ? 'text-white' : 'text-blue-600',
                    'absolute inset-y-0 right-0 flex items-center pr-4',
                  ]"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
  <div class="mb-4">
    <label
      for="zip-code"
      class="block text-sm font-medium leading-6 text-gray-900"
      >Zip Code</label
    >
    <div class="mt-2">
      <input
        type="text"
        :required="props.data.ipData.requires_zip_code"
        v-model="props.form.zip_code"
        id="zip-code"
        class="block w-full border-1 rounded-md py-1.5 text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm sm:leading-6"
        :class="{
          'border-1 border-[#E54D2E] shadow-[0_0_0_4px_rgba(250,199,190,1)] background-[#FFF0EE]':
            errors.zipCode.value,
        }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { storeToRefs } from "pinia";
import { useErrorStore } from "~/store/errors";

const errorStore = useErrorStore();
const errors = storeToRefs(errorStore);
function findIndex(stringArr: any, keyString: string) {
  let result = [-1, -1];
  for (let i = 0; i < stringArr.length; i++) {
    for (let j = 0; j < stringArr[i].length; j++) {
      if (stringArr[i][j] == keyString) {
        result[0] = i;
        result[1] = j;
        return result;
      }
    }
  }
  return result;
}

const props = defineProps(["form", "data"]);

const countries = props.data.countries.value;
const country = props.data.ipData.value.iso_code;
const result = findIndex(countries, country);

const selected = ref(countries[result[0]]);
</script>
