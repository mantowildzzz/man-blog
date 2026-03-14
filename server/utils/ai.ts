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
