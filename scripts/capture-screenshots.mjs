// Bulk screenshot + WebP optimize для всех проектов портфолио.
//
// Использование:
//   npm install -D playwright sharp
//   npx playwright install chromium
//   node scripts/capture-screenshots.mjs
//
// Результат: public/projects/{slug}.webp (viewport 1280×800, WebP quality 82)
//
// Чтобы обновить один проект — передай slug(и) в аргументах:
//   node scripts/capture-screenshots.mjs romark-crm shotforge

import { chromium } from 'playwright'
import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'

const PROJECTS = [
  { slug: 'romark-crm',            url: 'https://app.star-crm.ru/romark' },
  { slug: 'eclipse-premiumrent',   url: 'https://eclipse-premiumrent.pages.dev/' },
  { slug: 'lms-platform',          url: 'https://lms-platform-mocha-nine.vercel.app/' },
  { slug: 'shotforge',             url: 'https://shotforge.pages.dev/' },
  { slug: 'eclipse-valhalla',      url: 'https://eclipse-valhalla.pages.dev/' },
  { slug: 'fashion-store',         url: 'https://04fashionstore.vercel.app/' },
  { slug: 'cryptopulse',           url: 'https://cryptopulse-1d0.pages.dev/' },
  { slug: 'interviewforge',        url: 'https://interviewforge-3pf.pages.dev/' },
  { slug: 'eclipse-ai-hub',        url: 'https://eclipse-ai-hub.pages.dev/' },
  { slug: 'eclipse-media',         url: 'https://eclipse-media.pages.dev/' },
  { slug: 'blackstone-barbershop', url: 'https://blackstone-barbershop.vercel.app/' },
  { slug: 'fitness-booking-agent', url: 'https://fitness-booking-agent.pages.dev/' },
  { slug: 'parser-dashboard',      url: 'https://08parserdashboard.vercel.app/' },
  { slug: 'crm-dashboard',         url: 'https://05crmdashboard.vercel.app/dashboard' },
  { slug: 'real-estate',           url: 'https://06realestate.vercel.app/' },
  { slug: 'saas-landing',          url: 'https://03saaslanding.vercel.app/' },
  { slug: 'landing-02',            url: 'https://02landing.vercel.app/' },
  { slug: 'vadim-tamada',          url: 'https://vadim-beloglazov.ru/' },
  { slug: 'djobs-shop',            url: 'https://djobs.shop/' },
  { slug: 'sport-nardy',           url: 'https://sportnardy39.ru/' },
]

const VIEWPORT = { width: 1280, height: 800 }
const OUTPUT_DIR = 'public/projects'
const WEBP_QUALITY = 82
const WAIT_AFTER_LOAD = 2500 // ms на то чтобы анимации доиграли

const filter = process.argv.slice(2)
const targets = filter.length
  ? PROJECTS.filter(p => filter.includes(p.slug))
  : PROJECTS

if (!targets.length) {
  console.error('Нет совпадений по slug. Доступные:', PROJECTS.map(p => p.slug).join(', '))
  process.exit(1)
}

await fs.mkdir(OUTPUT_DIR, { recursive: true })

console.log(`📸 Launching Chromium... (${targets.length} projects)`)
const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 2,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
})

let ok = 0
let fail = 0

// Максимум скриншотов на проект. Скроллим кратно viewport чтобы каждый кадр
// показывал цельную секцию (а не половину героя + половину следующей).
const MAX_SHOTS = 6

for (const p of targets) {
  process.stdout.write(`  ${p.slug.padEnd(26)} ... `)
  const page = await ctx.newPage()
  const sizes = []
  try {
    await page.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForTimeout(WAIT_AFTER_LOAD)

    // Скроллим в конец и обратно — триггерим lazy-load изображений и анимаций
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })
    await page.waitForTimeout(800)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(500)

    const pageHeight = await page.evaluate(() => Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    ))
    const viewportH = VIEWPORT.height
    // Запас 100px чтобы последний кадр не обрезал footer
    const maxScrollY = Math.max(0, pageHeight - viewportH)

    const seenHashes = new Set()
    let shotIdx = 0

    for (let i = 0; i < MAX_SHOTS; i++) {
      // Скроллим кратно 80% viewport — небольшой overlap чтобы ничего не терять
      const scrollY = Math.min(maxScrollY, Math.round(i * viewportH * 0.85))
      await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), scrollY)
      await page.waitForTimeout(450)

      const png = await page.screenshot({ type: 'png', fullPage: false })
      const hash = `${png.length}-${png.slice(0, 128).toString('hex')}`
      if (seenHashes.has(hash)) {
        // Дубликат — страница перестала отличаться, значит достигли конца
        break
      }
      seenHashes.add(hash)

      shotIdx++
      const webp = await sharp(png).webp({ quality: WEBP_QUALITY }).toBuffer()
      const outPath = path.join(OUTPUT_DIR, `${p.slug}-${shotIdx}.webp`)
      await fs.writeFile(outPath, webp)
      sizes.push(webp.length)

      // Достигли дна и страница не скроллится — хватит
      if (scrollY >= maxScrollY) break
    }
    const totalKB = (sizes.reduce((a, b) => a + b, 0) / 1024).toFixed(1)
    console.log(`✓ ${shotIdx} shot(s), ${totalKB.padStart(5)}KB total`)
    ok++
  } catch (err) {
    console.log(`✗ ${err.message.slice(0, 80)}`)
    fail++
  } finally {
    await page.close()
  }
}

await browser.close()
console.log(`\n${ok}/${targets.length} captured, ${fail} failed.`)
console.log(`Output: ${path.resolve(OUTPUT_DIR)}`)
