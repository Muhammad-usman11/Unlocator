<template>
  <div>
    <div class="pricingsec py-[50px]">
      <div class="wrapper">
        <div class="text-center">
          <h1 class="font-medium text-[64px] pricingc">Pricing</h1>
          <p
            class="mt-[10px] font-normal text-[19px] md:text-[24px] text-[#687076]"
          >
            Choose a plan that fits you perfectly
          </p>
        </div>

        <div
          class="cardbox max-w-[1040px] m-auto mt-[100px] grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <PricingTable
            :plans="products"
            color="text-[#11181C]"
            small="Essential"
            title="Smart DNS"
            class="plan"
            name="plan1"
            :features="planFeatures"
          >
            <b class="text-[#11181C]"> You've got a deal!</b> You're saving 54%
          </PricingTable>
          <PricingTable
            :plans="products"
            color="text-[#3E63DD]"
            small="Most Popular"
            title="Smart DNS + VPN"
            class="plan2"
            name="plan2"
            :features="planFeatures2"
          >
            <b class="dealc"> Best deal! </b> You're saving 65%
          </PricingTable>
        </div>

        <pricing-slider />
      </div>
    </div>
  </div>
</template>

<script setup>
const planFeatures = [
  '<b>Access</b>  to global media platforms ',
  '<b> Unlimited </b> devices',
];

const planFeatures2 = [
  '<b>Access</b>  to global media platforms ',
  '<b> Unlimited </b> devices',
  '<b>Encrypted </b> Connection ',
  '<b>Access</b>  all Smart DNS channels via VPN',
];

const products = ref([]);

const getProducts = async () => {
  const { data, error } = await useFetch('/api/products');
  products.value = data.value.products;
  console.log(data.value.products);
};

await getProducts();

const plans = [
  {
    inputId: 'p5',
    id: 'plan1',
    price: '$5',
    time: 'per month',
    tax: '$150.00 inc VAT',
    period: 'Billed every 24 months',
  },
  {
    inputId: 'p7',
    id: 'plan1',
    price: '$7',
    time: 'per month',
    tax: '$150.00 inc VAT',
    period: 'Billed every 24 months',
  },
  {
    inputId: 'p8',
    id: 'plan1',
    price: '$8',
    time: 'per month',
    tax: '$150.00 inc VAT',
    period: 'Billed every 24 months',
  },
  {
    inputId: 'p9',
    id: 'plan1',
    price: '$9',
    time: 'per month',
    tax: '$150.00 inc VAT',
    period: 'Billed every 24 months',
  },
];

const plans2 = [
  {
    inputId: 'p52',
    id: 'plan2',
    price: '$5',
    time: 'per month',
    tax: '$150.00 inc VAT',
    period: 'Billed every 24 months',
  },
  {
    inputId: 'p72',
    id: 'plan2',
    price: '$7',
    time: 'per month',
    tax: '$150.00 inc VAT',
    period: 'Billed every 24 months',
  },
  {
    inputId: 'p82',
    id: 'plan2',
    price: '$8',
    time: 'per month',
    tax: '$150.00 inc VAT',
    period: 'Billed every 24 months',
  },
  {
    inputId: 'p92',
    id: 'plan2',
    price: '$9',
    time: 'per month',
    tax: '$150.00 inc VAT',
    period: 'Billed every 24 months',
  },
];
</script>

<style>
.wrapper {
  max-width: 1280px;
  margin: auto;
  width: 90%;
}
.pricingc{
  background: linear-gradient(180deg, #693ACC 0%, #3A5CCC 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;


}
.dealc{
  background: linear-gradient(180deg, #693ACC 0%, #3A5CCC 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

}

img {
  max-width: 100%;
}

.pricingsec {
  background-image: linear-gradient(
      357deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 30%
    ),
    url('/_nuxt/images/bg.png');
  background-position: inherit;
  background-size: cover;
}

.card1 {
  background: radial-gradient(
    106.47% 87.69% 50% 0%,
    #ffffff 0%,
    #f0f0fe 100%,
    #ffffff 100%
  );
  background-blend-mode: overlay;

  /* Slate/Light Alpha/8 */
  border: 1px solid rgba(1, 30, 50, 0.24);
  box-shadow: 0px 42px 74px rgba(19, 34, 85, 0.0383252),
    0px 12.6618px 22.3088px rgba(19, 34, 85, 0.055),
    0px 5.25905px 9.26595px rgba(19, 34, 85, 0.0716748),
    0px 1.9021px 3.35131px rgba(19, 34, 85, 0.11);
}

.line {
  background: rgba(255, 255, 255, 0.6);
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  /* Slate/Light Alpha/7 */
  border-top: 1px solid rgba(0, 26, 51, 0.16);
}

.card2 {
  background: radial-gradient(
    134.36% 134.36% at 50% 0%,
    #ffffff 0%,
    #f0f0fe 100%,
    #f0f0fe 100%
  );
  background-blend-mode: overlay;

  /* Slate/Light Alpha/8 */
  border: 1px solid rgba(1, 30, 50, 0.24);

  /* New Shadow */
  box-shadow: 0px 42px 74px rgba(19, 34, 85, 0.0383252),
    0px 12.6618px 22.3088px rgba(19, 34, 85, 0.055),
    0px 5.25905px 9.26595px rgba(19, 34, 85, 0.0716748),
    0px 1.9021px 3.35131px rgba(19, 34, 85, 0.11);
}

.plan {
  background: linear-gradient(180deg, #101937 0%, #060b1d 100%);
  /* shadow-base */
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.plan2 {
  background: linear-gradient(180deg, #6083f8 0%, #3e63dd 100%);
  /* shadow-base */
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}



.essential {
  background: linear-gradient(180deg, #101937 0%, #060b1d 100%);

  /* shadow-base */
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.pbox {
  border-radius: 0px;
  padding: 20px 0px;
  border-bottom: 1px solid #e6e8eb;
}

@media (max-width: 768px) {
}
</style>
