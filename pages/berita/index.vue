<template>
    <div class="page-title light-background">
        <div class="container">
            <h1>Berita</h1>
            <nav class="breadcrumbs">
                <ol>
                    <li><NuxtLink :to="{ name: 'index' }">Home</NuxtLink></li>
                    <li class="current">Berita</li>
                </ol>
            </nav>
        </div>
    </div>
    <!-- End Page Title -->
    <section id="berita" class="berita section">
        <div class="container" data-aos="fade-up">
            <div class="row g-4">
                <div
                    v-for="(item, i) in posts"
                    :key="i"
                    class="col-lg-4 col-md-6 mb-4"
                >
                    <div class="bg-white shadow rounded overflow-hidden h-100">
                        <div
                            class="w-100 position-relative"
                            style="
                                height: 192px;
                                overflow: hidden;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            "
                        >
                            <img
                                :src="item.featured_image"
                                class="img-fluid h-100 w-100 object-fit-cover"
                                style="object-fit: cover"
                                alt="featured"
                            />
                            <span
                                class="position-absolute start-0 bottom-0"
                                style="
                                    left: 0;
                                    bottom: 0;
                                    transform: translateY(-40%);
                                    z-index: 2;
                                "
                            >
                                <span
                                    class="d-flex flex-column align-items-center justify-content-center"
                                    style="
                                        background: #ff3366;
                                        color: #fff;
                                        font-weight: bold;
                                        border-radius: 0 6px 6px 0;
                                        padding: 6px 12px 4px 12px;
                                        min-width: 44px;
                                        box-shadow: 0 2px 8px
                                            rgba(0, 0, 0, 0.08);
                                    "
                                >
                                    <span
                                        style="
                                            font-size: 1.2rem;
                                            line-height: 1;
                                        "
                                        class="mb-2"
                                    >
                                        {{
                                            new Date(
                                                item.published_at
                                            ).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                            })
                                        }}
                                    </span>
                                    <span
                                        style="
                                            font-size: 0.75rem;
                                            line-height: 1;
                                            font-weight: normal;
                                        "
                                    >
                                        {{
                                            new Date(
                                                item.published_at
                                            ).toLocaleDateString("id-ID", {
                                                month: "short",
                                            })
                                        }}
                                    </span>
                                </span>
                            </span>
                        </div>
                        <div class="p-4">
                            <h3 class="text-lg font-semibold">
                                {{ item.title }}
                            </h3>
                            <p class="text-gray-600 mb-4">
                                {{
                                    stripHtmlAndEntities(item.content).length >
                                    250
                                        ? stripHtmlAndEntities(
                                              item.content
                                          ).slice(0, 250) + "..."
                                        : stripHtmlAndEntities(item.content)
                                }}
                            </p>

                            <div data-aos="fade-up" data-aos-delay="100">
                                <NuxtLink
                                    :to="{
                                        name: 'berita-slug',
                                        params: { slug: item.slug },
                                    }"
                                    class="btn btn-primary-loop me-0 me-sm-2 mx-1"
                                    >Selengkapnya</NuxtLink
                                >
                            </div>
                        </div>
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
                posts: [],
            };
        },
        mounted() {
            this.fetchDataPosts();
        },
        methods: {
            async fetchDataPosts() {
                try {
                    const response = await fetchData("/posts");
                    this.posts = response.data;
                } catch (error) {
                    console.log(error);
                }
            },
            decodeEntities(str) {
                const txt = document.createElement("textarea");
                txt.innerHTML = str;
                return txt.value;
            },
            stripHtmlAndEntities(str) {
                // Hapus tag HTML
                let text = str.replace(/<[^>]*>?/gm, "");
                // Decode HTML entities
                text = this.decodeEntities(text);
                return text;
            },
        },
    };
</script>

<style></style>
