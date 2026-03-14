<script setup lang="ts">
const videos = [
  { id: '1', title: 'My First Video', description: 'Introduction', coverImage: '/images/video/cover-1.jpg', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8 text-neon-blue">Videos</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="video in videos" :key="video.id" class="bg-dark-surface rounded-lg overflow-hidden">
        <div class="aspect-video">
          <iframe :src="video.url" class="w-full h-full" frameborder="0" allowfullscreen />
        </div>
        <div class="p-4">
          <h3 class="text-xl font-semibold">{{ video.title }}</h3>
          <p class="text-gray-400 text-sm">{{ video.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
