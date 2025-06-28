<template>
    <div>
        <NuxtLink to="/dashboard/faq" class="flex items-center text-gray-900 hover:text-blue-800">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
        </NuxtLink>
        <div class="flex flex-row items-center justify-between">
            <div class="my-5 text-2xl font-bold">Tambah FAQ</div>    
        </div>

        <form @submit.prevent="handlerSubmit" method="post">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul</label>
                    <input type="text" v-model="form.title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Apa itu Web?" required />
                </div>
                <div>
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
                    <textarea id="description" v-model="form.description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                </div>
                <p v-if="form.faqError" class="text-sm text-red-600">{{ form.faqError }}</p>
            </div>
            <div class="flex justify-end">
                <button type="submit" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import auth from '~/stores/middleware/auth';
import { ref, onMounted } from 'vue'
import { editData } from '~/utils/api'
import { useRoute} from 'nuxt/app'

definePageMeta({
  layout: 'admin',
  title: 'Admin Area | Edit Faq Section',
  middleware: [auth]
})


const form = ref({
    title: '',
    description: '',
    faqError: ''
})

const route = useRoute()

const getFaqSectionByID = async() => {
    const id = route.params.id
    try {
        const dataHero = await fetchDataByID("/faq-sections/admin", id)
        form.value.description = dataHero.data.description
        form.value.title = dataHero.data.title
    } catch (error) {
        console.error('Error', error)
        form.value.faqError = error.message
    }
}

onMounted(() => {
    getFaqSectionByID()
})

const handlerSubmit = async() => {
    const id = route.params.id
    try {
        const requestData = {
            description: form.value.description,
            title: form.value.title,
        }
        
        await editData('/faq-sections/admin', requestData, id)
        const successMessage = 'Data berhasil diedit!'
        sessionStorage.setItem('successMessage', successMessage)

        navigateTo('/dashboard/faq')
    } catch(error) {
        console.error('Error', error)
        form.value.faqError = error.message
    }
}

</script>