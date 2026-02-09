# PLAN.md - VerificaIA Portal del Estudiante UNIR

## Información del Proyecto

- **Framework**: Next.js 16.1.6 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Iconos**: Lucide React
- **Referencia de diseño**: Portal del Estudiante UNIR (Benchmark and Brainstorming)
- **Figma File**: `mvIHBWrfZ6bC5GT2zU52JV` (Node: `95:18932`)

---

## Fase 0: Tokens de Diseño Extraídos (COMPLETADO)

### 0.1 Paleta de Colores

Extraídos de la captura del portal UNIR:

| Token | Valor | Uso |
|---|---|---|
| `primary-700` | `#0D1B3E` | Header gradiente izquierda |
| `primary-500` | `#1A3A6B` | Header gradiente derecha |
| `secondary-500` | `#00897B` | Links "Mi perfil", CTAs secundarios |
| `neutral-50` | `#F5F7FA` | Fondo general de la página |
| `neutral-600` | `#546E7A` | Links secundarios sidebar |
| `status-validated` | `#4CAF50` | Badge "Validado" |
| `status-pending` | `#F59E0B` | Badge pendiente, alertas |
| `status-payment` | `#E65100` | Badge "Pendiente de pago" |
| `status-error` | `#EF4444` | Errores, rechazos |
| `status-validating` | `#3B82F6` | En validación |

Archivos:
- `src/lib/design/colors.ts`
- `src/lib/design/typography.ts`
- `src/lib/design/spacing.ts`
- `src/app/globals.css` (@theme inline)

### 0.2 Tipografía

- **Fuente principal**: Inter (sans-serif)
- **Tamaños**: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px)
- **Pesos**: normal (400), medium (500), semibold (600), bold (700)

### 0.3 Layout

- **Sidebar**: 240px fijo, colapsable
- **Header**: 64px alto, gradiente azul oscuro → medio
- **Contenido**: max-width 1280px, padding responsive
- **Grid**: 8px base system

---

## Fase 1: Estructura del Proyecto (COMPLETADO)

```
src/
├── app/
│   ├── globals.css          # Tailwind + tokens UNIR
│   ├── layout.tsx           # Root layout con Inter font
│   └── page.tsx             # Dashboard principal
├── components/
│   ├── ui/
│   │   ├── card.tsx         # Card, CardHeader, CardTitle, CardContent
│   │   ├── badge.tsx        # Badge con variantes de estado
│   │   └── button.tsx       # Button con variantes
│   ├── layout/
│   │   ├── Header.tsx       # Header con gradiente UNIR
│   │   ├── Sidebar.tsx      # Sidebar con navegación
│   │   └── AppShell.tsx     # Layout wrapper
│   ├── dashboard/
│   │   ├── ReminderWidget.tsx   # Widget de recordatorios
│   │   └── EnrollmentCard.tsx   # Card de matrícula
│   └── documents/           # (Siguiente fase)
├── data/
│   └── mock-student.ts      # Datos mock
├── lib/
│   ├── design/
│   │   ├── colors.ts        # Tokens de color
│   │   ├── typography.ts    # Tokens de tipografía
│   │   ├── spacing.ts       # Tokens de espaciado
│   │   └── index.ts         # Re-exportaciones
│   └── utils.ts             # Utilidad cn()
└── types/
    ├── document.ts          # Tipos Document, DocumentGroup
    └── student.ts           # Tipos Student, Enrollment
```

---

## Fase 2: Datos Mock (COMPLETADO)

### Tipos definidos:

```typescript
interface Document {
  id: string;
  name: string;
  category: DocumentCategory; // 'identity' | 'academic' | 'financial' | 'legal' | 'other'
  status: DocumentStatus;     // 'not_uploaded' | 'pending' | 'validating' | 'validated' | 'rejected'
  required: boolean;
  deadline: Date | null;
  uploadedDate: Date | null;
  fileUrl: string | null;
  rejectionReason: string | null;
  resubmitAttempts: number;
  maxResubmitAttempts: number;
  phase: 1 | 2;
  order: number;
  helpText?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  program: string;
  academicYear: string;
  semester: string;
  enrollmentId: string;
  enrollmentStep: number;
  totalSteps: number;
  progress: number;
}

interface Enrollment {
  id: string;
  program: string;
  period: string;
  status: 'validated' | 'pending_payment' | 'in_progress' | 'pending_documents';
  enrollmentId: string;
}
```

---

## Fase 3: Componentes UI Base (COMPLETADO)

- **Card**: Componentes Card, CardHeader, CardTitle, CardContent
- **Badge**: Variantes `validated`, `pending`, `validating`, `error`, `payment`, `default`
- **Button**: Variantes `default`, `secondary`, `outline`, `ghost`, `link`

---

## Fase 4: Layout (COMPLETADO)

- **Header**: Gradiente from-primary-700 to-primary-500, logo UNIR, menú hamburguesa
- **Sidebar**: Navegación con iconos, perfil del estudiante, links secundarios
- **AppShell**: Wrapper con sidebar colapsable y área de contenido

---

## Fase 5: Dashboard (COMPLETADO)

Página principal con:
- Widget de recordatorios (documentos pendientes)
- Estado de matrícula con barra de progreso
- Grid de matrículas (3 columnas) con badges de estado
- Trámites relacionados con chevron de navegación
- Accesos rápidos (grid 4 columnas)

---

## Fase 6: Gestión de Documentos (PENDIENTE)

### 6.1 Página /documentos
- Vista de documentos agrupados por categoría
- Upload de archivos con drag & drop
- Indicadores de estado por documento
- Motivo de rechazo visible para documentos rechazados

### 6.2 Componentes necesarios:
- `DocumentCard` - Card individual de documento con acciones
- `DocumentUploader` - Zona de upload con drag & drop
- `DocumentStatusIndicator` - Indicador visual del estado
- `DocumentList` - Lista agrupada por categoría

---

## Fase 7: Verificación con IA (PENDIENTE)

### 7.1 Pre-validación de documentos
- Verificar formato de archivo (PDF, JPG, PNG)
- Verificar tamaño de archivo
- Verificar que el documento es legible
- Verificar que coincide con el tipo esperado

### 7.2 Componentes:
- `VerificationProgress` - Progreso de verificación
- `VerificationResult` - Resultado con sugerencias

---

## Fase 8: Notificaciones (PENDIENTE)

- Sistema de notificaciones in-app
- Recordatorios de deadlines
- Alertas de documentos rechazados

---

## Fase 9: Responsive & Accesibilidad (PENDIENTE)

- Sidebar colapsable en mobile
- Overlay para sidebar en mobile
- Tamaños de texto y touch targets accesibles
- Labels ARIA en todos los elementos interactivos

---

## Fase 10: Integración con Diseño Real (PENDIENTE)

Cuando se tenga acceso completo al Figma:
1. Exportar assets (logo UNIR, iconos personalizados)
2. Ajustar paleta de colores exacta
3. Configurar fuentes tipográficas exactas
4. Ajustar espaciados y grid al pixel

---

## Comandos

```bash
npm run dev    # Servidor de desarrollo (http://localhost:3000)
npm run build  # Build de producción
npm run lint   # Linter
```
