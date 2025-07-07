<template>
    <footer id="footer" class="footer">
        <div class="container footer-top">
            <div class="row gy-4 d-flex justify-center">
                <div class="col-lg-6 col-md-6 footer-about">
                    <a href="#" class="logo d-flex align-items-center">
                        <span class="sitename">DESA DANGDANG</span>
                    </a>
                    <div class="footer-contact pt-3">
                        <p>Kec. Cisauk, Kab. Tangerang, Banten</p>
                        <p>
                            Jln. Raya Maloko No.1, RT.004 RW.002 Desa Dangdang
                            Kecamatan Cisauk Kabupaten Tangerang-Provinsi Banten
                            15342
                        </p>
                        <p class="mt-3">
                            <strong>Phone:</strong>
                            <span>081234567890</span>
                        </p>
                    </div>
                    <div class="social-links d-flex mt-4">
                        <a href="https://facebook.com/desa.dangdang"
                            ><i class="bi bi-facebook"></i
                        ></a>
                        <a href="https://www.instagram.com/desadangdang/"
                            ><i class="bi bi-instagram"></i
                        ></a>
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
                            <NuxtLink :to="{ name: 'index', hash: '#berita' }"
                                >Berita</NuxtLink
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
