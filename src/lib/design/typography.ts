/**
 * Tokens de tipografía extraídos del diseño UNIR
 */

export const unirTypography = {
  fontFamily: {
    primary: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'var(--font-geist-mono), monospace',
  },
  fontSize: {
    xs: '0.75rem',    // 12px - IDs de matrícula, timestamps
    sm: '0.875rem',   // 14px - Texto secundario, badges
    base: '1rem',     // 16px - Texto normal
    lg: '1.125rem',   // 18px - Subtítulos
    xl: '1.25rem',    // 20px - Títulos de sección
    '2xl': '1.5rem',  // 24px - Títulos de página
    '3xl': '1.875rem', // 30px - Hero text
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const;
