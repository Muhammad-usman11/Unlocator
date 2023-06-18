import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    user: useLocalStorage('user', ''),
  }),
  actions: {
    setEmailError(isError: boolean, message: string) {},
  },
});
