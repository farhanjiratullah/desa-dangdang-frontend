<template>
    <section id="portofolio" class="pricing section light-background">

        <!-- Section Title -->
        <div class="container section-title" data-aos="fade-up">
            <h2>Portofolio</h2>
        </div><!-- End Section Title -->

        <div class="container" data-aos="fade-up" data-aos-delay="100">

            <div class="row g-4 justify-content-center">

                <!-- Basic Plan -->
                <div v-for="item in portofolios" class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                    <div class="pricing-card">
                        <img :src="item.thumbnail" class="w-full mb-10" :alt="item.thumbnail">
                        <h3>{{item.name}}</h3>
                        <p class="description">{{ item.tagline }}</p>
                    </div>
                </div>

            </div>

        </div>

    </section>
</template>

<script>
import { fetchData } from '~/utils/api'

export default {
  data() {
    return {
      portofolios: [],
    };
  },
  mounted() {
    this.fetchDataPortofolio();
  },
  methods: {
    async fetchDataPortofolio() {
      try {
        const response = await fetchData("/portofolio-sections");
        this.portofolios = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  }
};

</script>