<template>
  <div class="overflow-hidden shadow sm:rounded-md">
    <div class="mx-auto max-w-7xl lg:px-8 bg-white px-4 py-5 sm:p-6">
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <user-table />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'admin'
})

</script>
