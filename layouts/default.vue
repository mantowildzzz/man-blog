<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <main class="flex-1">
      <slot />
    </main>
    <ClientOnly>
      <AiAssistant
        v-if="showAiAssistant"
        vrm-url="/models/avatar.vrm"
        fallback-image="/images/ai-assistant.png"
      />
    </ClientOnly>
    <footer class="py-8 text-center text-gray-500 text-sm border-t border-dark-border">
      © {{ new Date().getFullYear() }} Personal Blog. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
const showAiAssistant = ref(true)
</script>
