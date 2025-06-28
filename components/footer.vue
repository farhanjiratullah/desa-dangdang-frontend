<template>
    <footer id="footer" class="footer">
        <div class="container footer-top">
            <div class="row gy-4">
                <div class="col-lg-4 col-md-6 footer-about">
                    <a href="#" class="logo d-flex align-items-center">
                        <span class="sitename">BWACOMPRO</span>
                    </a>
                    <div class="footer-contact pt-3">
                        <p>{{ contact.location_name }}</p>
                        <p>{{ contact.address }}</p>
                        <p class="mt-3">
                            <strong>Phone:</strong>
                            <span>{{ contact.phone_number }}</span>
                        </p>
                    </div>
                </div>

                <div class="col-lg-2 col-md-3 footer-links">
                    <h4>Useful Links</h4>
                    <ul>
                        <li>
                            <NuxtLink
                                :to="{ name: 'index', hash: '#hero' }"
                                class="active"
                                >Home</NuxtLink
                            >
                        </li>
                        <li>
                            <NuxtLink :to="{ name: 'index', hash: '#about' }"
                                >About</NuxtLink
                            >
                        </li>
                        <li>
                            <NuxtLink :to="{ name: 'index', hash: '#team' }"
                                >Team</NuxtLink
                            >
                        </li>
                        <li>
                            <NuxtLink
                                :to="{ name: 'index', hash: '#testimonial' }"
                                >Testimonial</NuxtLink
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="container copyright text-center mt-4">
            <p>
                © <span>Copyright</span>
                <strong class="px-1 sitename">Desa Dangdang</strong>
                <span>All Rights Reserved</span>
            </p>
            <div class="credits">
                <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you've purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: [buy-url] -->
                Designed by
                <a href="#">Mahasiswa Magang Universitas Pamulang</a>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                contact: {},
            };
        },
        mounted() {
            this.fetchDataContact();
        },
        methods: {
            async fetchDataContact() {
                try {
                    const response = await fetchData("/contact-us");
                    this.contact = response.data;
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>
