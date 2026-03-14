<script setup lang="ts">
const audios = [
  { id: '1', title: 'My First Podcast', description: 'First episode', coverImage: '/images/audio/cover-1.jpg', url: '/audio/podcast-1.mp3', duration: '30:00' }
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8 text-neon-blue">Audios</h1>
    <div class="space-y-4">
      <div v-for="audio in audios" :key="audio.id" class="bg-dark-surface rounded-lg p-4 flex items-center gap-4">
        <div class="w-20 h-20 bg-dark-border rounded-lg flex-shrink-0" />
        <div class="flex-1">
          <h3 class="text-xl font-semibold">{{ audio.title }}</h3>
          <p class="text-gray-400 text-sm">{{ audio.description }}</p>
          <span class="text-neon-purple text-sm">{{ audio.duration }}</span>
        </div>
        <audio controls class="h-10">
          <source :src="audio.url" type="audio/mpeg">
        </audio>
      </div>
    </div>
  </div>
</template>
