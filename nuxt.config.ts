// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        public: {
            apiBase:
                process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8000",
            ckeditorLicenseKey: process.env.NUXT_PUBLIC_CKEDITOR_LICENSE_KEY,
        },
    },
    compatibilityDate: "2024-11-01",
    image: {
        dir: "assets/img",
    },
    modules: ["@nuxt/image", "@pinia/nuxt"],
    css: [
        "bootstrap/dist/css/bootstrap.min.css",
        "bootstrap-icons/font/bootstrap-icons.css",
        "aos/dist/aos.css",
        "swiper/swiper-bundle.css",
        "~/assets/css/main-default.css",
        "~/assets/css/main.css",
    ],
    devtools: { enabled: true },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    plugins: [
        // {src: '~/plugins/main.client.ts', mode: 'client'},
        // { src: '~/plugins/aos.client.js', mode: 'client' },
        { src: "~/plugins/bootstrap.client.ts", mode: "client" },
    ],
    app: {
        head: {
            link: [
                { rel: "preconnect", href: "https://fonts.googleapis.com" },
                { rel: "preconnect", href: "https://fonts.gstatic.com" },
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
                },
            ],
        },
    },
});
