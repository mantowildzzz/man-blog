<script setup lang="ts">
const props = defineProps<{
  isOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const internalIsOpen = ref(false)
const isChatOpen = computed(() => props.isOpen ?? internalIsOpen.value)
const messages = ref<Array<{role: string, content: string}>>([])
const input = ref('')
const loading = ref(false)
const enableVoice = ref(false)
const currentAudio = ref<HTMLAudioElement | null>(null)

const sendMessage = async () => {
  if (!input.value.trim() || loading.value) return

  const userMessage = input.value.trim()
  input.value = ''

  messages.value.push({ role: 'user', content: userMessage })
  loading.value = true

  try {
    const { data } = await useFetch('/api/chat', {
      method: 'POST',
      body: {
        message: userMessage,
        history: messages.value.slice(-10)
      }
    })

    if (data.value?.reply) {
      messages.value.push({ role: 'assistant', content: data.value.reply })
      if (enableVoice.value) {
        playVoice(data.value.reply)
      }
    }
  } catch (error) {
    messages.value.push({ role: 'assistant', content: 'Sorry, I\'m having trouble responding right now. Please try again.' })
  } finally {
    loading.value = false
  }
}

const playVoice = async (text: string) => {
  if (!enableVoice.value) return

  try {
    const { data } = await useFetch('/api/tts', {
      method: 'POST',
      body: { text }
    })

    if (data.value?.audio) {
      if (currentAudio.value) {
        currentAudio.value.pause()
      }
      currentAudio.value = new Audio(data.value.audio)
      currentAudio.value.play()
    }
  } catch (error) {
    console.error('TTS error:', error)
  }
}

const toggleChat = () => {
  if (props.isOpen !== undefined) {
    emit('close')
  } else {
    internalIsOpen.value = !internalIsOpen.value
  }
}
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <div
      v-if="isChatOpen"
      class="bg-dark-surface border border-dark-border rounded-lg shadow-xl w-80 h-96 mb-4 flex flex-col"
    >
      <div class="p-4 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-semibold text-neon-blue">AI Assistant</h3>
        <div class="flex items-center gap-2">
          <button
            @click="enableVoice = !enableVoice"
            :class="['text-sm', enableVoice ? 'text-neon-pink' : 'text-gray-400']"
            title="Toggle voice"
          >
            🔊
          </button>
          <button @click="toggleChat" class="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          :class="['p-3 rounded-lg', msg.role === 'user' ? 'bg-neon-blue/20 ml-8' : 'bg-dark-border mr-8']"
        >
          {{ msg.content }}
        </div>
        <div v-if="loading" class="text-gray-400 text-sm">Thinking...</div>
      </div>

      <div class="p-4 border-t border-dark-border">
        <form @submit.prevent="sendMessage" class="flex gap-2">
          <input
            v-model="input"
            type="text"
            placeholder="Ask me anything..."
            class="flex-1 bg-dark-bg border border-dark-border rounded px-3 py-2 text-sm focus:outline-none focus:border-neon-blue"
          >
          <button
            type="submit"
            :disabled="loading"
            class="bg-neon-blue text-dark-bg px-4 py-2 rounded text-sm font-semibold hover:bg-neon-blue/80 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>

    <button
      v-if="!isChatOpen"
      @click="toggleChat"
      class="w-14 h-14 bg-neon-blue rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform"
    >
      💬
    </button>
  </div>
</template>
