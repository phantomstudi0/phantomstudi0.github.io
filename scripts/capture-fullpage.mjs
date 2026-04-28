// Полностраничные скриншоты всех проектов для публикации на биржах
// (Kwork, Upwork, Behance, Dribbble).
//
// Использование:
//   node scripts/capture-fullpage.mjs                 # все 17
//   node scripts/capture-fullpage.mjs romark-crm      # один
//
// Output: ./portfolio-full/{slug}.jpg (1440px ширины, JPG 92%)
//         + index.html со всеми для локального просмотра

import { chromium } from 'playwright'
import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'

const PROJECTS = [
  { slug: 'romark-crm',            url: 'https://app.star-crm.ru/romark',                     title: 'Star CRM' },
  { slug: 'eclipse-premiumrent',   url: 'https://eclipse-premiumrent.pages.dev/',              title: 'LiteRent Premium' },
  { slug: 'lms-platform',          url: 'https://lms-platform-mocha-nine.vercel.app/',         title: 'Learnix' },
  { slug: 'shotforge',             url: 'https://shotforge.pages.dev/',                        title: 'ShotForge' },
  { slug: 'eclipse-valhalla',      url: 'https://eclipse-valhalla.pages.dev/',                 title: 'Eclipse Valhalla' },
  { slug: 'fashion-store',         url: 'https://04fashionstore.vercel.app/',                  title: 'NOIRE' },
  { slug: 'cryptopulse',           url: 'https://cryptopulse-1d0.pages.dev/',                  title: 'CryptoPulse' },
  { slug: 'interviewforge',        url: 'https://interviewforge-3pf.pages.dev/',               title: 'InterviewForge' },
  { slug: 'eclipse-ai-hub',        url: 'https://eclipse-ai-hub.pages.dev/',                   title: 'Eclipse AI Hub' },
  { slug: 'eclipse-media',         url: 'https://eclipse-media.pages.dev/',                    title: 'Eclipse Media' },
  { slug: 'blackstone-barbershop', url: 'https://blackstone-barbershop.vercel.app/',           title: 'Blackstone Barbershop' },
  { slug: 'fitness-booking-agent', url: 'https://fitness-booking-agent.pages.dev/',            title: 'Fitness Booking Agent' },
  { slug: 'parser-dashboard',      url: 'https://08parserdashboard.vercel.app/',               title: 'SCOUT' },
  { slug: 'crm-dashboard',         url: 'https://05crmdashboard.vercel.app/dashboard',         title: 'ORBIT CRM' },
  { slug: 'real-estate',           url: 'https://06realestate.vercel.app/',                    title: 'NOVA' },
  { slug: 'saas-landing',          url: 'https://03saaslanding.vercel.app/',                   title: 'MailPilot' },
  { slug: 'landing-02',            url: 'https://02landing.vercel.app/',                       title: 'СмайлДент' },
]

const VIEWPORT = { width: 1440, height: 900 }
const JPG_QUALITY = 92
const MAX_HEIGHT = 9800         // лимит Kwork — 10000px; берём с запасом
const OUTPUT_DIR = 'portfolio-full'

const filter = process.argv.slice(2)
const targets = filter.length
  ? PROJECTS.filter(p => filter.includes(p.slug))
  : PROJECTS

if (!targets.length) {
  console.error('Нет совпадений. Доступные slug:', PROJECTS.map(p => p.slug).join(', '))
  process.exit(1)
}

await fs.mkdir(OUTPUT_DIR, { recursive: true })

console.log(`📸 Full-page capture: ${targets.length} проект(а/ов)`)
console.log(`   Viewport: ${VIEWPORT.width}×${VIEWPORT.height}`)
console.log(`   Output: ${path.resolve(OUTPUT_DIR)}\n`)

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 1, // чистый 1:1, без x2 — иначе картинки становятся гигантскими
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
})

let ok = 0
let fail = 0
const results = []

for (const p of targets) {
  process.stdout.write(`  ${p.slug.padEnd(26)} ... `)
  const page = await ctx.newPage()
  try {
    await page.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForTimeout(2500)

    // Медленно прокручиваем в конец шагами по 70% viewport, ожидая на каждом
    // этапе — чтобы сработали все IntersectionObserver-анимации и lazy-load.
    const pageHeight = await page.evaluate(() => Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    ))
    const step = Math.round(VIEWPORT.height * 0.7)
    let currentY = 0
    while (currentY < pageHeight) {
      currentY = Math.min(currentY + step, pageHeight)
      await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), currentY)
      await page.waitForTimeout(400)
    }

    // Возвращаемся в начало. Некоторые анимации — в два этапа (fade-in при первом
    // прохождении + permanent state). Повторный скролл после возврата подхватит и эти.
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(700)

    // Всегда берём полностраничный скриншот (Playwright сам склеит контент).
    // Если потом слишком длинный для Kwork — обрезаем сверху через Sharp.
    const png = await page.screenshot({ type: 'png', fullPage: true })

    const meta = await sharp(png).metadata()
    const origHeight = meta.height || pageHeight
    const finalHeight = Math.min(origHeight, MAX_HEIGHT)

    let pipeline = sharp(png)
    if (origHeight > MAX_HEIGHT) {
      pipeline = pipeline.extract({
        left: 0, top: 0,
        width: meta.width || VIEWPORT.width,
        height: MAX_HEIGHT,
      })
    }
    const jpg = await pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toBuffer()

    const outPath = path.join(OUTPUT_DIR, `${p.slug}.jpg`)
    await fs.writeFile(outPath, jpg)

    const sizeKB = (jpg.length / 1024).toFixed(0)
    const cropNote = origHeight > MAX_HEIGHT ? ` [обрезано с ${origHeight}]` : ''
    console.log(`✓ ${String(finalHeight).padStart(4)}px × ${VIEWPORT.width}  ${sizeKB.padStart(4)}KB${cropNote}`)
    results.push({ ...p, height: finalHeight, size: jpg.length })
    ok++
  } catch (err) {
    console.log(`✗ ${err.message.slice(0, 80)}`)
    fail++
  } finally {
    await page.close()
  }
}

await browser.close()

// Генерим простой index.html для локального просмотра
const indexHtml = `<!DOCTYPE html>
<html lang="ru"><head>
<meta charset="utf-8"><title>Portfolio — ${results.length} projects</title>
<style>
  body{margin:0;background:#111;color:#eee;font:14px/1.5 system-ui}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:16px;padding:24px;max-width:1800px;margin:0 auto}
  .card{background:#1a1a1a;border-radius:8px;overflow:hidden;border:1px solid #333}
  .card img{display:block;width:100%;height:auto}
  .card h3{margin:0;padding:12px 14px 4px;font-size:16px;font-weight:500}
  .card p{margin:0;padding:0 14px 12px;font-size:12px;color:#888}
  .card a{color:#6BA3FF;text-decoration:none}
  h1{padding:32px 24px 0;font-weight:500;max-width:1800px;margin:0 auto}
</style></head><body>
<h1>Portfolio · ${results.length} проектов</h1>
<div class="grid">
${results.map(r => `  <div class="card">
    <a href="${r.slug}.jpg" target="_blank"><img src="${r.slug}.jpg" alt="${r.title}" loading="lazy"></a>
    <h3>${r.title}</h3>
    <p>${r.slug}.jpg · ${(r.size / 1024).toFixed(0)}KB · ${r.height}px высоты</p>
  </div>`).join('\n')}
</div>
</body></html>`
await fs.writeFile(path.join(OUTPUT_DIR, 'index.html'), indexHtml)

console.log(`\n${ok}/${targets.length} captured, ${fail} failed`)
console.log(`📂 Открой для предпросмотра: ${path.resolve(OUTPUT_DIR, 'index.html')}`)
