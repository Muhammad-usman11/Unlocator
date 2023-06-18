<template>
  <div>
    <div class="riskbox relative mt-[50px] flex items-center justify-center">
      <img class="absolute left-[-25px]" src="/images/risk.png" alt="" />
      <p class="font-medium text-[13px] md:text-[16px] text-[#299764]">
        Risk Free 30-day Money-Back Guarantee
      </p>
    </div>
    <div class="slidersec text-center mt-[90px]">
      <div class="flex items-center justify-center box">
        <img src="/images/star1.png" alt="" />

        <img class="mx-[10px] md:mx-[20px]" src="/images/star2.png" alt="" />
        <p class="font-medium text-[16px] text-[#000000]">5 out of 5</p>
      </div>
    </div>
    <div class="pt-4 navigation-wrapper">
      <div ref="container" class="keen-slider">
        <div class="keen-slider__slide" v-for="slide in slides">
          <div class="slidersec mb-[15px] text-center">
            <p class="mt-[20px] font-medium text-[20px] text-black">
              {{ slide.content }}
            </p>
            <h3 class="mt-[20px] font-normal text-[16px] text-[#7E868C]">
              {{ slide.title }}
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div v-if="slider" class="dots">
      <button
        v-for="(_slide, idx) in dotHelper"
        @click="slider.moveToIdx(idx)"
        :class="{ dot: true, active: current === idx }"
        :key="idx"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import { useKeenSlider } from 'keen-slider/vue.es';
import 'keen-slider/keen-slider.min.css';

const slides = [
  {
    content: 'Easy to install. Prompt customer service to answer questions.',
    title: 'Paul Quinlan, Costa Rica',
  },
  {
    content: 'Easy to install. Prompt customer service to answer questions.',
    title: 'Paul Quinlan, Costa Rica',
  },
  {
    content: 'Easy to install. Prompt customer service to answer questions.',
    title: 'Paul Quinlan, Costa Rica',
  },
  {
    content: 'Easy to install. Prompt customer service to answer questions.',
    title: 'Paul Quinlan, Costa Rica',
  },
];

const current = ref(1);
const [container, slider] = useKeenSlider({
  initial: current.value,
  slideChanged: (s) => {
    current.value = s.track.details.rel;
  },
});

const dotHelper = computed(() =>
  slider.value
    ? [...Array(slider.value.track.details.slides.length).keys()]
    : []
);
</script>

<style>
.navigation-wrapper {
  position: relative;
}
.dots {
  display: flex;
  padding: 10px 0;
  justify-content: center;
}
.dot {
  border: none;
  width: 10px;
  height: 10px;
  background: #c5c5c5;
  border-radius: 50%;
  margin: 0 5px;
  padding: 5px;
  cursor: pointer;
}
.dot:focus {
  outline: none;
}
.dot.active {
  background: #000;
}
.arrow {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  fill: #fff;
  cursor: pointer;
}
.arrow--left {
  left: 5px;
}
.arrow--right {
  left: auto;
  right: 5px;
}
.arrow--disabled {
  fill: rgba(255, 255, 255, 0.5);
}
.riskbox {
  background: #e9f9ee;
  padding: 5px 12px;
  /* Green/Light Alpha/7 */
  border: 1px solid rgba(0, 140, 61, 0.43);
  border-radius: 100px;

  max-width: 395px;
  margin: auto;
  margin-top: 80px;
}


@media (max-width: 768px) {
  .riskbox{
    max-width: 323px;
  }
}





</style>
