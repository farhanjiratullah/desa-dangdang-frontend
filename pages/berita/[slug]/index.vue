<template>
    <div
        class="page-title-berita light-background position-relative"
        :style="
            post.featured_image
                ? `background: url('${post.featured_image}') center center / cover no-repeat;`
                : ''
        "
    >
        <!-- Overlay gelap -->
        <div
            v-if="post.featured_image"
            class="position-absolute top-0 start-0 w-100 h-100"
            style="background: rgba(0, 0, 0, 0.5); z-index: 1"
        ></div>
        <div class="container position-relative" style="z-index: 2">
            <h1>Berita</h1>
            <nav class="breadcrumbs">
                <ol>
                    <li><NuxtLink :to="{ name: 'index' }">Home</NuxtLink></li>
                    <li>
                        <NuxtLink :to="{ name: 'berita' }">Berita</NuxtLink>
                    </li>
                    <li class="current">{{ post.title }}</li>
                </ol>
            </nav>
        </div>
    </div>
    <!-- End Page Title -->
    <section class="berita section">
        <div class="container section-title-berita" data-aos="fade-up">
            <h2>{{ post.title }}</h2>
            <img
                :src="post.featured_image"
                :alt="post.title"
                class="img-fluid w-50"
            />
        </div>
        <!-- End Section Title -->

        <div class="container" data-aos="fade-up">
            <div v-html="post.content" class="post-content"></div>
        </div>
    </section>
</template>

<script setup>
    import { ref, onMounted } from "vue";

    const post = ref({});

    const route = useRoute();

    async function fetchDataPost() {
        try {
            const response = await fetchDataByID(
                "/posts/slug",
                route.params.slug
            );
            post.value = response.data;
        } catch (error) {
            console.log(error);
        }
    }

    onMounted(() => {
        fetchDataPost();
    });
</script>

<style>
    /* Center image */
    .post-content figure {
        margin: 0 auto;
    }

    .post-content figure img {
        display: inline-block;
        max-width: 100%;
        height: auto;
    }

    /* Right-aligned image */
    .post-content figure.image-style-side {
        text-align: right;
        margin-left: auto;
        margin-right: 0;
    }

    .post-content figure.image-style-side img {
        display: block;
        float: right;
        margin-left: auto;
        margin-right: 0;
        max-width: 100%;
        height: auto;
    }

    /* Custom class for additional styling */
    .image_resized {
        width: 100%;
        height: auto;
    }
</style>
