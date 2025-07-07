<template>
    <section id="contact" class="contact section light-background">
        <!-- Section Title -->
        <div class="container section-title" data-aos="fade-up">
            <h2>Contact</h2>
            <p>
                Jika ada saran, keluhan, atau pertanyaan, silakan hubungi kami
                melalui formulir di bawah ini.
            </p>
        </div>
        <!-- End Section Title -->

        <div class="container" data-aos="fade-up" data-aos-delay="100">
            <div class="row g-4 g-lg-5">
                <div class="col-lg-5">
                    <div
                        class="info-box"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h3>Contact Info</h3>
                        <p>Desa Dangdang</p>

                        <div
                            class="info-item"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <div class="icon-box">
                                <i class="bi bi-geo-alt"></i>
                            </div>
                            <div class="content">
                                <h4>Our Location</h4>
                                <p>Kec. Cisauk, Kab. Tangerang, Banten</p>
                                <p>
                                    Jln. Raya Maloko No.1, RT.004 RW.002 Desa
                                    Dangdang Kecamatan Cisauk Kabupaten
                                    Tangerang-Provinsi Banten 15342
                                </p>
                            </div>
                        </div>

                        <div
                            class="info-item"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            <div class="icon-box">
                                <i class="bi bi-telephone"></i>
                            </div>
                            <div class="content">
                                <h4>Phone Number</h4>
                                <p>081234567890</p>
                            </div>
                        </div>

                        <div
                            class="info-item"
                            data-aos="fade-up"
                            data-aos-delay="500"
                        >
                            <div class="icon-box">
                                <i class="bi bi-envelope"></i>
                            </div>
                            <div class="content">
                                <h4>Email Address</h4>
                                <p>dangdang@desa.id</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-7">
                    <div
                        id="form-appointment"
                        class="contact-form"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <h3>Get In Touch</h3>
                        <p>Tolong isi formulir di bawah ini.</p>

                        <form
                            @submit.prevent="handlerSubmit"
                            method="post"
                            class="php-email-form"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div class="row gy-4">
                                <div class="col-md-6">
                                    <input
                                        type="text"
                                        v-model="name"
                                        name="name"
                                        class="form-control"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>

                                <div class="col-md-6">
                                    <input
                                        type="email"
                                        v-model="email"
                                        class="form-control"
                                        name="email"
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>

                                <div class="col-md-6">
                                    <input
                                        type="tel"
                                        v-model="phone_number"
                                        class="form-control"
                                        name="phone_number"
                                        placeholder="Your Phone Number"
                                        required
                                    />
                                </div>

                                <div class="col-12">
                                    <textarea
                                        class="form-control"
                                        v-model="brief"
                                        name="brief"
                                        rows="6"
                                        placeholder="Pesan Anda"
                                        required
                                    ></textarea>
                                </div>

                                <div class="col-12 text-center">
                                    <div v-if="loading" class="loading">
                                        Loading...
                                    </div>
                                    <div v-if="error" class="error-message">
                                        {{ error }}
                                    </div>
                                    <div
                                        v-if="sentMessage"
                                        class="sent-message"
                                    >
                                        {{ sentMessage }}
                                    </div>

                                    <button type="submit" class="btn">
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { fetchData, createData } from "~/utils/api";

    export default {
        data() {
            return {
                contact: {},
                name: "",
                email: "",
                phone_number: "",
                budget: "1",
                meet_at: "2025-06-28",
                service_id: 1,
                brief: "",
            };
        },
        mounted() {
            // this.fetchDataContactUs();
        },
        methods: {
            async fetchDataContactUs() {
                try {
                    const response = await fetchData("/contact-us");
                    this.contact = response.data;
                } catch (error) {
                    console.log(error);
                }
            },
            async handlerSubmit() {
                this.loading = true;
                this.error = "";
                this.sentMessage = "";

                const formData = {
                    name: this.name,
                    email: this.email,
                    phone_number: this.phone_number,
                    budget: Number(this.budget),
                    meet_at: this.meet_at,
                    service_id: this.service_id,
                    brief: this.brief,
                };

                try {
                    await createData("/appointments", formData);
                    this.sentMessage = "Your message has been sent. Thank you!";
                    this.resetForm();
                } catch (error) {
                    this.error =
                        "An error occurred while sending your message. Please try again.";
                } finally {
                    this.loading = false;
                }
            },
            resetForm() {
                this.name = "";
                this.email = "";
                this.phone_number = "";
                this.budget = "";
                this.meet_at = "";
                this.service_id = 0;
                this.brief = "";
            },
        },
    };
</script>
