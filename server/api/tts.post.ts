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

  const voice = voiceId || '21m00Tcm4TlvDq8ikWAM'

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

  const arrayBuffer = await response.arrayBuffer()
  const uint8Array = new Uint8Array(arrayBuffer)
  const base64 = Buffer.from(uint8Array).toString('base64')

  return {
    audio: `data:audio/mpeg;base64,${base64}`
  }
})
