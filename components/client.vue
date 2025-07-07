<template>
    <section id="clients" class="clients section">
        <div class="container section-title" data-aos="fade-up">
            <h2>Supported By</h2>
        </div>
        <!-- End Section Title -->

        <div class="container" data-aos="fade-up" data-aos-delay="100">
            <swiper
                :modules="modules"
                :loop="true"
                :speed="600"
                :autoplay="{ delay: 5000 }"
                slides-per-view="auto"
                :pagination="{ clickable: true }"
                :breakpoints="breakpoints"
                class="swiper-container"
            >
                <swiper-slide
                    v-for="(client, index) in clients"
                    :key="index"
                    class="swiper-wrapper align-items-center"
                >
                    <NuxtImg
                        :src="client.path_icon"
                        class="img-fluid"
                        alt="Client logo"
                    />
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<script>
    import { Swiper, SwiperSlide } from "swiper/vue";
    import { Pagination } from "swiper/modules";
    import "swiper/css";
    import "swiper/css/pagination";

    export default {
        name: "ClientSection",
        components: {
            Swiper,
            SwiperSlide,
        },
        setup() {
            return {
                modules: [Pagination],
            };
        },
        data() {
            return {
                clients: [],
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 60,
                    },
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 80,
                    },
                    992: {
                        slidesPerView: 5,
                        spaceBetween: 120,
                    },
                },
            };
        },
        mounted() {
            this.fetchDataClient();
        },
        methods: {
            async fetchDataClient() {
                try {
                    const response = await fetchData("/client-sections");
                    this.clients = response.data;
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>
