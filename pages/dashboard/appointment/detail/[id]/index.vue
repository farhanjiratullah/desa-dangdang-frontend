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
        <div
            class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10"
        >
            <table
                class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
                <tbody>
                    <tr>
                        <td class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Nama
                        </td>
                        <td>:</td>
                        <td>{{ form.name }}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Email
                        </td>
                        <td>:</td>
                        <td>{{ form.email }}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Nomor Telepon
                        </td>
                        <td>:</td>
                        <td>{{ form.phone_number }}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Brief
                        </td>
                        <td>:</td>
                        <td>{{ form.brief }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted } from "vue";
    import auth from "~/stores/middleware/auth";
    import { useRoute } from "nuxt/app";

    definePageMeta({
        layout: "admin",
        title: "Admin Area | Detail Appointment",
        middleware: [auth],
    });

    const form = ref({
        brief: "",
        name: "",
        phone_number: "",
        email: "",
        budget: "",
        meet_at: "",
        service_name: "",
        aboutCompanyError: "",
    });

    const route = useRoute();

    const getAboutCompanyByID = async () => {
        const id = route.params.id;
        try {
            const dataHero = await fetchDataByID("/appointments/admin", id);
            form.value.brief = dataHero.data.brief;
            form.value.name = dataHero.data.name;
            form.value.phone_number = dataHero.data.phone_number;
            form.value.email = dataHero.data.email;
            form.value.budget = dataHero.data.budget;
            form.value.service_name = dataHero.data.service_name;
            form.value.meet_at = dataHero.data.meet_at;
        } catch (error) {
            console.error("Error", error);
            form.value.aboutCompanyError = error.message;
        }
    };

    const formatter = (number) => {
        const formatterMoney = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        });

        return formatterMoney.format(number);
    };

    onMounted(() => {
        getAboutCompanyByID();
    });
</script>
