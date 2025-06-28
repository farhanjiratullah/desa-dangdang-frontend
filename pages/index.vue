<script setup>
import HeroSection from '~/components/hero.vue';
import AboutSection from '~/components/about.vue';
import Client from '~/components/client.vue';
import Testimonial from '~/components/testimonial.vue';
import OurTeam from '~/components/our_team.vue';
import Portofolio from '~/components/portofolio.vue';
import ActionAppointment from '~/components/action_appointment.vue';

definePageMeta({
  layout: 'default',
})

</script>

<template>
  <div>
    <HeroSection />
    <AboutSection />
    <OurTeam/>
    <Client/>
    <Testimonial/>
    <Contact/>
  </div>
</template>