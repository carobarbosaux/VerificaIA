/**
 * Tokens de espaciado y layout extraídos del diseño UNIR
 */

export const unirSpacing = {
  container: {
    maxWidth: '1280px',
    padding: {
      mobile: '1rem',    // 16px
      tablet: '1.5rem',  // 24px
      desktop: '2rem',   // 32px
    },
  },
  sidebar: {
    width: '240px',
    collapsedWidth: '64px',
  },
  header: {
    height: '64px',
  },
  grid: {
    base: '8px',
    gap: {
      sm: '0.5rem',   // 8px
      md: '1rem',     // 16px
      lg: '1.5rem',   // 24px
      xl: '2rem',     // 32px
    },
  },
  borderRadius: {
    sm: '0.25rem',  // 4px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px
    xl: '1rem',     // 16px
    full: '9999px',
  },
} as const;
