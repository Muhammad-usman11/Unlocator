<template>
  <div class="min-h-full">
    <main class="py-10">
      <div
          class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div class="space-y-6 lg:col-span-2 lg:col-start-1">
          <!-- Description list-->
          <section aria-labelledby="applicant-information-title">
            <div class="bg-white shadow sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h2 id="applicant-information-title" class="text-lg font-medium leading-6 text-gray-900">User
                  Information</h2>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details.</p>
              </div>
              <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Name</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{
                        user.user_details?.first_name !== undefined && user.user_details?.last_name !== undefined ? user.user_details?.first_name + " " + user.user_details?.last_name : 'Not Set'
                      }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Email Address</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user.email }}</dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Country</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user.sign_up_details.country }}</dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">State</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user.user_details?.state ?? 'Not Set' }}</dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">City</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user.user_details?.city ?? 'Not Set' }}</dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Street</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user.user_details?.street ?? 'Not Set' }}</dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Apartment</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user.user_details?.apartment ?? 'Not Set' }}</dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Zip Code</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user.user_details?.zip_code ?? 'Not Set' }}</dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">VPN Password</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user.vpn_password ?? 'Not Set' }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </div>

        <section aria-labelledby="timeline-title" class="lg:col-span-1 lg:col-start-3">
          <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
            <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Services</h2>

            <!-- Activity Feed -->
            <div class="mt-2 flow-root border-t border-gray-200">
              <ul role="list" class="-mb-8">
                <li v-for="(service) in services" :key="service.id">
                  <div class="relative pb-4">
                    <div class="relative flex space-x-3">
                      <div class="self-center">
                        <span
                            :class="[service.iconForeground, 'h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white']">
                          <component :is="service.icon"/>
                        </span>
                      </div>
                      <!--                      <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">-->
                      <!--                        <div>-->
                      <!--                          <p class="text-sm text-gray-500">-->
                      <!--                            {{ service.status }}-->
                      <!--                          </p>-->
                      <!--                        </div>-->
                      <!--                        <div class="whitespace-nowrap text-right text-sm text-gray-500">-->
                      <!--                          {{ service.billingDate }}-->
                      <!--                        </div>-->
                      <!--                      </div>-->
                      <div
                          class="flex flex-1 items-center justify-between truncate bg-white">
                        <div class="flex-1 truncate px-4 py-2 text-sm">
                          <span class="font-semibold text-gray-900 text-xl">{{ service.status }}</span>
                          <p class="text-gray-500"
                             v-if="service.status !== 'Pending' && service.status !== 'Suspended'">
                            <strong>From:</strong> {{ service.from }}</p>
                          <p class="text-gray-500"
                             v-if="service.status !== 'Pending' && service.status !== 'Suspended'">
                            <strong>To:</strong> {{ service.to }}</p>
                        </div>
                        <div v-if="service.status !== 'Pending' && service.status !== 'Suspended'"
                             class="flex flex-1 flex-col content-between truncate py-2 text-sm self-end">
                          <h2 class="inline text-gray-500"><strong>Next Billing Date:</strong></h2>
                          <p class="inline text-gray-500">{{ service.billingDate }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>

import useCustomFetch from "~/composables/useCustomFetch";
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PauseCircleIcon,
  XCircleIcon
} from "@heroicons/vue/24/outline";

definePageMeta({
  layout: 'admin'
});

const route = useRoute();

let user = {};
let fetchedServices = {};
let services = [];

await useCustomFetch(`/admin/user/${route.params.id}`).then((res) => {
  user = res.success.user;
  fetchedServices = res.success.user.services;
});

fetchedServices.forEach((fetchedService) => {
  let service = {};
  const from = new Date(fetchedService.start_date).toLocaleDateString();
  const to = new Date(fetchedService.expire_date).toLocaleDateString();
  const billingDate = new Date(fetchedService.next_billing_date).toLocaleDateString();
  switch (fetchedService.status) {
    case 'ACTIVE':
      service = {
        id: fetchedService.id,
        icon: CheckCircleIcon,
        status: 'Active',
        from: from,
        to: to,
        billingDate: billingDate,
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-white'
      }
      break;
    case 'SUSPENDED':
      service = {
        id: fetchedService.id,
        icon: XCircleIcon,
        status: 'Suspended',
        from: from,
        to: to,
        billingDate: billingDate,
        iconForeground: 'text-red-700',
        iconBackground: 'bg-white'
      }
      break;
    case 'PAUSED':
      service = {
        id: fetchedService.id,
        icon: PauseCircleIcon,
        status: 'Paused',
        from: from,
        to: to,
        billingDate: billingDate,
        iconForeground: 'text-blue-700',
        iconBackground: 'bg-white'
      }
      break;
    case 'PENDING':
      service = {
        id: fetchedService.id,
        icon: ClockIcon,
        status: 'Pending',
        from: from,
        to: to,
        billingDate: billingDate,
        iconForeground: 'text-gray-700',
        iconBackground: 'bg-white'
      }
      break;
    case 'EXPIRED':
      service = {
        id: fetchedService.id,
        icon: ExclamationTriangleIcon,
        status: 'Expired',
        from: from,
        to: to,
        billingDate: billingDate,
        iconForeground: 'text-amber-700',
        iconBackground: 'bg-white'
      }
      break;
  }
  services.push(service);
});

</script>

<style scoped>

</style>
