export async function fetchHitokoto() {
  const response = await fetch('https://v1.hitokoto.cn/')
  return response.json()
}

export default { fetchHitokoto }
