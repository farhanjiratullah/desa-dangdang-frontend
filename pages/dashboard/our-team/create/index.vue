<template>
    <div>
        <NuxtLink
            to="/dashboard/our-team"
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
            <div class="my-5 text-2xl font-bold">Tambah SOTK</div>
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
                        placeholder="Steven"
                        required
                    />
                </div>
                <div>
                    <label
                        for="role"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Jabatan</label
                    >
                    <input
                        type="text"
                        v-model="role"
                        id="role"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Software Engineer"
                        required
                    />
                </div>
                <div>
                    <label
                        for="photo"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Foto</label
                    >
                    <input
                        @change="handleFileUpload"
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="banner"
                        type="file"
                        accept="image/*"
                        required
                    />
                    <p v-if="fileName">File yang dipilih: {{ fileName }}</p>
                    <img
                        v-if="imageUrl"
                        :src="imageUrl"
                        class="w-20 h-20"
                        alt="Preview"
                    />
                </div>
                <p v-if="ourTeamError" class="text-sm text-red-600">
                    {{ heroourTeamErrorError }}
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
        title: "Admin Area | Create Our Team",
        middleware: [auth],
    });

    const name = ref("");
    const role = ref("");
    const file = ref(null);
    const fileName = ref("");
    const imageUrl = ref("");
    const tagline = ref("");
    const ourTeamError = ref("");

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            file.value = selectedFile;
            fileName.value = selectedFile.name;
            imageUrl.value = URL.createObjectURL(selectedFile);
        }
    };

    const handlerSubmit = async () => {
        try {
            const respImage = await uploadImage("/upload-image", file.value);

            const requestData = {
                name: name.value,
                role: role.value,
                path_photo: respImage.data.url,
                tagline: tagline.value,
            };

            await createData("/our-teams/admin", requestData);
            const successMessage = "Data berhasil dibuat!";
            sessionStorage.setItem("successMessage", successMessage);

            navigateTo("/dashboard/our-team");
        } catch (error) {
            console.error("Error", error);
            heroError.value = error.message;
        }
    };
</script>
