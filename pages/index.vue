<script setup lang="ts">
const { data: blogs } = await useAsyncData('recent-blogs', () =>
  queryContent('blogs').sort({ publishedAt: -1 }).limit(3).find()
)

const videos = ref([
  { id: '1', title: 'My First Video', coverImage: '/images/video/cover-1.jpg' }
])

const audios = ref([
  { id: '1', title: 'My First Podcast', coverImage: '/images/audio/cover-1.jpg' }
])
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative py-20 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          Welcome to My Blog
        </h1>
        <p class="text-xl text-gray-400 mb-8">
          Sharing thoughts, videos, and audio content
        </p>
      </div>
    </section>

    <!-- Recent Blogs -->
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 text-neon-blue">Latest Blogs</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="blog in blogs"
            :key="blog._path"
            :to="blog._path"
            class="bg-dark-surface rounded-lg overflow-hidden hover:ring-2 hover:ring-neon-blue transition-all"
          >
            <div class="h-48 bg-dark-border" />
            <div class="p-4">
              <h3 class="text-xl font-semibold mb-2">{{ blog.title }}</h3>
              <p class="text-gray-400 text-sm">{{ blog.description }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
