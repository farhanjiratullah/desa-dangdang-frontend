<template>
    <header id="header" class="header d-flex align-items-center fixed-top">
        <div
            class="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between"
        >
            <a
                href="index.html"
                class="logo d-flex align-items-center me-auto me-xl-0"
            >
                <!-- Uncomment the line below if you also wish to use an image logo -->
                <img
                    src="assets/img/supported-by/desa-dangdang.png"
                    alt="Desa Dangdang"
                />
                <h1 class="sitename">Desa Dangdang</h1>
            </a>

            <nav id="navmenu" class="navmenu">
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
                        <NuxtLink :to="{ name: 'index', hash: '#testimonial' }"
                            >Testimonial</NuxtLink
                        >
                    </li>
                    <li>
                        <NuxtLink :to="{ name: 'index', hash: '#contact' }"
                            >Contact</NuxtLink
                        >
                    </li>
                </ul>
                <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>

            <a class="btn-getstarted" href="#about">Get Started</a>
        </div>
    </header>
</template>

<script setup>
    defineProps({
        isLoading: {
            type: Boolean,
            default: false,
        },
        isScrolled: {
            type: Boolean,
            default: false,
        },
    });
</script>

<style>
    .index-page.scrolled .header {
        --background-color: rgba(40, 58, 90, 0.9);
    }
</style>
