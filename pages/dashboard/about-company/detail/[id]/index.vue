<template>
    <div>
        <NuxtLink to="/dashboard/about-company" class="flex items-center text-gray-900 hover:text-blue-800">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
        </NuxtLink>
        <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10">
            <p class="mb-3 text-gray-500 dark:text-gray-400">{{ form.description ?? aboutCompanyError }}</p>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import auth from '~/stores/middleware/auth';
import { useRoute} from 'nuxt/app'

definePageMeta({
    layout: 'admin',
    title: 'Admin Area | Detail About Company',
    middleware: [auth]
})

const form = ref({
    description: '',
    aboutCompanyError: ''
})

const route = useRoute()

const getAboutCompanyByID = async() => {
    const id = route.params.id
    try {
        const dataHero = await fetchDataByID("/about-companies/admin", id)
        form.value.description = dataHero.data.description
    } catch (error) {
        console.error('Error', error)
        form.value.aboutCompanyError = error.message
    }
}

onMounted(() => {
    getAboutCompanyByID()
})

</script>