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
const { vrm, loading, error, loadVrm, setExpression, startRandomMovement } = useVrm()
const { isMobile } = useDevice()
let renderer: THREE.WebGLRenderer | null = null
let animationId: number | null = null

const useFallback = computed(() => isMobile.value && props.fallbackImage)

const init = async () => {
  if (!containerRef.value) return

  if (useFallback.value) return

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0a0f)

  const camera = new THREE.PerspectiveCamera(45, containerRef.value.clientWidth / containerRef.value.clientHeight, 0.1, 100)
  camera.position.set(0, 1, 2)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  containerRef.value.appendChild(renderer.domElement)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(0, 2, 1)
  scene.add(directionalLight)

  setTimeout(async () => {
    const loadedVrm = await loadVrm(props.modelUrl)
    if (loadedVrm) {
      scene.add(loadedVrm.scene)
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      if (loadedVrm) {
        loadedVrm.update(0.016)
      }

      renderer?.render(scene, camera)
    }
    animate()

    // Start random movement after VRM loads
    if (containerRef.value) {
      startRandomMovement(containerRef.value.clientWidth, containerRef.value.clientHeight)
    }
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
    class="w-64 h-96 relative cursor-pointer"
    @click="handleClick"
  >
    <div v-if="useFallback" class="w-full h-full flex items-center justify-center">
      <img v-if="fallbackImage" :src="fallbackImage" alt="AI Assistant" class="max-w-full max-h-full object-contain" />
    </div>
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
