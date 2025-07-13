<template>
    <div class="page-title light-background">
        <div class="container">
            <h1>SOTK</h1>
            <nav class="breadcrumbs">
                <ol>
                    <li><NuxtLink :to="{ name: 'index' }">Home</NuxtLink></li>
                    <li class="current">SOTK</li>
                </ol>
            </nav>
        </div>
    </div>
    <!-- End Page Title -->
    <section id="team" class="testimonials section">
        <div class="container">
            <div class="row gy-4">
                <div
                    v-for="item in teams"
                    class="col-lg-4 col-md-6"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <div class="testimonial-item p-5">
                        <NuxtImg
                            :src="`${item.path_photo}`"
                            class="w-full"
                            :alt="item.name"
                        />
                        <h3 class="text-center text-2xl">{{ item.name }}</h3>
                        <h4 class="text-xl text-center">{{ item.role }}</h4>
                        <p class="font-thin text-center text-lg not-italic">
                            {{ item.tagline }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                teams: [],
            };
        },
        mounted() {
            this.fetchDataTeams();
        },
        methods: {
            async fetchDataTeams() {
                try {
                    const response = await fetchData("/our-teams");
                    this.teams = response.data;
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>
