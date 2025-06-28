<template>
    <div>
        <NuxtLink to="/dashboard/hero" class="flex items-center text-gray-900 hover:text-blue-800">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
        </NuxtLink>
        <div class="flex flex-row items-center justify-between">
            <div class="my-5 text-2xl font-bold">Edit Project</div>    
        </div>

        <form @submit.prevent="handlerSubmit" method="post">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                    <input type="text" v-model="form.name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Build Company" required />
                </div>
                <div>
                    <label for="tagline" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tagline</label>
                    <input v-model="form.tagline" type="text" id="tagline" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://youtube.com" />
                </div>
                <div>
                    <label for="thumbnail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thumbnail</label>
                    <input @change="handleFileUpload" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="thumbnail" type="file" accept="image/*">
                    <p v-if="form.fileName">File yang dipilih: {{ form.fileName }}</p>
                    <img v-if="form.imageUrl" :src="form.imageUrl" class="w-20 h-20" alt="Preview" />
                </div>  
                <p v-if="form.projectError" class="text-sm text-red-600">{{ form.projectError }}</p>
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
import { editData, uploadImage, fetchDataByID } from '~/utils/api'
import { useRoute, navigateTo } from 'nuxt/app'
import { useAuthStore } from '@/stores/auth'

definePageMeta({
  layout: 'admin',
  title: 'Admin Area | Edit Project',
  middleware: [auth]
})

const form = ref({
    name: '',
    fileName: '',
    imageUrl: '',
    tagline: '',
    projectError: ''
})

const file = ref(null)
const route = useRoute()

const handleFileUpload = (event) => {
  const selectedFile = event.target.files[0]
  if (selectedFile) {
    file.value = selectedFile
    form.value.fileName = selectedFile.name
    form.value.imageUrl = URL.createObjectURL(selectedFile)
  }
}

const getOurTeamByID = async() => {
    const id = route.params.id
    try {
        const dataHero = await fetchDataByID("/portofolio-sections/admin", id)
        form.value.name = dataHero.data.name
        form.value.imageUrl = dataHero.data.thumbnail
        form.value.tagline = dataHero.data.tagline
    } catch (error) {
        console.error('Error', error)
        form.value.projectError = error.message
    }
}

const handlerSubmit = async() => {
    const id = route.params.id
    try {
        let respImage = { data: { url: '' } }
        if (file.value != null) {
            respImage = await uploadImage('/upload-image', file.value)
            form.value.imageUrl = respImage.data.url
        }
        
        const requestData = {
            name: form.value.name,
            thumbnail: form.value.imageUrl,
            tagline: form.value.tagline,
        }
        
        await editData('/portofolio-sections/admin', requestData, id)
        const successMessage = 'Data berhasil diubah!'
        sessionStorage.setItem('successMessage', successMessage)
        navigateTo('/dashboard/portofolio/project')
    } catch(error) {
        console.error('Error', error)
        form.value.projectError = error.message
    }
}

onMounted(() => {
    getOurTeamByID()
})

</script>