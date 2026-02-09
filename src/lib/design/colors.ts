/**
 * Tokens de color extraídos del diseño UNIR
 * Fuente: Benchmark and brainstorming - Portal del Estudiante UNIR
 */

export const unirColors = {
  primary: {
    50: '#EBF0FA',
    100: '#D6E1F5',
    200: '#ADC3EB',
    300: '#6B8FD4',
    400: '#3A6BBF',
    500: '#1A3A6B', // Azul medio UNIR (header derecha)
    600: '#142E55',
    700: '#0D1B3E', // Azul oscuro UNIR (header izquierda)
    800: '#091428',
    900: '#050A14',
  },
  secondary: {
    50: '#E6F7F5',
    100: '#B3EDE6',
    200: '#80E2D7',
    300: '#4DD8C8',
    400: '#26CEB9',
    500: '#00897B', // Teal/verde azulado (links como "Mi perfil")
    600: '#006D63',
    700: '#00524A',
    800: '#003732',
    900: '#001B19',
  },
  neutral: {
    50: '#F5F7FA',  // Fondo general de la página
    100: '#E8ECF1',
    200: '#D1D9E4',
    300: '#B0BCC9',
    400: '#8A99AB',
    500: '#6B7B8D',
    600: '#546E7A', // Links secundarios sidebar
    700: '#3D5060',
    800: '#2C3A47',
    900: '#1A2530',
  },
  status: {
    pending: '#F59E0B',       // Naranja - pendiente
    pendingBg: '#FFF7E6',
    pendingBorder: '#FFE4A0',
    validating: '#3B82F6',    // Azul - en validación
    validatingBg: '#EBF5FF',
    validatingBorder: '#BDDCFF',
    validated: '#4CAF50',     // Verde - validado
    validatedBg: '#E8F5E9',
    validatedBorder: '#A5D6A7',
    error: '#EF4444',         // Rojo - error/rechazado
    errorBg: '#FEF2F2',
    errorBorder: '#FECACA',
    paymentPending: '#E65100', // Naranja oscuro - pendiente de pago
    paymentPendingBg: '#FFF3E0',
  },
  white: '#FFFFFF',
  card: {
    background: '#FFFFFF',
    border: '#E0E0E0',
    hoverBorder: '#B0BCC9',
  },
  gradient: {
    header: 'linear-gradient(to right, #0D1B3E, #1A3A6B)',
  },
} as const;
