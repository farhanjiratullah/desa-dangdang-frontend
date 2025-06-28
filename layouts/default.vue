<script setup>
import FooterComponent from '@/components/footer.vue';
import HeaderComponent from '@/components/header.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

if (process.client) {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out', 
    once: true, 
  });
}

useHead({
  script: [
    {
      src: '/_nuxt/assets/vendor/purecounter/purecounter_vanilla.js',
      type: 'module',
    },
    {
      src: '/_nuxt/assets/js/main.js',
      type: 'module',
    },
  ]
})

const isLoading = ref(true);
const isScrolled = ref(false);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});

const handleScroll = () => {
  if (window.scrollY > 50) {
    isScrolled.value = true;
    document.body.classList.add('scrolled');
  } else {
    isScrolled.value = false;
    document.body.classList.remove('scrolled');
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <div>
        <HeaderComponent :isLoading="isLoading" :isScrolled="isScrolled" />
        <main class="main">
            <NuxtPage/>
        </main>
        <FooterComponent />
        <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
        <div v-if="isLoading" id="preloader"></div>
    </div>
</template>