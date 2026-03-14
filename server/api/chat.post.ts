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
