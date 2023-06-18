<template>
  <ul role="list" class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-6">
    <li class="relative col-span-2 flex rounded-md shadow-sm">
      <div
          class="flex-shrink-0 flex items-center justify-center w-16 text-white border border-gray-200 text-sm font-medium rounded-l-md"
          :class="service.iconBackground">
        <span :class="service.iconForeground" class="p-3 ">
          <component :is="service.icon" class="h-10 w-10"/>
        </span>
      </div>
      <div
          class="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
        <div class="flex-1 truncate px-4 py-2 text-sm">
          <span class="font-semibold text-gray-900 text-xl">{{ service.status }}</span>
          <p class="text-gray-500" v-if="service.status !== 'Pending' && service.status !== 'Suspended'">
            <strong>From:</strong> {{ service.from }}</p>
          <p class="text-gray-500" v-if="service.status !== 'Pending' && service.status !== 'Suspended'">
            <strong>To:</strong> {{ service.to }}</p>
        </div>
        <div v-if="service.status !== 'Pending' && service.status !== 'Suspended'"
             class="flex flex-1 flex-col content-between truncate py-2 text-sm self-end">
          <h2 class="inline text-gray-500"><strong>Next Billing Date:</strong></h2>
          <p class="inline text-gray-500">{{ service.billingDate }}</p>
        </div>
      </div>
    </li>
    <li class="relative col-span-2 flex rounded-md shadow-sm">
      <div
          class="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
        <div class="flex-1 truncate px-4 py-2">
          <p class="font-semibold text-gray-900 break-words">{{ ipStatus.message }}</p>
        </div>
        <div v-if="ipStatus.action"
             class="flex flex-1 flex-col justify-center truncate py-2 text-sm self-center">
          <button type="button"
                  id="update-ip-button"
                  @click="updateIp"
                  class="rounded-md max-w-[50%] bg-blue-600 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Update
          </button>
        </div>
        <div v-else class="flex flex-1 flex-col content-center truncate py-2 text-sm self-center">
          <h2 class="inline text-gray-500"><strong>Current IP:</strong></h2>
          <p class="inline text-gray-500">{{ ipStatus.ip }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>

import UseCustomFetch from "~/composables/useCustomFetch";
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PauseCircleIcon,
  XCircleIcon
} from "@heroicons/vue/24/outline";
import useCustomFetch from "~/composables/useCustomFetch";

let service = {};
let ipStatus = ref({
  message: "",
  action: false,
  ip: ""
});

const data = await useFetch('/api/ip', {server: true})

await UseCustomFetch('/user/region/ip').then((res) => {
  if (res.status === 400) {
    ipStatus.value = {
      message: "IP doesn't match the saved one, please update.",
      action: true
    }
  } else {
    ipStatus.value = {
      message: "IP matched the saved one",
      action: false,
      ip: res.success.ip
    }
  }
});
const updateIp = async () => {
  const button = document.getElementById('update-ip-button');
  button.setAttribute('disabled', 'disabled');
  button.innerText = 'Updating...';
  const result = await useCustomFetch('/user/region/ip', {
    method: 'Post'
  }).then((res) => {
    ipStatus.value = {
      message: "IP matched the saved one",
      action: false,
      ip: res.success.ip
    }
  });
}

await UseCustomFetch('/user/latest-service').then((res) => {
  let temp = res.success.service;
  switch (temp.status) {
    case 'ACTIVE':
      service = {
        icon: CheckCircleIcon,
        status: 'Active',
        from: temp.from,
        to: temp.to,
        billingDate: temp.next_billing_date,
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-white'
      }
      break;
    case 'SUSPENDED':
      service = {
        icon: XCircleIcon,
        status: 'Suspended',
        from: temp.from,
        to: temp.to,
        billingDate: temp.next_billing_date,
        iconForeground: 'text-red-700',
        iconBackground: 'bg-white'
      }
      break;
    case 'PAUSED':
      service = {
        icon: PauseCircleIcon,
        status: 'Paused',
        from: temp.from,
        to: temp.to,
        billingDate: temp.next_billing_date,
        iconForeground: 'text-blue-700',
        iconBackground: 'bg-white'
      }
      break;
    case 'PENDING':
      service = {
        icon: ClockIcon,
        status: 'Pending',
        from: temp.from,
        to: temp.to,
        billingDate: temp.next_billing_date,
        iconForeground: 'text-gray-700',
        iconBackground: 'bg-white'
      }
      break;
    case 'EXPIRED':
      service = {
        icon: ExclamationTriangleIcon,
        status: 'Expired',
        from: temp.from,
        to: temp.to,
        billingDate: temp.next_billing_date,
        iconForeground: 'text-amber-700',
        iconBackground: 'bg-white'
      }
      break;
  }
});

definePageMeta({
  layout: 'member'
})

</script>
