<template>
    <div>
        <NuxtLink to="/dashboard/statistic" class="flex items-center text-gray-900 hover:text-blue-800">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
        </NuxtLink>
        <div class="flex flex-row items-center justify-between">
            <div class="my-5 text-2xl font-bold">Tambah Statistic</div>    
        </div>

        <form @submit.prevent="handlerSubmit" method="post">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <!-- Name Field -->
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" v-model="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Statistic Name" required />
                </div>

                <!-- Total Field -->
                <div>
                    <label for="total" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
                    <input type="number" v-model="total" id="total" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Total Value" required />
                </div>

                <!-- Icon Field -->
                <div>
                    <label for="icon" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Icon</label>
                    <input type="text" v-model="icon" id="icon" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Icon Class (e.g., 'bi bi-people')" required />
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Cari kode icon-nya di <a href="https://icons.getbootstrap.com/" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">Bootstrap Icons</a> dan tempelkan ke sini (contoh: <code>bi bi-people</code>).
                    </p>
                </div>
            </div>

            <p v-if="statisticError" class="text-sm text-red-600">{{ statisticError }}</p>

            <div class="flex justify-end">
                <button type="submit" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import auth from '~/stores/middleware/auth';
import { ref } from 'vue'
import { createData } from '~/utils/api'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  layout: 'admin',
  title: 'Admin Area | Create Statistic',
  middleware: [auth]
})

const name = ref('')
const total = ref('')
const icon = ref('')
const statisticError = ref('');
const router = useRouter()

const handlerSubmit = async() => {
    try {
        // Request data to create statistic
        const requestData = {
            name: name.value,
            total: total.value,
            icon: icon.value
        }
        
        // Send data to backend
        await createData('/statistics/admin', requestData)
        
        // Success message
        const successMessage = 'Data berhasil dibuat!'
        sessionStorage.setItem('successMessage', successMessage)

        // Redirect to the statistics dashboard page
        router.push('/dashboard/statistic')
    } catch (error) {
        console.error('Error', error)
        statisticError.value = error.message
    }
}
</script>
