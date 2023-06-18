// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  nitro: {
    preset: 'node-server',
    logLevel: 1,
  },
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  css: [
    '~/assets/global.css',
    '~/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
  ],
  runtimeConfig: {
    oauthClientId: process.env.OAUTH_CLIENT_ID,
    oauthLoginUrl: process.env.OAUTH_LOGIN_URL,
    oauthTokenUrl: process.env.OAUTH_TOKEN_URL,
    oauthUserUrl: process.env.OAUTH_USER_URL,
    public: {
      apiBaseUrl: process.env.BACKEND_API_URL,
    },
  },
  auth: {
    globalAppMiddleware: true,
  },
  app: {
    head: {
      htmlAttrs: {
        class: 'h-full bg-gray-100',
      },
      bodyAttrs: {
        class: 'h-full',
      },
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/preline@1.8.0/dist/preline.min.js',
          body: true,
          defer: true,
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
        },
      ],
    },
  },
  tailwindcss: {
    //@ts-ignore
    config: {
      plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
      ],
    },
  },
});
