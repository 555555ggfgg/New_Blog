import { ref, onMounted } from 'vue'

export function useHitokoto() {
  const hitokoto = ref('')
  const loading = ref(false)

  async function fetchHitokoto() {
    loading.value = true
    try {
      const response = await fetch('https://v1.hitokoto.cn/')
      const data = await response.json()
      hitokoto.value = data.hitokoto
    } catch (error) {
      hitokoto.value = 'Failed to fetch'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchHitokoto)

  return { hitokoto, loading, fetchHitokoto }
}

export default { useHitokoto }
