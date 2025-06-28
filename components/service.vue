<template>
    <section id="services" class="services section light-background">

        <!-- Section Title -->
        <div class="container section-title" data-aos="fade-up">
          <h2>Services</h2>
          <p>We are committed to giving all of our best efforts to create a masterpiece.</p>
        </div><!-- End Section Title -->

        <div class="container" data-aos="fade-up" data-aos-delay="100">

            <div class="row g-4">

                <div v-for="item in services" :id="item.name.toLowerCase().replaceAll(' ', '')" class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                    <div class="service-card d-flex">
                        <div class="icon flex-shrink-0">
                            <NuxtImg :src="`${item.path_icon}`"/>
                        </div>
                        <div>
                        <h3>{{ item.name }}</h3>
                        <p>{{ item.tagline }}</p>
                        <a href="#form-appointment" class="read-more">Appointment <i class="bi bi-arrow-right"></i></a>
                        </div>
                    </div>
                </div><!-- End Service Card -->
            </div>
        </div>

    </section>
</template>

<script>
  export default {
    data() {
      return {
        services: []
      }
    },
    mounted() {
      this.fetchDataServices();
    },
    methods: {
      async fetchDataServices() {
        try {
          const response = await fetchData("/service-sections");
          this.services = response.data;
        } catch (error) {
          console.log(error);
        }
      },
    }
  };
</script>