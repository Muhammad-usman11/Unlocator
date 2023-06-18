<template>
    <div class="flex flex-row min-h-screen justify-center items-center gap-5">
        <button
                class="rounded-md bg-blue-600 py-2 px-3 text-2xl  text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                v-if="status === 'authenticated'" @click="signOut()">Signout
        </button>
        <button
                class="rounded-md bg-blue-600 py-2 px-3 text-2xl text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                v-else @click="signIn('passport', {redirect: true, callbackUrl: '/member'})">Signin
        </button>
        <NuxtLink
                class="rounded-md bg-blue-600 py-2 px-3 text-2xl text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                to="/checkout">Checkout
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">

const {status, signIn, signOut} = useAuth()
definePageMeta({auth: false})

</script>
