import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, contact, message, budget } = await req.json()

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const CHAT_ID   = process.env.TELEGRAM_CHAT_ID

  if (!BOT_TOKEN || !CHAT_ID) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  const text = [
    '🔔 *Новая заявка с сайта*',
    '',
    `👤 *Имя:* ${name}`,
    `📬 *Контакт:* ${contact}`,
    `💰 *Бюджет:* ${budget || 'не указан'}`,
    '',
    `💬 *Задача:*`,
    message,
  ].join('\n')

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: 'Markdown',
    }),
  })

  if (!res.ok) return NextResponse.json({ error: 'TG error' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
