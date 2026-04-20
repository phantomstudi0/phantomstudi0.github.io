'use client'
import { useT } from '@/lib/i18n'

export default function Footer() {
  const { t } = useT()
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '24px 0',
      position: 'relative',
      zIndex: 2,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 14, fontWeight: 500, color: 'var(--text-dim)',
        }}>
          Phantom<span style={{ color: 'var(--accent)', opacity: 0.7 }}>.</span>Studio
        </div>

        <div style={{ display: 'flex', gap: 20 }}>
          <a href="#" style={{ fontSize: 12, color: 'var(--text-dim)', textDecoration: 'none' }}>GitHub</a>
          <a href="#" style={{ fontSize: 12, color: 'var(--text-dim)', textDecoration: 'none' }}>Upwork</a>
          <a href="#" style={{ fontSize: 12, color: 'var(--text-dim)', textDecoration: 'none' }}>Kwork</a>
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-dim)' }} suppressHydrationWarning>
          © {new Date().getFullYear()} — {t('footer.right')}
        </div>
      </div>
    </footer>
  )
}
