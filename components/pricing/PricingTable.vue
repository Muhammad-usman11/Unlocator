<template>
  <div class="card2 rounded-[20px] md:rounded-[32px] max-w-[480px]">
    <div class="cardbody py-[20px] px-[15px] md:px-[30px]">
      <h3 class="font-medium text-[16px]" :class="color">{{ small }}</h3>
      <h1 class="font-medium text-[30px] md:text-[42px]" :class="color">
        {{ title }}
      </h1>
      <div class="min-h-[160px]">
        <div class="mt-[20px] flex items-center" v-for="feature in features">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="{1.5}"
            stroke="currentColor"
            class="text-[#30A46C] max-w-[20px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>

          <p class="ml-[10px] text-[#687076] text-[16px]" v-html="feature"></p>
        </div>
      </div>

      <div
        class="w-[100%] mt-[30px] hs-dropdown relative inline-flex [--strategy:absolute]"
      >
        <button
          id="hs-dropdown-basic"
          type="button"
          class="w-[100%] justify-start hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
        >
          <section>
            <div class="flex items-center justify-between w-[100%] py-3 pb-1">
              <div>
                <h1 class="text-[#7E868C] text-[14px] text-left">
                  <span class="font-semibold text-[36px]" :class="color">
                    {{ setMonthlyPrice(selectedProduct) }}
                  </span>
                  per month
                </h1>
                <h2 class="mt-[9px] text-[#7E868C] text-[14px]">
                  <span class="text-[14px] font-medium" :class="color"
                    >${{ selectedProduct.default_price }} inc VAT</span
                  >
                  Billed {{ selectedProduct.billing_cycle }}
                </h2>
              </div>
            </div>
          </section>

          <div
            class="absolute -translate-y-1/2 right-8 top-1/2"
            style="zoom: 0.6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </button>

        <div
          class="w-full hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-0"
          aria-labelledby="hs-dropdown-basic"
        >
          <label
            v-for="plan in plans"
            class="px-5 flex pt-8 py-6 items-center gap-x-3.5 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
            :for="plan.product_id + name"
            @click="selectProduct(plan)"
          >
            <div class="flex items-center justify-between w-[100%]">
              <div>
                <h1 class="text-[#7E868C] text-[14px]">
                  <span class="font-semibold text-[36px]" :class="color">
                    {{ setMonthlyPrice(plan) }}
                    <!-- ${{ plan.default_price }} -->
                  </span>
                  per month
                </h1>
                <h2 class="mt-[9px] text-[#7E868C] text-[14px]">
                  <span class="text-[14px] font-medium" :class="color">
                    ${{ plan.default_price }} inc VAT
                  </span>
                  Billed {{ plan.billing_cycle }}
                </h2>
              </div>
              <div class="flex">
                <input
                  :name="name"
                  :id="plan.product_id + name"
                  type="radio"
                  class="shrink-0 w-[25px] h-[25px] border mt-0.5 border-gray-200 rounded-full shadow focus:ring-transparent"
                  :class="color"
                />
              </div>
            </div>
          </label>
        </div>
      </div>
      <button
        class="plan mt-[20px] h-[48px] w-[100%] font-semibold text-[16px] text-white"
        :class="class"
      >
        Buy Plan
      </button>
    </div>
    <p class="line text-center mt-[50px] py-[20px] text-[#7E868C] text-[16px]">
      <slot> </slot>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  plans: Array,
  color: String,
  small: String,
  title: String,
  class: String,
  name: String,
  features: Array,
});
const selectedProduct = ref(props.plans?.[0] || '');

const selectProduct = (prod) => {
  selectedProduct.value = prod;
};

const setMonthlyPrice = (plan) => {
  if (plan.billing_cycle === 'monthly') {
    return '$' + plan.default_price;
  } else if (plan.billing_cycle === 'every 6 months') {
    return '$' + Math.trunc(plan.default_price / 6);
  } else if (plan.billing_cycle === 'yearly') {
    return '$' + Math.trunc(plan.default_price / 12);
  }
};
</script>
