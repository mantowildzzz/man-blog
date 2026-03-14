<script setup lang="ts">
const { data: blogs } = await useAsyncData('blogs', () =>
  queryContent('blogs').sort({ publishedAt: -1 }).find()
)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8 text-neon-blue">Blogs</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="blog in blogs"
        :key="blog._path"
        :to="blog._path"
        class="bg-dark-surface rounded-lg overflow-hidden hover:ring-2 hover:ring-neon-blue transition-all"
      >
        <div class="h-48 bg-dark-border" />
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">{{ blog.title }}</h3>
          <p class="text-gray-400 text-sm mb-2">{{ blog.description }}</p>
          <span class="text-neon-purple text-sm">{{ blog.publishedAt }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
