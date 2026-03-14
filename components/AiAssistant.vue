<script setup lang="ts">
import ThreeVrm from './ThreeVrm.vue'
import ChatWindow from './ChatWindow.vue'

const props = defineProps<{
  vrmUrl: string
  fallbackImage?: string
}>()

const chatRef = ref<InstanceType<typeof ChatWindow>>()
const isChatOpen = ref(false)

const handleAvatarClick = () => {
  isChatOpen.value = true
}

const closeChat = () => {
  isChatOpen.value = false
}
</script>

<template>
  <div class="ai-assistant-wrapper">
    <div class="fixed z-40" style="top: 20%; left: 10%;">
      <ThreeVrm
        :model-url="vrmUrl"
        :fallback-image="fallbackImage"
        @click="handleAvatarClick"
      />
    </div>

    <ChatWindow
      ref="chatRef"
      :is-open="isChatOpen"
      @close="closeChat"
    />
  </div>
</template>
