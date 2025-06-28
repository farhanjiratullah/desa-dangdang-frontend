<template>
    <section id="hero" class="hero section">
        <div data-aos="fade-up" data-aos-delay="100">
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
                    <div class="row align-items-center">
                        <div class="col-lg-6">
                            <div
                                class="hero-content"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <h1 class="mb-4 text-white">
                                    {{ hero.heading }}
                                </h1>
                                <p class="mb-4 mb-md-5">
                                    {{ hero.subheading }}
                                </p>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div
                                class="hero-image"
                                data-aos="zoom-out"
                                data-aos-delay="300"
                            >
                                <img
                                    :src="`${hero.banner}`"
                                    alt="Hero Image"
                                    class="img-fluid hero-img"
                                />
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>

            <div
                class="row stats-row gy-4 mt-5"
                data-aos="fade-up"
                data-aos-delay="500"
            >
                <div
                    v-for="stat in statistics"
                    :key="stat.id"
                    class="col-lg-3 col-md-6"
                >
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i :class="stat.icon"></i>
                        </div>
                        <div class="stat-content">
                            <h4>{{ stat.total }}</h4>
                            <p class="mb-0">{{ stat.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                statistics: [], // Array to store statistics data
            };
        },
        mounted() {
            this.fetchDataHero();
            this.fetchStatistics(); // Fetch statistics data
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
            async fetchStatistics() {
                try {
                    const response = await fetchData("/statistics");
                    this.statistics = response.data; // Assign statistics data to the statistics array
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>

<style scoped>
    .hero {
        position: relative;
        width: 100%;
        height: 100vh; /* Pastikan hero section memenuhi seluruh layar */
        overflow: hidden;
    }

    .hero .hero-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        z-index: -1; /* Tempatkan gambar di belakang konten */
    }

    /* Overlay gelap */
    .hero .hero-image::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(
            0,
            0,
            0,
            0.5
        ); /* Menambahkan warna gelap dengan transparansi */
        z-index: 1; /* Tempatkan overlay di atas gambar */
    }

    .hero-content {
        position: absolute;
        top: 55%;
        bottom: 20px;
        left: 20px;
        color: white !important;
        z-index: 2; /* Konten di atas overlay */
    }

    .hero .hero-content h1 {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .hero .hero-content p {
        font-size: 1.25rem;
        margin-bottom: 20px;
    }

    .hero .hero-buttons {
        margin-top: 10px;
    }

    .hero-swiper {
        position: relative;
        z-index: 0;
    }

    .hero-swiper .swiper-slide {
        position: relative;
        height: 100vh; /* Pastikan setiap slide juga memenuhi layar */
    }

    .hero-swiper .swiper-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
