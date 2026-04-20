interface Props {
  label: string
  title: string
  subtitle?: string
}

export default function SectionHeader({ label, title, subtitle }: Props) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{
          height: 1, width: 0,
          background: 'linear-gradient(90deg, var(--accent), transparent)',
          animation: 'ph-grow-line 4s ease-in-out infinite',
        }} />
        <span style={{
          fontSize: '.68rem', letterSpacing: '.18em',
          textTransform: 'uppercase', fontWeight: 500,
          color: 'var(--accent)',
        }}>
          {label}
        </span>
      </div>
      <div className="g-title" style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: 'clamp(2rem, 4vw, 3.2rem)',
        fontWeight: 400, letterSpacing: '-.03em', lineHeight: 1.1,
        whiteSpace: 'pre-line',
      }}>
        {title}
      </div>
      {subtitle && (
        <div style={{
          fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7,
          marginTop: 10, maxWidth: 480,
        }}>
          {subtitle}
        </div>
      )}
    </div>
  )
}
