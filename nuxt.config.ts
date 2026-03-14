export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  content: {
    highlight: {
      theme: 'github-dark'
    }
  },
  runtimeConfig: {
    aiApiKey: process.env.ANTHROPIC_API_KEY,
    ttsApiKey: process.env.ELEVENLABS_API_KEY,
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000'
    }
  },
  app: {
    head: {
      title: 'Personal Blog',
      meta: [
        { name: 'description', content: 'Personal blog with AI assistant' }
      ]
    }
  }
})
