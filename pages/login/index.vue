<template>
    <div>
        <div class="w-screen h-screen">
            <section class="bg-gray-50 dark:bg-gray-900">
                <div
                    class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
                >
                    <a
                        href="/pages/login/index.vue"
                        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                    >
                        <img
                            class="w-8 h-8 mr-2"
                            src="assets/img/supported-by/desa-dangdang.png"
                            alt="logo"
                        />
                        Desa Dangdang
                    </a>
                    <div
                        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
                    >
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1
                                class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                            >
                                Sign in to your account
                            </h1>
                            <form
                                class="space-y-4 md:space-y-6"
                                @submit.prevent="handleLogin"
                                method="post"
                            >
                                <div>
                                    <label
                                        for="email"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >Your email</label
                                    >
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        v-model="email"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        for="password"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >Password</label
                                    >
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        v-model="password"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Sign in
                                </button>
                                <p
                                    v-if="loginError"
                                    class="text-sm text-red-600"
                                >
                                    {{ loginError }}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { navigateTo } from "#app";
    import { useAuthStore } from "@/stores/auth";
    import { initFlowbite } from "flowbite";

    // initialize components based on data attribute selectors
    onMounted(() => {
        initFlowbite();
    });

    definePageMeta({
        layout: "auth",
    });

    const authStore = useAuthStore();
    const email = ref("");
    const password = ref("");
    const loginError = ref("");

    const handleLogin = async () => {
        try {
            await authStore.login({
                email: email.value,
                password: password.value,
            });
            navigateTo("/dashboard");
        } catch (error) {
            loginError.value = "Email atau password salah!";
        }
    };
</script>
