<template>
  <nav class="sticky top-0 z-50 bg-dark-surface/80 backdrop-blur-md border-b border-dark-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="text-xl font-bold text-neon-blue">
          Blog
        </NuxtLink>
        <div class="flex space-x-8">
          <NuxtLink
            to="/"
            class="text-gray-300 hover:text-neon-blue transition-colors"
            active-class="text-neon-blue"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/blogs"
            class="text-gray-300 hover:text-neon-blue transition-colors"
            active-class="text-neon-blue"
          >
            Blogs
          </NuxtLink>
          <NuxtLink
            to="/videos"
            class="text-gray-300 hover:text-neon-blue transition-colors"
            active-class="text-neon-blue"
          >
            Videos
          </NuxtLink>
          <NuxtLink
            to="/audios"
            class="text-gray-300 hover:text-neon-blue transition-colors"
            active-class="text-neon-blue"
          >
            Audios
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
