<template>
    <section id="testimonial" class="testimonials section light-background">
        <!-- Section Title -->
        <div class="container section-title" data-aos="fade-up">
            <h2>Kata Warga</h2>
        </div>
        <!-- End Section Title -->

        <div class="container">
            <swiper
                :modules="modules"
                :loop="true"
                :speed="600"
                :autoplay="{ delay: 5000 }"
                slides-per-view="auto"
                :breakpoints="breakpoints"
                :navigation="true"
                class="mySwiper"
                data-aos="fade-up"
            >
                <!-- Loop through testimonis and create each slide -->
                <swiper-slide v-for="item in testimonis" :key="item.id">
                    <div class="testimonial-item">
                        <NuxtImg
                            :src="`${item.thumbnail}`"
                            class="testimonial-img"
                            alt=""
                        />
                        <h3>{{ item.client_name }}</h3>
                        <h4>{{ item.role }}</h4>
                        <div class="stars">
                            <i class="bi bi-star-fill"></i
                            ><i class="bi bi-star-fill"></i
                            ><i class="bi bi-star-fill"></i
                            ><i class="bi bi-star-fill"></i
                            ><i class="bi bi-star-fill"></i>
                        </div>
                        <p>
                            <i class="bi bi-quote quote-icon-left"></i>
                            <span>{{ item.message }}</span>
                            <i class="bi bi-quote quote-icon-right"></i>
                        </p>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>
<script>
    import { Swiper, SwiperSlide } from "swiper/vue";
    import { Navigation } from "swiper/modules";
    import "swiper/css";
    import "swiper/css/navigation";

    export default {
        components: {
            Swiper,
            SwiperSlide,
        },
        setup() {
            return {
                modules: [Navigation],
            };
        },
        data() {
            return {
                testimonis: [],
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 80,
                    },
                    992: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                },
            };
        },
        mounted() {
            this.fetchDataTestimonis();
        },
        methods: {
            async fetchDataTestimonis() {
                try {
                    const response = await fetchData(
                        "/portofolio-testimonials"
                    );
                    this.testimonis = response.data;
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>
