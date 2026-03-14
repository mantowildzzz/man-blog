import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VRMLoaderPlugin, VRMExpressionPresetName } from '@pixiv/three-vrm'

export function useVrm() {
  const scene = ref<THREE.Scene | null>(null)
  const vrm = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const randomPosition = ref({ x: 0, y: 0 })
  const isMoving = ref(false)

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
  }

  const setExpression = (preset: string, value: number) => {
    if (!vrm.value?.expressionManager) return
    vrm.value.expressionManager.setValue(preset, value)
  }

  const calculateRandomPosition = (containerWidth: number, containerHeight: number) => {
    const padding = 200
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
        const duration = 2000 + Math.random() * 2000
        moveTo(pos.x / 100, pos.y / 100, duration)
      }

      const nextMoveDelay = 5000 + Math.random() * 10000
      setTimeout(move, nextMoveDelay)
    }

    setTimeout(move, 3000)
  }

  return {
    scene,
    vrm,
    loading,
    error,
    loadVrm,
    playAnimation,
    setExpression,
    randomPosition,
    isMoving,
    moveTo,
    startRandomMovement
  }
}
