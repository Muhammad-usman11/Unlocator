<template>
  <main
    class="w-screen min-h-screen flex flex-col-reverse lg:flex-row font-['Poppins']"
  >
    <div
      class="w-full lg:mt-0 bg-white lg:w-6/12 min-h-screen lg:h-[unset] lg:border-r-[1px] lg:border-[#011E323D] lg:shadow-[0_2px_4px_rgba(0,0,0,0.25),0_4px_6px_rgba(0,0,0,0.1)]"
    >
      <div class="flex flex-col h-full px-4 pt-10 pb-9">
        <img
          class="relative -top-9 min-[399px]:-top-14 mx-auto z-50 lg:hidden"
          v-if="!collapsed"
          src="/frame-55.png"
          alt="guarantee"
        />
        <div class="hidden lg:flex lg:mb-10 lg:pl-8">
          <img src="/logo.svg" alt="unlocator-logo" />
        </div>
        <div
          class="w-full max-w-md lg:w-6/12 m-auto flex flex-col justify-center gap-10 lg:min-w-[440px]"
        >
          <div
            class="hidden lg:flex gap-3 justify-center text-[#687076] text-sm"
          >
            <template v-for="(item, index) in breadcrumbSteps">
              <p
                :class="[
                  currentStepIndex + 1 == index
                    ? 'text-[#129EC6]'
                    : 'text-[#687076]',
                ]"
              >
                {{ item }}
              </p>
              <img
                class="self-center"
                src="/rectangle-42.svg"
                alt="divider"
                v-if="index < breadcrumbSteps.length - 1"
              />
            </template>
          </div>
          <div class="flex flex-col">
            <div class="flex items-baseline justify-between lg:hidden">
              <p class="mb-2 text-lg font-medium">Payment Details</p>
              <p class="font-normal text-sm text-[#000E1896]">Step 2 of 4</p>
            </div>
            <p class="hidden mb-2 text-lg font-medium lg:block">
              Payment Details
            </p>
            <p class="font-normal text-xs text-[#000E1896]">
              Complete your purchase by providing your payment information.
            </p>
          </div>
          <div class="flex flex-col">
            <component
              :is="currentStep"
              v-bind:form="data"
              v-bind:data="steps[currentStepIndex].data"
            ></component>
            <button
              v-if="currentStepIndex < 2"
              @click="nextStep"
              type="button"
              class="drop-shadow-lg bg-gradient-to-b from-[rgba(96,131,248,1)] to-[rgba(62,99,221,1)] rounded-md px-3.5 py-2.5 text-base font-semibold text-white shadow-sm"
            >
              Continue
            </button>
          </div>
          <div
            v-if="currentStepIndex < 2"
            class="mb-6 text-[#7E868C] rounded-md border-[1px] border-[#E6E8EB] flex flex-col gap-4 font-['Roboto'] font-normal text-sm text-center p-5"
          >
            <p class="text-[#11181C]">
              This order process is conducted by our online reseller and
              Merchant of Record, Paddle.com, who also handle order related
              inquiries and returns
            </p>
            <p>
              Your data will be shared with Linkwork ApS for product fulfilment.
              Paddle.com Market Ltd, Judd House, 18-29 Mora Street, London, EC1V
              8BT
            </p>
            <p>
              <span class="underline cursor-pointer">Terms & Conditions</span> |
              <span class="underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>
        <div
          class="flex flex-col lg:hidden my-[20px] gap-5 justify-center align-middle"
        >
          <img
            class="h-5"
            src="/wall-street-journal-grey-logo.svg"
            alt="Wall Street Journal logo"
          />
          <img class="h-5" src="/wired-grey-logo.svg" alt="Wired logo" />
          <img class="h-5" src="/forbes-grey-logo.svg" alt="Forbes logo" />
          <img
            class="h-5"
            src="/los-angeles-times-grey-logo.svg"
            alt="Los Angeles Times logo"
          />
        </div>
        <div class="flex flex-col gap-8 mx-auto mt-3 lg:mt-0 lg:w-6/12">
          <img class="mx-auto lg:w-8/12" src="/frame-55.png" alt="guarantee" />
          <div>
            <p class="text-center font-normal text-[#7E868C] text-xs">
              © 2023 Client Inc. All trademarks and registered trademarks are
              the property of their respective owners.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full bg-cover md:bg-center bg-no-repeat shadow-[inset_0_1px_4px_rgba(0,0,0,0.24),inset_0_2px_6px_rgba(0,0,0,0.1)] lg:shadow-none lg:w-6/12 lg:min-h-screen lg:h-[unset] top-0 z-10 bg-white lg:static"
      style="background-image: url('/checkout-background.png')"
    >
      <div class="flex flex-col w-full h-full gap-8 p-6 lg:p-0 lg:gap-0">
        <div class="flex lg:mb-10 lg:hidden">
          <img src="/logo.svg" alt="unlocator-logo" />
        </div>
        <div
          class="flex w-full max-w-md lg:min-w-[440px] flex-col gap-10 lg:w-7/12 m-auto lg:max-w-full transition-all duration-300"
          :class="{ 'max-h-32': collapsed, 'max-h-96': !collapsed }"
        >
          <div class="rounded-xl shadow-[0_0_0_4px_rgba(2,60,235,0.15)]">
            <div
              class="w-full bg-white rounded-xl p-4 lg:py-6 lg:px-8 border-[#0031D2C2] border"
            >
              <div class="flex justify-between">
                <div class="flex flex-col lg:flex-row">
                  <p class="text-lg font-medium">VPN and DNS</p>
                  <span
                    class="text-sm lg:text-base font-normal text-[#687076] lg:ml-4 lg:mt-1"
                    :class="{ 'mb-2': !collapsed }"
                    >1 Year Subscription</span
                  >
                </div>
                <div class="flex flex-col lg:hidden" v-if="!collapsed">
                  <p class="font-medium">
                    {{ currency }}
                    {{
                      parseFloat(
                        (selectedProduct.default_price / 12).toString()
                      ).toFixed(2)
                    }}<span class="text-[#000E1896] text-sm lg:text-base"
                      >/mo</span
                    >
                  </p>
                  <p
                    class="underline text-[#129EC6] cursor-pointer self-end text-sm font-['Manrope']"
                  >
                    Edit Plan
                  </p>
                </div>
                <div class="flex gap-5 lg:hidden" v-else>
                  <div class="flex flex-col">
                    <p class="font-medium">
                      {{ currency }}
                      {{ parseFloat(selectedProduct.default_price).toFixed(2) }}
                    </p>
                    <p
                      class="text-[#000E1896] self-end text-sm font-['Manrope']"
                    >
                      Inc Taxes
                    </p>
                  </div>
                  <div
                    class="self-center cursor-pointer justify-self-center"
                    @click="collapse"
                  >
                    <ChevronDownIcon class="w-4 h-4" />
                  </div>
                </div>
                <p class="hidden text-sm font-medium lg:text-base lg:block">
                  {{ currency }}
                  {{
                    parseFloat(
                      (selectedProduct.default_price / 12).toString()
                    ).toFixed(2)
                  }}<span class="text-[#000E1896]">/mo</span>
                </p>
              </div>
              <div
                class="justify-between text-sm transition-all duration-300 lg:flex"
                :class="{
                  hidden: collapsed,
                  flex: !collapsed,
                }"
              >
                <p
                  class="font-normal text-[#7E868C] lg:w-9/12 font-['Manrope'] lg:font-['Poppins']"
                >
                  Includes instant encryption, privacy, and security. Access to
                  VPN and all Smart DNS Channels.
                </p>
                <p
                  class="hidden underline text-[#129EC6] self-end cursor-pointer lg:block"
                >
                  Edit Plan
                </p>
              </div>
            </div>
          </div>
          <div
            class="flex-col gap-5 mx-4 overflow-hidden transition-all duration-300 lg:mx-8"
            :class="{
              hidden: collapsed,
              flex: !collapsed,
            }"
          >
            <div class="flex justify-between align-middle">
              <p class="font-normal text-[#000E1896] lg:text-lg">Subtotal</p>
              <p class="font-medium lg:text-lg">
                {{ currency }}
                {{ parseFloat(selectedProduct.net_price).toFixed(2) }}
              </p>
            </div>
            <div class="flex justify-between align-middle">
              <p class="font-normal text-[#000E1896]">
                VAT<span
                  class="ml-1 font-normal text-[#000E1896] text-sm font-['Manrope'] lg:font-['Poppins']"
                ></span>
              </p>
              <p class="font-medium lg:text-lg">
                {{ currency }}
                {{ parseFloat(selectedProduct.tax_price).toFixed(2) }}
              </p>
            </div>
            <div class="flex justify-between align-middle">
              <p>
                Total<span
                  class="ml-1 font-normal text-[#000E1896] text-sm font-['Manrope'] lg:font-['Poppins']"
                  >(Billed every 1 years)</span
                >
              </p>
              <p class="text-lg font-medium lg:text-xl">
                {{ currency }}
                {{ parseFloat(selectedProduct.default_price).toFixed(2) }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="hidden lg:flex flex-wrap mb-[42px] gap-10 justify-center align-middle"
        >
          <img
            class="h-4 my-2"
            src="/wall-street-journal-logo.svg"
            alt="Wall Street Journal logo"
          />
          <img class="h-4 my-2" src="/wired-logo.svg" alt="Wired logo" />
          <img class="h-4 my-2" src="/forbes-logo.svg" alt="Forbes logo" />
          <img
            class="h-4 my-2"
            src="/los-angeles-times-logo.svg"
            alt="Los Angeles Times logo"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { boolean, object, string } from 'yup';
import { useErrorStore } from '~/store/errors';
import { useLocalStorage } from '@vueuse/core';

definePageMeta({
  auth: false,
});
const products = ref();
const countries = ref();
const currency = ref();
const selectedProduct = ref();
const ipData = ref();
const currentStep = ref('CheckoutEmailForm');
const currentStepIndex = ref(0);
let data = ref({
  email: '',
  password: '',
  product: '',
  terms: false,
  zip_code: null,
});
let collapsed = ref(false);
const errorsStore = useErrorStore();

const emailScheme = object({
  email: string().email().required(),
});
const termsScheme = object({
  terms: boolean().required().oneOf([true]),
});
const zipCodeScheme = object({
  zip_code: string().required().max(255).notOneOf([null]),
});

const steps = [
  { component: 'CheckoutEmailForm', data: {} },
  {
    component: 'CheckoutAddressForm',
    data: { countries: countries, ipData: ipData ?? '' },
  },
  { component: 'CheckoutPaymentForm', data: { ipData: ipData } },
];

const breadcrumbSteps = ['Plan', 'Email', 'Address', 'Payment'];

useHead({
  title: 'Checkout | Unlocator',
  script: [
    {
      src: 'https://cdn.paddle.com/paddle/paddle.js',
    },
  ],
});

await useFetch('/api/ip').then((res) => {
  ipData.value = res.data.value;
});
if (!ipData.value || !ipData.value.is_paddle_eligible) {
  navigateTo('/not-paddle-eligible');
}

// When in localhost, uncomment the post request and comment the other one

// await useFetch("/api/products", {
//   method: "POST",
//   body: { ip: ipData.value.ip },
// }).then((res) => {
//   countries.value = Object.entries(res.data.value.countries);
//   products.value = res.data.value.products;
//   selectedProduct.value = products.value[2];
//   data.value.product = selectedProduct.value.plan_id;
//   currency.value = selectedProduct.value.default_currency;
// });

await useFetch('/api/products').then((res) => {
  console.log(res);

  countries.value = Object.entries(res.data.value.countries);
  products.value = res.data.value.products;
  selectedProduct.value = products.value[2];
  data.value.product = selectedProduct.value.plan_id;
});

const nextStep = async () => {
  let valid: boolean = true;
  if (currentStepIndex.value === 0) {
    await emailScheme
      .validate({ email: data.value.email })
      .then(() => {
        errorsStore.setEmailError(false, '');
      })
      .catch(() => {
        errorsStore.setEmailError(true, '');
        valid = false;
      });
    await termsScheme
      .validate({ terms: data.value.terms })
      .then(() => {
        errorsStore.setTermsError(false);
      })
      .catch(() => {
        errorsStore.setTermsError(true);
        valid = false;
      });
    if (!valid) {
      return;
    } else {
      const body = {
        email: data.value.email,
      };
      const {
        data: registerData,
        pending,
        error,
      }: any = await useFetch('/api/register', {
        method: 'post',
        body: body,
      });

      if (error.value?.data.statusCode === 400) {
        valid = false;
        errorsStore.setEmailError(true, error.value?.data.message);

        return;
      } else {
        useLocalStorage('userId', registerData.value?.user.id);
      }
    }
  }
  if (currentStepIndex.value === 1 && ipData.value.requires_zip_code) {
    await zipCodeScheme
      .validate({ zip_code: data.value.zip_code })
      .then(() => {
        errorsStore.setZipCodeError(false);
      })
      .catch(() => {
        errorsStore.setZipCodeError(true);
        valid = false;
      });
    if (!valid) {
      return;
    }
  }
  currentStepIndex.value += 1;
  currentStep.value = steps[currentStepIndex.value].component;
};

onMounted(() => {
  // let interval = undefined;
  // let stoppedScrolling = true;
  //, 'DOMMouseScroll', 'mousewheel','touchmove','gesturechange'
  ['scroll'].forEach((element) => {
    window.addEventListener(element, (e) => {
      e.preventDefault();
      e.stopPropagation();
      // if (interval) {
      //     window.clearInterval(interval);
      //     interval = undefined;
      // }
      // interval = setInterval(() => {
      //     stoppedScrolling = true;
      // }, 1000);
      // if (window['oldScroll' + element] === undefined) {
      //     window['oldScroll' + element] = 0;
      // }
      //
      // let direction = false;//down
      // if (window['oldScroll' + element] === window.scrollY) {
      //     direction = window['oldScroll' + element] === 0;
      // } else if (window['oldScroll' + element] > window.scrollY) {
      //     direction = true;
      // }
      //
      // console.log(direction ? 'up' : 'down');
      // window['oldScroll' + element] = window.scrollY;
      let oldValue = collapsed.value;
      if (window.innerWidth < 1024) {
        if (window.scrollY !== 0) {
          collapsed.value = true;
          if (oldValue !== true) {
            window.scrollTo(window.scrollX, 0);
          }
        }
      }
      // else {
      // if (stoppedScrolling && window['oldScroll' + element] === 0) {
      //     collapsed.value = false;
      // } else {
      //     collapsed.value = true;
      //     if (oldValue !== true) {
      //         window.scrollTo(window.scrollX, 0);
      //     }
      // }
      // }
      // stoppedScrolling = false;
    });
  });
});

function collapse(e: Event) {
  scrollTo(0, 0);
  collapsed.value = !collapsed.value;
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>
