<template>
    <section id="hero" class="hero section p-0">
        <swiper
            :modules="modules"
            :slides-per-view="1"
            :loop="true"
            :autoplay="{ delay: 5000 }"
            navigation
            :pagination="{ clickable: true }"
            class="hero-swiper"
        >
            <swiper-slide v-for="hero in heros" :key="hero.id">
                <div class="hero-slide">
                    <img
                        :src="hero.banner"
                        alt="Hero Image"
                        class="hero-bg-img"
                    />
                    <div class="hero-overlay"></div>
                    <div class="hero-caption">
                        <h1 class="mb-4 text-white font-bold text-2xl">
                            {{ hero.heading }}
                        </h1>
                        <p class="mb-4 mb-md-5">{{ hero.subheading }}</p>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </section>
</template>

<script>
    import { Swiper, SwiperSlide } from "swiper/vue";
    import { Navigation, Pagination, Autoplay } from "swiper/modules";
    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";
    import { fetchData } from "~/utils/api";

    export default {
        name: "HeroSection",
        components: {
            Swiper,
            SwiperSlide,
        },
        setup() {
            return {
                modules: [Navigation, Pagination, Autoplay],
            };
        },
        data() {
            return {
                heros: [],
            };
        },
        mounted() {
            this.fetchDataHero();
        },
        methods: {
            async fetchDataHero() {
                try {
                    const response = await fetchData("/hero-sections");
                    this.heros = response.data;
                    console.log(this.heros);
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>

<style scoped>
    .hero-swiper,
    .hero-slide {
        width: 100vw;
        height: 100vh;
        position: relative;
        overflow: hidden;
    }
    .hero-bg-img {
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        display: block;
    }
    .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.45);
        z-index: 1;
    }
    .hero-caption {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 2;
        color: #fff;
        padding: 2rem 3rem;
        max-width: 700px;
    }
    @media (max-width: 768px) {
        .hero-caption {
            padding: 1rem 1.5rem;
            max-width: 100%;
        }
    }
</style>
