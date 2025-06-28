<template>
    <div>
        <NuxtLink to="/dashboard/statistic" class="flex items-center text-gray-900 hover:text-blue-800">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
        </NuxtLink>
        <div class="flex flex-row items-center justify-between">
            <div class="my-5 text-2xl font-bold">Edit Statistic</div>    
        </div>

        <form @submit.prevent="handlerSubmit" method="post">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <!-- Name Field -->
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" v-model="form.name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Statistic Name" required />
                </div>

                <!-- Total Field -->
                <div>
                    <label for="total" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
                    <input type="number" v-model="form.total" id="total" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Total Value" required />
                </div>

                <!-- Icon Field -->
                <div>
                    <label for="icon" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Icon</label>
                    <input type="text" v-model="form.icon" id="icon" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Icon Class (e.g., 'bi bi-people')" required />
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Cari kode icon-nya di <a href="https://icons.getbootstrap.com/" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">Bootstrap Icons</a> dan tempelkan ke sini (contoh: <code>bi bi-people</code>).
                    </p>
                </div>
            </div>

            <p v-if="form.statisticError" class="text-sm text-red-600">{{ form.statisticError }}</p>

            <div class="flex justify-end">
                <button type="submit" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import auth from '~/stores/middleware/auth';
import { ref, onMounted } from 'vue'
import { fetchDataByID, editData } from '~/utils/api'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

definePageMeta({
  layout: 'admin',
  title: 'Admin Area | Edit Statistic',
  middleware: [auth]
})

const form = ref({
    name: '',
    total: '',
    icon: '',
    statisticError: ''
})

const route = useRoute()
const router = useRouter()

// Function to fetch the statistic data by ID
const getStatisticByID = async() => {
    const id = route.params.id
    try {
        const dataStatistic = await fetchDataByID("/statistics/admin", id)
        form.value.name = dataStatistic.data.name
        form.value.total = dataStatistic.data.total
        form.value.icon = dataStatistic.data.icon
    } catch (error) {
        console.error('Error', error)
        form.value.statisticError = error.message
    }
}

// Function to handle form submission
const handlerSubmit = async() => {
    const id = route.params.id
    try {
        const requestData = {
            name: form.value.name,
            total: form.value.total,
            icon: form.value.icon
        }
        
        // Send data to backend to update
        await editData('/statistics/admin', requestData, id)
        
        const successMessage = 'Data berhasil diubah!'
        sessionStorage.setItem('successMessage', successMessage)
        
        // Redirect to the statistics dashboard page
        router.push('/dashboard/statistic')
    } catch(error) {
        console.error('Error', error)
        form.value.statisticError = error.message
    }
}

onMounted(() => {
    getStatisticByID()
})
</script>
