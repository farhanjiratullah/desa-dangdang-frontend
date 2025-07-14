<template>
    <div class="dark:bg-gray-800">
        <aside
            id="logo-sidebar"
            class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-200 sm:translate-x-0 bg-white dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
        >
            <div
                class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800"
            >
                <ul class="space-y-2 font-medium dark:bg-gray-800">
                    <li class="dark:bg-gray-800">
                        <NuxtLink
                            to="/dashboard"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg
                                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 21"
                            >
                                <path
                                    d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
                                />
                                <path
                                    d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
                                />
                            </svg>
                            <span class="ms-3">Dashboard</span>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/dashboard/hero"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg
                                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"
                                />
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap"
                                >Slider</span
                            >
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/dashboard/statistic"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg
                                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <!-- Icon for statistics (graph) -->
                                <path
                                    d="M3 3v18h18V3H3zm2 2h14v14H5V5zm5 7h4v4h-4zm0 6h4v4h-4zm-6 0h4v4H5zm6-6h4v4h-4z"
                                />
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap"
                                >Statistic</span
                            >
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/dashboard/client"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg
                                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M18 6H6m12 4H6m12 4H6m12 4H6"
                                />
                            </svg>

                            <span class="flex-1 ms-3 whitespace-nowrap"
                                >Supported By</span
                            >
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/dashboard/appointment"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg
                                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"
                                />
                            </svg>

                            <span class="flex-1 ms-3 whitespace-nowrap"
                                >Pesan</span
                            >
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/dashboard/portofolio/testimoni"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg
                                class="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M6 5a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L15.249 6H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v-5a3 3 0 0 0-3-3h-3.22l-1.14-1.682A3 3 0 0 0 9.157 6H6V5Z"
                                    clip-rule="evenodd"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M3 9a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L12.249 10H3V9Zm0 3v7a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-7H3Z"
                                    clip-rule="evenodd"
                                />
                            </svg>

                            <span class="flex-1 ms-3 whitespace-nowrap"
                                >Testimoni</span
                            >
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/dashboard/our-team"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg
                                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-width="2"
                                    d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                                />
                            </svg>

                            <span class="flex-1 ms-3 whitespace-nowrap"
                                >SOTK</span
                            >
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/dashboard/post"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <!-- SVG Berita -->
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <g>
                                    <path
                                        d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 2 1.99 2h14c1.1 0 1.99-.9 1.99-2L21 5c0-1.1-.89-2-1.99-2zM12 16H8v-2h4v2zm0-4H8V9h4v3zm6 4h-4v-2h4v2zm0-4h-4V9h4v3z"
                                    />
                                </g>
                            </svg>

                            <span class="flex-1 ms-3 whitespace-nowrap"
                                >Berita</span
                            >
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/dashboard/profile"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <!-- SVG Berita -->
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <g>
                                    <circle
                                        cx="12"
                                        cy="8"
                                        r="4"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    />
                                    <path
                                        d="M12 14c-4 0-6 2-6 4v2h12v-2c0-2-2-4-6-4z"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    />
                                </g>
                            </svg>

                            <span class="flex-1 ms-3 whitespace-nowrap"
                                >Profile</span
                            >
                        </NuxtLink>
                    </li>
                    <li>
                        <button
                            @click="handleLogout"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg
                                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m17 16-4-4 4-4m-6 8-4-4 4-4"
                                />
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap"
                                >Sign Out</span
                            >
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    </div>
</template>
<script setup>
    import { useAuthStore } from "~/stores/auth";
    const authStore = useAuthStore();
    authStore.checkAuth();

    const handleLogout = () => {
        authStore.logout();
        navigateTo("/");
    };
</script>
