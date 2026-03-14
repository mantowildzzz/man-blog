# 个人博客 + 3D AI 助手实现计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 搭建一个支持博客/视频/音频的个人博客网站，并配备可交互的 3D AI 虚拟助手

**Architecture:** Nuxt 3 全栈方案，前端使用 Vue 3 + Tailwind CSS，3D 使用 Three.js + VRM，AI 对话使用 Claude/OpenAI API，语音使用 ElevenLabs/Azure TTS

**Tech Stack:** Nuxt 3, Vue 3, Tailwind CSS, Three.js, @pixiv/three-vrm, Claude API, ElevenLabs

---

## Chunk 1: 项目初始化与基础框架

### Task 1.1: 初始化 Nuxt 3 项目

**Files:**
- Create: `package.json`
- Create: `nuxt.config.ts`
- Create: `tailwind.config.js`
- Create: `app.vue`
- Create: `tsconfig.json`
- Create: `.gitignore`

**VRM 模型说明：**
> 项目需要 VRM 格式的 3D 模型文件。请将模型文件放置在 `public/models/` 目录下，命名为 `avatar.vrm`。可以使用以下资源获取示例模型：
> - VRoid Hub: https://hub.vroid.com/
> - 示例模型: https://github.com/pixiv/three-vrm/tree/master/packages/three-vrm/examples/models

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "personal-blog-3d-ai",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "dependencies": {
    "nuxt": "^3.14.0",
    "vue": "^3.5.0",
    "@nuxt/content": "^2.13.0",
    "three": "^0.169.0",
    "@pixiv/three-vrm": "^2.0.0"
  },
  "devDependencies": {
    "@nuxtjs/tailwindcss": "^6.12.0",
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "extends": "./.nuxt/tsconfig.json"
}
```

- [ ] **Step 3: 创建 .gitignore**

```
# Dependencies
node_modules/

# Build
.nuxt/
.output/
dist/

# IDE
.vscode/
.idea/

# Env
.env
.env.*
!.env.example

# Logs
*.log

# OS
.DS_Store
Thumbs.db
```

- [ ] **Step 4: 创建 nuxt.config.ts**

```typescript
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
```

- [ ] **Step 5: 创建 tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0f',
          surface: '#121218',
          border: '#1e1e2e'
        },
        neon: {
          blue: '#00d4ff',
          purple: '#8b5cf6',
          pink: '#ff00aa'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
```

- [ ] **Step 4: 创建 app.vue**

```vue
<template>
  <div class="min-h-screen bg-dark-bg text-white">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
body {
  font-family: 'Inter', system-ui, sans-serif;
}
</style>
```

- [ ] **Step 5: Commit**

---

### Task 1.2: 创建布局和导航组件

**Files:**
- Create: `layouts/default.vue`
- Create: `components/NavBar.vue`

- [ ] **Step 1: 创建 default layout**

```vue
<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <main class="flex-1">
      <slot />
    </main>
    <footer class="py-8 text-center text-gray-500 text-sm border-t border-dark-border">
      © {{ new Date().getFullYear() }} Personal Blog. All rights reserved.
    </footer>
  </div>
</template>
```

- [ ] **Step 2: 创建 NavBar 组件**

```vue
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
```

- [ ] **Step 3: Commit**

---

## Chunk 2: 内容管理系统

### Task 2.1: 创建内容目录和示例数据

**Files:**
- Create: `content/blogs/hello-world.md`
- Create: `content/videos.json`
- Create: `content/audios.json`

- [ ] **Step 1: 创建示例博客文章**

```markdown
---
title: "Welcome to My Blog"
description: "This is my first blog post"
coverImage: "/images/blog/cover-1.jpg"
publishedAt: "2026-03-15"
tags: ["intro", "welcome"]
---

# Welcome

This is my first blog post on my personal blog with AI assistant.

## Features

- Blog posts
- Videos
- Audio content
- Interactive AI assistant
```

- [ ] **Step 2: 创建视频数据**

```json
[
  {
    "id": "1",
    "title": "My First Video",
    "description": "Introduction video",
    "coverImage": "/images/video/cover-1.jpg",
    "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "publishedAt": "2026-03-10"
  }
]
```

- [ ] **Step 3: 创建音频数据**

```json
[
  {
    "id": "1",
    "title": "My First Podcast",
    "description": "First episode",
    "coverImage": "/images/audio/cover-1.jpg",
    "url": "/audio/podcast-1.mp3",
    "duration": "30:00",
    "publishedAt": "2026-03-05"
  }
]
```

- [ ] **Step 4: Commit**

---

### Task 2.2: 创建内容展示页面

**Files:**
- Create: `pages/index.vue`
- Create: `pages/blogs/index.vue`
- Create: `pages/videos/index.vue`
- Create: `pages/audios/index.vue`
- Create: `pages/blogs/[...slug].vue`

- [ ] **Step 1: 创建首页**

```vue
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
```

- [ ] **Step 2: 创建博客列表页**

```vue
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
```

- [ ] **Step 3: 创建博客详情页**

```vue
<script setup lang="ts">
const { path } = useRoute()
const { data: blog } = await useAsyncData(`blog-${path}`, () =>
  queryContent(path).findOne()
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
```

- [ ] **Step 4: 创建视频列表页**

```vue
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
```

- [ ] **Step 5: 创建音频列表页**

```vue
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
```

- [ ] **Step 6: Commit**

---

## Chunk 3: 3D 虚拟人物基础

### Task 3.1: 创建 VRM 加载和渲染组件

**Files:**
- Create: `components/ThreeVrm.vue`
- Create: `composables/useVrm.ts`

- [ ] **Step 1: 创建 VRM composable**

```typescript
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VRMLoaderPlugin, VRMHumanBoneName, VRMExpressionPresetName } from '@pixiv/three-vrm'

export function useVrm() {
  const scene = ref<THREE.Scene | null>(null)
  const vrm = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadVrm = async (url: string) => {
    loading.value = true
    error.value = null

    try {
      const loader = new GLTFLoader()
      loader.register((parser) => new VRMLoaderPlugin(parser))

      const gltf = await new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject)
      })

      vrm.value = gltf.userData.vrm

      if (vrm.value) {
        scene.value = gltf.scene

        // Enable automatic expressions
        vrm.value.expressionManager?.setValue(VRMExpressionPresetName.Neutral, 1)
      }

      return vrm.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load VRM'
      console.error('VRM load error:', e)
      return null
    } finally {
      loading.value = false
    }
  }

  const playAnimation = async (name: string) => {
    if (!vrm.value?.humanoid) return

    // Animation playback logic will be added in Task 4
  }

  const setExpression = (preset: string, value: number) => {
    if (!vrm.value?.expressionManager) return
    vrm.value.expressionManager.setValue(preset, value)
  }

  return {
    scene,
    vrm,
    loading,
    error,
    loadVrm,
    playAnimation,
    setExpression
  }
}
```

- [ ] **Step 2: 创建设备检测 composable**

```typescript
// composables/useDevice.ts
export function useDevice() {
  const isMobile = ref(false)

  const checkDevice = () => {
    isMobile.value = window.innerWidth < 768
  }

  onMounted(() => {
    checkDevice()
    window.addEventListener('resize', checkDevice)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkDevice)
  })

  return { isMobile }
}
```

- [ ] **Step 3: 创建 ThreeVrm 组件（支持移动端降级 + 点击对话）**

```vue
<script setup lang="ts">
import * as THREE from 'three'
import { useVrm } from '~/composables/useVrm'
import { useDevice } from '~/composables/useDevice'

const props = defineProps<{
  modelUrl: string
  fallbackImage?: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const containerRef = ref<HTMLDivElement>()
const { vrm, loading, error, loadVrm, setExpression } = useVrm()
const { isMobile } = useDevice()
let renderer: THREE.WebGLRenderer | null = null
let animationId: number | null = null

// Use fallback image on mobile
const useFallback = computed(() => isMobile.value && props.fallbackImage)

const init = async () => {
  if (!containerRef.value) return

  // Skip 3D on mobile, use fallback image
  if (useFallback.value) return

  // Scene setup
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0a0f)

  // Camera
  const camera = new THREE.PerspectiveCamera(45, containerRef.value.clientWidth / containerRef.value.clientHeight, 0.1, 100)
  camera.position.set(0, 1, 2)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  containerRef.value.appendChild(renderer.domElement)

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(0, 2, 1)
  scene.add(directionalLight)

  // Load VRM (delayed by 3 seconds for better UX)
  setTimeout(async () => {
    const loadedVrm = await loadVrm(props.modelUrl)
    if (loadedVrm) {
      scene.add(loadedVrm.scene)
    }

    // Animation loop
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      if (loadedVrm) {
        loadedVrm.update(0.016)
      }

      renderer?.render(scene, camera)
    }
    animate()
  }, 3000)
}

const handleClick = () => {
  emit('click')
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  renderer?.dispose()
})

defineExpose({ setExpression })
</script>

<template>
  <div
    ref="containerRef"
    class="w-full h-full relative cursor-pointer"
    @click="handleClick"
  >
    <!-- Mobile fallback: static image -->
    <div v-if="useFallback" class="w-full h-full flex items-center justify-center">
      <img :src="fallbackImage" alt="AI Assistant" class="max-w-full max-h-full object-contain" />
    </div>

    <!-- 3D canvas -->
    <div v-else>
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-dark-bg">
        <span class="text-neon-blue">Loading 3D Model...</span>
      </div>
      <div v-if="error" class="absolute inset-0 flex items-center justify-center bg-dark-bg">
        <span class="text-red-500">{{ error }}</span>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 4: Commit**

---

## Chunk 4: 随机走动行为

### Task 4.1: 实现随机移动逻辑

**Files:**
- Modify: `composables/useVrm.ts`
- Modify: `components/ThreeVrm.vue`

- [ ] **Step 1: 添加随机移动功能到 useVrm**

```typescript
// Add to useVrm composable
import { Vector3 } from 'three'

export function useVrm() {
  // ... existing code ...

  const randomPosition = ref({ x: 0, y: 0 })
  const isMoving = ref(false)

  const calculateRandomPosition = (containerWidth: number, containerHeight: number) => {
    const padding = 200 // Keep within bounds
    const x = (Math.random() * (containerWidth - padding * 2)) - (containerWidth / 2 - padding)
    const y = (Math.random() * (containerHeight - padding * 2)) - (containerHeight / 2 - padding)
    return { x, y }
  }

  const moveTo = async (targetX: number, targetY: number, duration: number = 3000) => {
    if (!vrm.value || !scene.value) return

    isMoving.value = true

    const startX = vrm.value.scene.position.x
    const startY = vrm.value.scene.position.y
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-in-out)
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2

      if (vrm.value) {
        vrm.value.scene.position.x = startX + (targetX - startX) * eased
        vrm.value.scene.position.y = startY + (targetY - startY) * eased

        // Face direction of movement
        if (targetX > startX) {
          vrm.value.scene.rotation.y = Math.PI / 2
        } else if (targetX < startX) {
          vrm.value.scene.rotation.y = -Math.PI / 2
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        isMoving.value = false
      }
    }

    animate()
  }

  const startRandomMovement = (containerWidth: number, containerHeight: number) => {
    const move = () => {
      if (!isMoving.value) {
        const pos = calculateRandomPosition(containerWidth, containerHeight)
        const duration = 2000 + Math.random() * 2000 // 2-4 seconds
        moveTo(pos.x / 100, pos.y / 100, duration)
      }

      // Random interval between 5-15 seconds
      const nextMoveDelay = 5000 + Math.random() * 10000
      setTimeout(move, nextMoveDelay)
    }

    // Start first movement after 3 seconds
    setTimeout(move, 3000)
  }

  return {
    // ... existing returns ...
    randomPosition,
    isMoving,
    moveTo,
    startRandomMovement
  }
}
```

- [ ] **Step 2: 更新 ThreeVrm 组件集成移动**

```typescript
// Add to ThreeVrm.vue after loading
const startRandomMovement = () => {
  if (!containerRef.value) return
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  useVrm.startRandomMovement(width, height)
}
```

- [ ] **Step 3: Commit**

---

## Chunk 5: AI 对话功能

### Task 5.1: 创建 AI 对话 API

**Files:**
- Create: `server/api/chat.post.ts`
- Create: `server/utils/ai.ts`

- [ ] **Step 1: 创建 AI 工具函数**

```typescript
export async function sendToAI(message: string, history: Array<{role: string, content: string}> = []) {
  const config = useRuntimeConfig()
  const apiKey = config.aiApiKey

  if (!apiKey) {
    throw new Error('AI API key not configured')
  }

  const systemPrompt = `You are a helpful AI assistant on a personal blog.
You are friendly, witty, and helpful.
Answer questions about the blog, the author, and help visitors navigate the site.
Keep responses concise and conversational.`

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.map(h => ({ role: h.role, content: h.content })),
    { role: 'user', content: message }
  ]

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages
    })
  })

  if (!response.ok) {
    throw new Error('AI request failed')
  }

  const data = await response.json()
  return data.content[0].text
}
```

- [ ] **Step 2: 创建对话 API 端点**

```typescript
import { sendToAI } from '~/server/utils/ai'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { message, history } = body

  if (!message) {
    throw createError({
      statusCode: 400,
      message: 'Message is required'
    })
  }

  try {
    const reply = await sendToAI(message, history || [])
    return { reply }
  } catch (error) {
    console.error('AI chat error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to get AI response'
    })
  }
})
```

- [ ] **Step 3: Commit**

---

### Task 5.2: 创建对话 UI 组件

**Files:**
- Create: `components/ChatWindow.vue`
- Modify: `layouts/default.vue`

- [ ] **Step 1: 创建 ChatWindow 组件**

```vue
<script setup lang="ts">
const isOpen = ref(false)
const messages = ref<Array<{role: string, content: string}>>([])
const input = ref('')
const loading = ref(false)

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
        history: messages.value.slice(-10) // Last 10 messages for context
      }
    })

    if (data.value?.reply) {
      messages.value.push({ role: 'assistant', content: data.value.reply })
    }
  } catch (error) {
    messages.value.push({ role: 'assistant', content: 'Sorry, I\'m having trouble responding right now. Please try again.' })
  } finally {
    loading.value = false
  }
}

const toggleChat = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Chat Window -->
    <div
      v-if="isOpen"
      class="bg-dark-surface border border-dark-border rounded-lg shadow-xl w-80 h-96 mb-4 flex flex-col"
    >
      <div class="p-4 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-semibold text-neon-blue">AI Assistant</h3>
        <button @click="toggleChat" class="text-gray-400 hover:text-white">
          ✕
        </button>
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

    <!-- Toggle Button -->
    <button
      @click="toggleChat"
      class="w-14 h-14 bg-neon-blue rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform"
    >
      💬
    </button>
  </div>
</template>
```

- [ ] **Step 2: 添加 ChatWindow 到布局**

```vue
<!-- Add to layouts/default.vue -->
<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <main class="flex-1">
      <slot />
    </main>
    <ChatWindow />
    <footer class="py-8 text-center text-gray-500 text-sm border-t border-dark-border">
      © {{ new Date().getFullYear() }} Personal Blog. All rights reserved.
    </footer>
  </div>
</template>
```

- [ ] **Step 3: Commit**

---

### Task 5.3: 整合 3D 人物与对话窗口

**Files:**
- Create: `components/AiAssistant.vue`

- [ ] **Step 1: 创建 AI 助手主组件**

```vue
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
    <!-- 3D Avatar with random movement -->
    <div class="fixed z-40" style="top: 20%; left: 10%;">
      <ThreeVrm
        :model-url="vrmUrl"
        :fallback-image="fallbackImage"
        @click="handleAvatarClick"
      />
    </div>

    <!-- Chat Window -->
    <ChatWindow
      ref="chatRef"
      :is-open="isChatOpen"
      @close="closeChat"
    />
  </div>
</template>
```

- [ ] **Step 2: 更新 ChatWindow 支持 isOpen prop**

```vue
<script setup lang="ts">
// Update props to support controlled open state
const props = defineProps<{
  isOpen?: boolean
}>()

// Use controlled state if provided, otherwise use internal state
const isOpen = computed(() => props.isOpen ?? internalIsOpen.value)
</script>
```

- [ ] **Step 3: Commit**

---

## Chunk 6: 语音能力

### Task 6.1: 创建 TTS API 和语音功能

**Files:**
- Create: `server/api/tts.post.ts`
- Modify: `components/ChatWindow.vue`

- [ ] **Step 1: 创建 TTS API（修复 Buffer 处理）**

```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { text, voiceId } = body

  if (!text) {
    throw createError({
      statusCode: 400,
      message: 'Text is required'
    })
  }

  const config = useRuntimeConfig()
  const apiKey = config.ttsApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'TTS API key not configured'
    })
  }

  // Using ElevenLabs API as example
  const voice = voiceId || '21m00Tcm4TlvDq8ikWAM' // Rachel voice ID

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey
    },
    body: JSON.stringify({
      text,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    })
  })

  if (!response.ok) {
    throw new Error('TTS request failed')
  }

  // Convert ArrayBuffer to Base64 properly for Node.js
  const arrayBuffer = await response.arrayBuffer()
  const uint8Array = new Uint8Array(arrayBuffer)
  const base64 = Buffer.from(uint8Array).toString('base64')

  return {
    audio: `data:audio/mpeg;base64,${base64}`
  }
})
```

- [ ] **Step 2: 添加语音功能到 ChatWindow**

```typescript
// Add to ChatWindow.vue
const enableVoice = ref(false)
const currentAudio = ref<HTMLAudioElement | null>(null)

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

// After AI response, optionally play voice
const replyReceived = (reply: string) => {
  messages.value.push({ role: 'assistant', content: reply })
  if (enableVoice.value) {
    playVoice(reply)
  }
}
```

- [ ] **Step 3: 添加语音开关 UI**

```vue
<!-- Add to ChatWindow header -->
<div class="flex items-center gap-2">
  <button
    @click="enableVoice = !enableVoice"
    :class="['text-sm', enableVoice ? 'text-neon-pink' : 'text-gray-400']"
    title="Toggle voice"
  >
    🔊
  </button>
</div>
```

- [ ] **Step 4: Commit**

---

## Chunk 7: 测试与部署

### Task 7.1: 环境配置和部署准备

**Files:**
- Create: `.env.example`
- Create: `vercel.json`

- [ ] **Step 1: 创建环境变量示例**

```bash
# AI API (Anthropic Claude API)
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# TTS API (ElevenLabs)
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Site URL
SITE_URL=https://your-domain.com
```

- [ ] **Step 2: 创建 Vercel 配置**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public",
  "framework": "nuxt",
  "installCommand": "npm install"
}
```

- [ ] **Step 3: Commit**

---

### Task 7.2: 本地测试

- [ ] **Step 1: 安装依赖**

```bash
npm install
```

- [ ] **Step 2: 运行开发服务器**

```bash
npm run dev
```

- [ ] **Step 3: 验证功能**
- [ ] **Step 4: Commit**

---

## 完整文件结构

```
personal-blog-3d-ai/
├── package.json
├── nuxt.config.ts
├── tailwind.config.js
├── app.vue
├── .env.example
├── vercel.json
├── content/
│   ├── blogs/
│   │   └── hello-world.md
│   ├── videos.json
│   └── audios.json
├── components/
│   ├── NavBar.vue
│   ├── ChatWindow.vue
│   └── ThreeVrm.vue
├── composables/
│   └── useVrm.ts
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue
│   ├── blogs/
│   │   ├── index.vue
│   │   └── [...slug].vue
│   ├── videos/
│   │   └── index.vue
│   └── audios/
│       └── index.vue
└── server/
    ├── api/
    │   ├── chat.post.ts
    │   └── tts.post.ts
    └── utils/
        └── ai.ts
```
