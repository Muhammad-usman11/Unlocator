import { defineStore } from 'pinia';

export const useErrorStore = defineStore({
  id: 'errors',
  state: () => ({
    email: false,
    terms: false,
    zipCode: false,
    emailMessage: '',
  }),
  actions: {
    setEmailError(isError: boolean, message: string) {
      this.email = isError;
      this.emailMessage = message;
    },
    setTermsError(isError: boolean) {
      this.terms = isError;
    },
    setZipCodeError(isError: boolean) {
      this.zipCode = isError;
    },
  },
});
