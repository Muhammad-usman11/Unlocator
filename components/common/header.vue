<template>
  <!-- Component: Navbar with Topbar -->

  <!-- Header -->
  <header
    class="relative z-20 w-full border-b border-b-1 border-slate-200 bg-white/90 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden"
  >
    <div
      class="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]"
    >
      <nav
        aria-label="main navigation"
        class="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
        role="navigation"
      >
        <!-- Brand logo -->
        <a
          id="WindUI"
          aria-label="WindUI logo"
          aria-current="page"
          class="flex items-center gap-2 py-3 text-lg whitespace-nowrap focus:outline-none lg:flex-1"
          href="javascript:void(0)"
        >
          <img src="images/logo.png" class="max-w-[120px] md:max-w-[150px]" />
        </a>
        <!-- Mobile trigger -->
        <button
          class="relative self-center order-10 visible block w-10 h-10 opacity-100 lg:hidden"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div
            class="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          >
            <span
              aria-hidden="true"
              class="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
            ></span>
            <span
              aria-hidden="true"
              class="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
            ></span>
            <span
              aria-hidden="true"
              class="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
            ></span>
          </div>
        </button>
        <!-- Navigation links -->
        <ul
          role="menubar"
          aria-label="Select page"
          class="invisible absolute top-0 left-0 z-[-1] ml-auto h-screen w-full justify-center overflow-hidden overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-28 font-medium opacity-0 transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0 lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0 lg:pt-0 lg:opacity-100"
        >
          <li role="none" class="flex items-stretch">
            <a
              role="menuitem"
              aria-haspopup="false"
              tabindex="0"
              class="flex items-center text-[#687076] gap-2 py-2 transition-colors duration-300 hover:text-[#3E63DD] focus:bg-emerald-50 focus:outline-none focus-visible:outline-none lg:px-8"
              href="javascript:void(0)"
            >
              <span>Products</span></a
            >
          </li>
          <li role="none" class="flex items-stretch">
            <a
              role="menuitem"
              aria-current="page"
              aria-haspopup="false"
              tabindex="0"
              class="flex items-center text-[#687076] gap-2 py-2 transition-colors duration-300  hover:text-[#3E63DD] focus:bg-emerald-50 focus:outline-none focus-visible:outline-none lg:px-8"
              href="javascript:void(0)"
            >
              <span>Pricing</span>
            </a>
          </li>
          <li role="none" class="flex items-stretch">
            <a
              role="menuitem"
              aria-haspopup="false"
              tabindex="0"
              class="flex text-[#687076] items-center gap-2 py-2 transition-colors duration-300 hover:text-[#3E63DD] focus:bg-emerald-50 focus:outline-none focus-visible:outline-none lg:px-8"
              href="javascript:void(0)"
            >
              <span>Support</span>
            </a>
          </li>
        </ul>
        <!-- Actions -->
        <div
          class="flex items-center justify-end px-6 ml-auto lg:ml-0 lg:flex-1 lg:p-0"
        >
          <button type="submit" class="hidden mr-5 md:block">Sign In</button>
          <button
            type="submit"
            class="inline-block !w-auto px-4 md:px-10 primary-btn ml-[16px] "
          >
            Sign Up
          </button>
        </div>
      </nav>
    </div>
  </header>
  <!-- End Navbar with Topbar-->
</template>
