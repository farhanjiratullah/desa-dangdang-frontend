<template>
    <section id="" class="section">
        <div class="container section-title-statistics" data-aos="fade-up">
            <h2>Statistics</h2>
        </div>
        <!-- End Section Title -->

        <div data-aos="fade-up" data-aos-delay="100">
            <div class="container">
                <div
                    class="row stats-row gy-4"
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
        </div>
    </section>
</template>

<script>
    import { fetchData } from "~/utils/api";

    export default {
        name: "StatisticSection",
        data() {
            return {
                statistics: [], // Array to store statistics data
            };
        },
        mounted() {
            this.fetchStatistics(); // Fetch statistics data
        },
        methods: {
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
    .section-title-statistics {
        text-align: center;
        position: relative;
    }

    .section-title-statistics h2 {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 20px;
        padding-bottom: 20px;
        position: relative;
    }

    .section-title-statistics h2:after {
        content: "";
        position: absolute;
        display: block;
        width: 50px;
        height: 3px;
        background: var(--accent-color);
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    .section-title-statistics p {
        margin-bottom: 0;
    }
</style>
