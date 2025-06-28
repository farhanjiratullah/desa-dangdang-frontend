<template>
    <div>
        <NuxtLink
            to="/dashboard/appointment"
            class="flex items-center text-gray-900 hover:text-blue-800"
        >
            <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                ></path>
            </svg>
            Back
        </NuxtLink>
        <div class="flex flex-row items-center justify-between">
            <div class="my-5 text-2xl font-bold">Tambah Appointment</div>
        </div>

        <form @submit.prevent="handlerSubmit" method="post">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Nama</label
                    >
                    <input
                        type="text"
                        v-model="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Apa itu Web?"
                        required
                    />
                </div>
                <div>
                    <label
                        for="phone_number"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Nomor Telepon</label
                    >
                    <input
                        type="tel"
                        v-model="phone_number"
                        id="phone_number"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Apa itu Web?"
                        required
                    />
                </div>
                <div>
                    <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >E-mail</label
                    >
                    <input
                        type="email"
                        v-model="email"
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Apa itu Web?"
                        required
                    />
                </div>
                <div>
                    <label
                        for="brief"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Brief</label
                    >
                    <textarea
                        id="brief"
                        v-model="brief"
                        rows="4"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                    ></textarea>
                </div>
                <p v-if="faqError" class="text-sm text-red-600">
                    {{ faqError }}
                </p>
            </div>
            <div class="flex justify-end">
                <button
                    type="submit"
                    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import auth from "~/stores/middleware/auth";
    import { ref, onMounted } from "vue";
    import { createData, uploadImage } from "~/utils/api";

    definePageMeta({
        layout: "admin",
        title: "Admin Area | Create Faq Section",
        middleware: [auth],
    });

    const brief = ref("");
    const name = ref("");
    const meet_at = ref("2025-06-28");
    const phone_number = ref("");
    const email = ref("");
    const budget = ref("1");
    const faqError = ref("");
    const service_id = ref(1);

    const handlerSubmit = async () => {
        try {
            const requestData = {
                brief: brief.value,
                name: name.value,
                meet_at: meet_at.value,
                phone_number: phone_number.value,
                email: email.value,
                budget: Number(budget.value),
                service_id: service_id.value,
            };

            await createData("/appointments", requestData);
            const successMessage = "Data berhasil dibuat!";
            sessionStorage.setItem("successMessage", successMessage);

            navigateTo("/dashboard/appointment");
        } catch (error) {
            console.error("Error", error);
            faqError.value = error.message;
        }
    };
</script>
