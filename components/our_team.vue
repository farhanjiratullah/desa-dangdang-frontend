<template>
    <section id="team" class="testimonials section light-background our-team">
        <div class="container section-title" data-aos="fade-up">
          <h2>SOTK</h2>
        </div><!-- End Section Title -->


        <div class="container">
            <div class="row gy-4">
                <div v-for="item in teams" class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
                    <div class="testimonial-item p-5">
                        <NuxtImg :src="`${item.path_photo}`" class="w-full" :alt="item.name"/>
                        <h3 class="text-center text-2xl">{{ item.name }}</h3>
                        <h4 class="text-xl text-center">{{ item.role }}</h4>
                    </div>
                </div>
                <div class="col-lg-12 d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
                    <NuxtLink :to="{ 'name': 'sotk' }" class="btn btn-primary me-0 me-sm-2 mx-1">Lihat Selengkapnya</NuxtLink>
                </div>
            </div>

        </div>

    </section>
</template>

<script>
  export default {
    data() {
      return {
        teams: []
      }
    },
    mounted() {
      this.fetchDataTeams();
    },
    methods: {
      async fetchDataTeams() {
        try {
          const response = await fetchData("/our-teams");
          this.teams = response.data;
          this.teams = this.teams.slice(0, 4);
        } catch (error) {
          console.log(error);
        }
      },
    }
  };
</script>