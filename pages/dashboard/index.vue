<script setup>
import auth from '~/stores/middleware/auth';


definePageMeta({
  layout: 'admin',
  middleware: [auth],
  title: 'Admin Area'
})
</script>
<template>
    <div class="dark:bg-gray-800 dark:text-gray-300 h-full">
       Dashboard
    </div>
</template>