<template>
    <section id="about" class="about section">
        <div class="container" data-aos="fade-up" data-aos-delay="100">
            <div class="row gy-4 align-items-center justify-content-between">
                <div class="col-xl-5" data-aos="fade-up" data-aos-delay="200">
                    <span class="about-meta">MORE ABOUT US</span>
                    <p class="about-description">
                        Nama "Dangdang" berasal dari istilah lokal dalam bahasa
                        Sunda yang berarti "mempersiapkan sesuatu". Filosofi ini
                        mencerminkan semangat masyarakatnya yang selalu siap
                        dalam menghadapi perubahan dan pembangunan dari masa ke
                        masa.
                    </p>
                    <p class="about-description">
                        Secara historis, wilayah ini dahulu dikenal sebagai
                        daerah yang menjadi tempat persinggahan atau persiapan
                        bagi para pelintas atau rombongan dari daerah pedalaman
                        menuju pusat kota atau daerah perdagangan. Karena
                        fungsinya sebagai tempat “pendangdangan” atau tempat
                        mempersiapkan bekal, kendaraan, dan kebutuhan lainnya,
                        akhirnya wilayah ini disebut sebagai “Dangdang”.
                    </p>
                </div>

                <div class="col-xl-6" data-aos="fade-up" data-aos-delay="300">
                    <div class="image-wrapper">
                        <div
                            class="images position-relative"
                            data-aos="zoom-out"
                            data-aos-delay="400"
                        >
                            <img
                                src="assets/img/sejarah/desa-dangdang.jpg"
                                alt="Desa Dangdang"
                                class="img-fluid main-image rounded-4"
                            />
                            <img
                                src="assets/img/sejarah/kepala-desa-cropped.jpg"
                                alt="Team Discussion"
                                class="img-fluid small-image rounded-4"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "AboutSection",
        data() {
            return {
                about: {},
            };
        },
        mounted() {
            // this.fetchDataAbout();
        },
        methods: {
            async fetchDataAbout() {
                try {
                    const response = await fetchData("/about-companies");
                    this.about = response.data;
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>
