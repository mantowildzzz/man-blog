export function useDevice() {
  const isMobile = ref(false)

  const checkDevice = () => {
    if (typeof window !== 'undefined') {
      isMobile.value = window.innerWidth < 768
    }
  }

  onMounted(() => {
    checkDevice()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkDevice)
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', checkDevice)
    }
  })

  return { isMobile }
}
