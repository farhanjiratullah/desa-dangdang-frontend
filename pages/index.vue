<script setup>
    import HeroSection from "~/components/hero.vue";
    import AboutSection from "~/components/about.vue";
    import Client from "~/components/client.vue";
    import Testimonial from "~/components/testimonial.vue";
    import OurTeam from "~/components/our_team.vue";
    import Portofolio from "~/components/portofolio.vue";
    import ActionAppointment from "~/components/action_appointment.vue";
    import Statistic from "~/components/statistic.vue";
    import Berita from "~/components/berita.vue";

    definePageMeta({
        layout: "default",
    });
</script>

<template>
    <div>
        <HeroSection />
        <AboutSection />
        <Statistic />
        <OurTeam />
        <Berita />
        <Testimonial />
        <Client />
        <Contact />
    </div>
</template>
