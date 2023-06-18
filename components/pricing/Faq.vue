<template>
  <div class="bg-white">
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <!-- Title -->
      <div class="max-w-2xl mx-auto mb-10 text-center lg:mb-14">
        <h2
          class="text-2xl faqt font-bold md:text-4xl md:leading-tight dark:text-white"
        >
          Frequently Asked Questions
        </h2>
        <p class="mt-5 text-[#687076] text-2xl">Everything you need to know</p>
      </div>
      <!-- End Title -->

      <div class="max-w-2xl mx-auto">
        <!-- Accordion -->
        <div class="hs-accordion-group">
          <div
            v-for="faq in faqs"
            :key="faq.title"
            class="p-4 hs-accordion rounded-xl"
          >
            <button
              class="faqtitle inline-flex items-center justify-between w-full pb-3 font-semibold text-left  transition hs-accordion-toggle group gap-x-3 md:text-lg hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
            >
              {{ faq.title }}
              <svg
                class="block w-3 h-3 text-gray-600 hs-accordion-active:hidden hs-accordion-active:text-black hs-accordion-active:group-hover:text-blak-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.62421 7.86L13.6242 7.85999"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M8.12421 13.36V2.35999"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <svg
                class="hidden w-3 h-3 text-gray-600 hs-accordion-active:block hs-accordion-active:text-black hs-accordion-active:group-hover:text-black group-hover:text-gray-500"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.62421 7.86L13.6242 7.85999"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <div
              class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
            >
              <p class="faqcon">
                {{ faq.content }}
              </p>
            </div>
          </div>
        </div>
        <!-- End Accordion -->
      </div>
    </div>
  </div>
</template>

<script setup>
const faqs = [
  {
    title: 'Can I cancel at anytime?',
    content:
      'Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some  feedback.',
  },
  {
    title: 'Can I cancel at anytime?',
    content:
      'Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some  feedback.',
  },
  {
    title: 'Can I cancel at anytime?',
    content:
      'Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some  feedback.',
  },
  {
    title: 'Can I cancel at anytime?',
    content:
      'Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some  feedback.',
  },
  {
    title: 'Can I cancel at anytime?',
    content:
      'Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some  feedback.',
  },
];
</script>
<style>

.faqt{
  background: linear-gradient(180deg, #693ACC 0%, #3A5CCC 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

}
.faqcon{
  font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 150%;
color: #687076;
}
.faqtitle{
  font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 150%;
color: #11181C;
}


</style>