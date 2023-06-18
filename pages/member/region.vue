<template>
    <div class="overflow-hidden shadow sm:rounded-md">
        <div class="mx-auto max-w-7xl lg:px-8 bg-white px-4 py-5 sm:p-6">
            <div class="mt-2 flex flex-col">
                <div class="overflow-hidden bg-white shadow sm:rounded-md">
                    <ul role="list" class="divide-y divide-gray-200">
                        <li v-for="region in regions">
                            <div class="block hover:bg-gray-50">
                                <div class="flex items-center px-4 py-4 sm:px-6">
                                    <div class="flex min-w-0 flex-1 items-center">
                                        <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                            <p class="truncate text-xl font-bold text-blue-600 self-center">
                                                {{ region.title }}</p>
                                            <div class="hidden md:block">
                                                <div>
                                                    <div class="flex gap-2 items-center">
                                                        <label for="region"
                                                               class="block text-sm font-medium text-gray-700">Regions</label>
                                                        <select id="region" @change="event => values[region._id] = event.target.value"
                                                                class="mt-1 block w-auto rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm">
                                                            <option v-for="value in region.values" :value="value"
                                                                    :selected="value === (values[region._id] ? values[region._id] : region.default_selected)"
                                                                    :test="values[region._id]">
                                                                {{ value }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                                class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                @click="saveRegion"
                                                :data-id="region._id" :data-default="region.default_selected">Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import useCustomFetch from "~/composables/useCustomFetch";

definePageMeta({
    layout: 'member'
});

let regions;
let values = {};


await useCustomFetch('/user/region').then((user_res) => {
    let response = user_res.success;
    if (response) {
        response = response.user_regions;
        if (response) {
            values = response.settings;
        }
    }
});

await useCustomFetch('/region').then((res) => {
    regions = res.success.regions
});

const saveRegion = async (event) => {
    const tag = event.target.attributes['data-id'].value;
    const value = values[tag] ?? event.target.attributes['data-default'].value;
    const button = event.target;
    button.setAttribute('disabled', 'disabled')
    button.innerText = 'Saving...';
    const result = await useCustomFetch('/user/region', {
        method: 'POST',
        body: {
            tag: tag,
            value: value
        }
    }).then((res) => {
        button.innerText = 'Saved!';
        setTimeout(() => {
            button.disabled = false;
            button.innerText = 'Save';
        }, 2000)
    });
}

</script>
