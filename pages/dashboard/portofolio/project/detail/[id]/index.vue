<template>
    <div>
        <NuxtLink to="/dashboard/portofolio/project" class="flex items-center text-gray-900 hover:text-blue-800">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
        </NuxtLink>
        <div class="flex flex-row items-center justify-between">
            <div class="my-5 text-2xl font-bold">Edit Project Detail</div>    
        </div>

        <form @submit.prevent="handlerSubmit" method="post">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul Project</label>
                    <input v-model="form.title" type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>
                <div>
                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori</label>
                    <input type="text" v-model="form.category" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="website" required />
                </div>
                <div>
                    <label for="client_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Klien</label>
                    <input v-model="form.client_name" type="text" id="client_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sedayu" required />
                </div>
                <div>
                    <label for="project_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Project</label>
                    <input v-model="form.project_date" type="date" id="project_date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div>
                    <label for="project_url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL Project</label>
                    <input v-model="form.project_url" type="text" id="project_url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sedayu"/>
                </div>
                <div>
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
                    <textarea id="description" v-model="form.description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                </div>
                <p v-if="form.projectError" class="text-sm text-red-600">{{ form.projectError }}</p>
            </div>
            <div class="flex justify-end">
                <button v-if="detailId" type="button" @click="openDeleteModal(detailId)" class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" data-modal-target="popup-modal">Remove</button>
                <button type="submit" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
            </div>
        </form>

        <!-- Delete Modal -->
        <div id="popup-modal" tabindex="-1" class="hidden fixed overflow-y-auto overflow-x-hidden fix top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full left-1/3 top-1/4 right-2/3 max-w-md max-h-full">
                <div class="relative bg-amber-200 rounded-lg shadow dark:bg-gray-700">
                    <button @click="closeDeleteModal" type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-4 md:p-5 text-center">
                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Yakin ingin menghapus data ini?</h3>
                        <button @click="deleteDetail" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Yes, I'm sure
                        </button>
                        <button @click="closeDeleteModal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import auth from '~/stores/middleware/auth';
import { ref, onMounted } from 'vue'
import { editData, createData, fetchDataByID } from '~/utils/api'
import { useRoute, navigateTo } from 'nuxt/app'
import { useAuthStore } from '@/stores/auth'

definePageMeta({
  layout: 'admin',
  title: 'Admin Area | Edit Project Detail',
  middleware: [auth]
})

const form = ref({
    title: '',
    category: '',
    client_name: '',
    project_url: '',
    project_date: '',
    description: '',
    projectError: ''
})
let detailId = 0;
const route = useRoute()

const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
}

const openDeleteModal = (id) => {
    const modal = document.getElementById('popup-modal')
    if (modal) {
        modal.classList.remove('hidden')
    }
}

const closeDeleteModal = () => {
  const modal = document.getElementById('popup-modal')
  if (modal) {
    modal.classList.add('hidden')
  }
}

const deleteDetail = async() => {
  if (detailId != 0) {
    try {
        await deleteData('/portofolio-details/admin', detailId)
        const successMessage = 'Data berhasil dihapus!'
        sessionStorage.setItem('successMessage', successMessage)

        navigateTo('/dashboard/portofolio/project')
    } catch (error) {
        console.error('Gagal menghapus data:', error)
    }
    
    closeDeleteModal()
  }
}

const getOurTeamByID = async() => {
    const id = route.params.id
    try {
        const dataHero = await fetchDataByID("/portofolio-details", id)
        form.value.client_name = dataHero.data.client_name
        form.value.title = dataHero.data.title
        form.value.description = dataHero.data.description
        form.value.project_date = formatDate(dataHero.data.project_date)
        form.value.project_url = dataHero.data.project_url
        form.value.category = dataHero.data.category
        detailId = dataHero.data.id
    } catch (error) {
        console.error('Error', error)
        form.value.projectError = error.message
    }
}

const handlerSubmit = async() => {
    const id = route.params.id
    try {
        const requestData = {
            category: form.value.category,
            client_name: form.value.client_name,
            title: form.value.title,
            project_date: form.value.project_date,
            project_url: form.value.project_url,
            description: form.value.description,
            portofolio_section_id: parseInt(id),
        }

        if (detailId !== 0) {
            await editData('/portofolio-details/admin', requestData, detailId)
            const successMessage = 'Data berhasil diubah!'
            sessionStorage.setItem('successMessage', successMessage)
        } else {
            await createData('/portofolio-details/admin', requestData)
            const successMessage = 'Data berhasil dotambah!'
            sessionStorage.setItem('successMessage', successMessage)
        }

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