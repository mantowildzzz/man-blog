<script setup lang="ts">
const { path } = useRoute()
const { data: blog } = await useAsyncData(`blog-${path}`, () =>
  queryContent(path as string).findOne()
)
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <NuxtLink to="/blogs" class="text-neon-blue hover:underline mb-8 inline-block">
      ← Back to Blogs
    </NuxtLink>
    <article v-if="blog" class="prose prose-invert max-w-none">
      <h1 class="text-4xl font-bold mb-4">{{ blog.title }}</h1>
      <p class="text-gray-400 mb-8">{{ blog.publishedAt }}</p>
      <ContentRenderer :value="blog" />
    </article>
  </div>
</template>

<style>
.prose h1, .prose h2, .prose h3 {
  color: #00d4ff;
}
.prose a {
  color: #8b5cf6;
}
.prose code {
  background: #1e1e2e;
  padding: 0.2em 0.4em;
  border-radius: 4px;
}
</style>
