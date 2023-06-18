<template>
  <footer class="text-slate-500 footersec">
    <!-- Main footer -->
    <div class="pt-16 pb-12 text-sm border-t border-slate-200 bg-slate-100">
      <div class="px-6 mx-auto wrapper">
        <div class="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
          <nav
            v-for="menu in menus"
            :key="menu.title"
            class="col-span-2 md:col-span-4 lg:col-span-3"
            aria-labelledby="footer-product-4"
          >
            <h3 class="mb-6 text-base font-medium text-slate-700">
              {{ menu.title }}
            </h3>
            <ul>
              <li
                class="mb-2 leading-6"
                v-for="links in menu.links"
                :key="links.text"
              >
                <a
                  :href="links.url"
                  class="transition-colors duration-300 hover:text-black text-[#5585F7]"
                >
                  {{ links.text }}
                </a>
              </li>
            </ul>
          </nav>
          <!-- last col -->
          <nav
            class="col-span-2 md:col-span-4 lg:col-span-3"
            aria-labelledby="footer-product-4"
          >
            <h3 class="mb-6 text-base font-medium text-slate-700">We Accept</h3>
            <ul>
              <div class="flex items-center acceptbox">
                <img
                  src="/images/credit1.png"
                  class="ml-[5px] max-w-[30px]"
                  alt=""
                />
                <img
                  class="ml-[5px] max-w-[30px]"
                  src="/images/credit2.png"
                  alt=""
                />
                <img
                  class="ml-[5px] max-w-[30px]"
                  src="/images/credit3.png"
                  alt=""
                />
                <img
                  class="ml-[5px] max-w-[30px]"
                  src="/images/credit4.png"
                  alt=""
                />
                <img
                  class="ml-[5px] max-w-[30px]"
                  src="/images/credit5.png"
                  alt=""
                />
                <img
                  class="ml-[5px] max-w-[30px]"
                  src="/images/credit6.png"
                  alt=""
                />
                <img
                  class="ml-[5px] max-w-[30px]"
                  src="/images/credit7.png"
                  alt=""
                />
                <img
                  class="ml-[5px] max-w-[30px]"
                  src="/images/credit8.png"
                  alt=""
                />
                <img
                  class="ml-[5px] max-w-[30px]"
                  src="/images/credit9.png"
                  alt=""
                />
              </div>

              <div>
                <h3 class="mt-10 mb-6 text-base font-medium text-slate-700">
                  Get Apps
                </h3>

                <div class="flex items-center btnsbox">
                  <div
                    class="flex px-[10px] items-center justify-center w-48 mt-3 text-white bg-black h-14 rounded-xl"
                  >
                    <div class="mr-3">
                      <svg viewBox="0 0 384 512" width="23">
                        <path
                          fill="currentColor"
                          d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div class="text-[9px] ">Download on the</div>
                      <div class="text-[15px] font-bold font-sans -mt-1">
                        App Store
                      </div>
                    </div>
                  </div>
                  <div
                    class="googleplay px-[10px] ml-[8px] flex mt-3 w-48 h-14 bg-black text-white rounded-lg items-center justify-center"
                  >
                    <div class="mr-3">
                      <svg viewBox="30 336.7 120.9 129.2" width="23">
                        <path
                          fill="#FFD400"
                          d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                        />
                        <path
                          fill="#FF3333"
                          d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                        />
                        <path
                          fill="#48FF48"
                          d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                        />
                        <path
                          fill="#3BCCFF"
                          d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div class="text-[10px] ">GET IT ON</div>
                      <div class="text-[15px] font-bold font-sans -mt-1">
                        Google Play
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </nav>
        </div>

        <!-- bottom -->

        <div class="mt-5 border-t pt-7">
          <div class="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div class="col-span-4 lg:col-span-2">
              <i class="mr-2 bx bxl-facebook bx-sm"></i>
              <i class="mr-2 bx bxl-twitter bx-sm"></i
              ><i class="mr-2 bx bxl-youtube bx-sm"></i>
            </div>
            <div class="col-span-4 lg:col-span-10">
              <p>
                Copyright 2013-2023 - Company Name. All trademarks and
                registered trademarks are the property of their respective
                owners. Unlocator™ is not affiliated with or endorsed by any
                service mentioned on our site. Unlocator is a VPN/DNS service
                not intended to be used as a means of copyright circumvention.
                Please read the Unlocator.
                <a href="" class="text-[#5585F7]">Terms of Use</a> .
                <a href="" class="text-[#5585F7]">Cookie Policy</a> .
                <a href="" class="text-[#5585F7]"> Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const menus = [
  {
    title: 'VPN',
    links: [
      {
        text: 'Unlocator Hybird',
        url: '/',
      },
      {
        text: 'Anonymous IP',
        url: '/',
      },
      {
        text: 'Internet Privacy',
        url: '/',
      },
      {
        text: 'VPN Apps',
        url: '/',
      },
    ],
  },
  {
    title: 'DNS Setup',
    links: [
      {
        text: 'Gaming Consoles',
        url: '/',
      },
      {
        text: 'Media Players',
        url: '/',
      },
      {
        text: 'Operating Systems',
        url: '/',
      },
      {
        text: 'Phones & Tablets',
        url: '/',
      },
      {
        text: 'Routers',
        url: '/',
      },
      {
        text: 'Smart TVs',
        url: '/',
      },
    ],
  },
  {
    title: 'Companey',
    links: [
      {
        text: 'Support',
        url: '/',
      },
      {
        text: 'Blog',
        url: '/',
      },
      {
        text: 'Facebook',
        url: '/',
      },
      {
        text: 'Twitter',
        url: '/',
      },
      {
        text: 'About Us',
        url: '/',
      },
      {
        text: 'Affliates',
        url: '/',
      },
    ],
  },
];
</script>

<style>
@media (max-width: 768px) {
  .acceptbox {
    flex-wrap: wrap;
  }

  .btnsbox {
    flex-wrap: wrap;
  }
  .text {
    padding: 0px 20px;
  }
  .minibox {
    display: none;
  }
  .googleplay {
    margin-left: 0px;
  }
  .footersec{
    margin-top: 80px;
  }
}
</style>
