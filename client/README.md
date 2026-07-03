# Rick and Morty - Frontend

Frontend construido con React 18, Apollo Client, React Router DOM y TailwindCSS para consumir la API GraphQL de Rick and Morty.

---

## Stack

- **React 18** + TypeScript
- **Apollo Client 3** (GraphQL)
- **React Router DOM 6**
- **TailwindCSS 4** (con plugin Vite)
- **React Toastify** (notificaciones)
- **Vitest** + Testing Library (unit tests)
- **Vite** (bundler + dev server)

---

## Ejecución

```bash
npm install
npm run build
npm run dev
```

Abre `http://localhost:5173`. Requiere el backend corriendo en `http://localhost:4000`.

---

## Tests

```bash
npm test
```

4 archivos, 12 tests:
- `Loading.test.tsx` — renderiza/oculta según prop visible
- `Layout.test.tsx` — renderiza children via Outlet, max-width container
- `CharacterItem.test.tsx` — nombre, species, onSelect, corazón favorito
- `CharacterResults.test.tsx` — secciones starred/non-starred, filtros, conteo, estado vacío

---

## Estructura del proyecto

```
client/
├── src/
│   │
│   ├── config/                         → Configuración de variables                      
│   │   └── environment.ts/             → Archivo centralizado de variables de entorno
|   |
|   |
│   ├── components/                      → Componentes globales reutilizables
│   │   ├── Layout/
│   │   │   └── index.tsx                → Wrapper con max-width + Outlet
│   │   └── Loading/
│   │       └── index.tsx                → Modal de carga fullscreen
│   │
│   ├── modules/                         → Componentes agrupados por dominio
│   │   ├── character/
│   │   │   ├── index.tsx                → Layout principal (Panel + Detail)
│   │   │   └── components/
│   │   │       ├── CharacterPanel.tsx   → Orquesta hook + FilterInput + Results
│   │   │       ├── CharacterResults.tsx → Secciones starred/non-starred + items
│   │   │       ├── CharacterItem.tsx    → Imagen + nombre + species + favorito + hide
│   │   │       ├── CharacterDetail.tsx  → Detalle del seleccionado + comentarios
│   │   │       └── FilterInput.tsx      → Input búsqueda + popup filtros
│   │   └── comment/
|   |       ├── index.tsx                → Lista principal de comentarios con delete
│   │       └── components/
|   |           └── CommentForm.tsx      → Form para agregar comentario
│   │       
│   │
│   ├── pages/                           → Entry points por ruta
│   │   └── character/
│   │       └── CharacterListPage.tsx    → Importa CharacterListView
|   |
│   ├── hooks/                           → Custom hooks por dominio
│   │   ├── character/
│   │   │   └── useCharacters.ts         → Query + debounce + filtros + sort + hide
│   │   └── favorite/
|   |       └── useFavorite.ts           → Mutation toggleFavorite
│   │
│   │
│   ├── graphql/                         → Queries y mutations por dominio
│   │   ├── client.ts                    → Apollo Client config
│   │   ├── queries/
│   │   │   └── character/
│   │   │       └── characters.query.ts
│   │   └── mutations/
│   │       ├── comment/
│   │       │   └── comment.mutation.ts
│   │       └── favorite/
│   │           └── favorite.mutation.ts
│   │
│   ├── types/                           → Interfaces TypeScript por dominio
│   │   ├── character/
│   │   │   └── character.types.ts       → Character, FilterValues, SortOrder
│   │   ├── comment/
│   │   │   └── comment.types.ts
│   │   └── favorite/
│   │       └── favorite.types.ts
│   │
│   ├── lib/                             → Utilidades reutilizables
│   │   ├── utils.ts                     → formatDate
│   │   └── constants.ts                 → Opciones de filtros
│   │
│   ├── router/
│   │   └── AppRouter.tsx                → Ruta única (/)
│   │
│   ├── App.tsx                          → ApolloProvider + Router + ToastContainer
│   ├── main.tsx                         → Entry point
│   ├── index.css                        → Tailwind directives
│   └── vite-env.d.ts                    → Tipos de Vite
│
├── tests/                               → Unit tests
│   ├── setup.ts
│   ├── Loading.test.tsx
│   ├── Layout.test.tsx
│   ├── CharacterItem.test.tsx
│   |── CharacterResults.test.tsx
│   └── CharacterPanel.test.tsx
│
├── .prettierrc
├── .vscode/settings.json
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Decisiones de arquitectura

### Layout dos paneles

- **Desktop:** sidebar izquierdo (375px) con lista + panel derecho con detalle. Seleccionar un character muestra su info en el panel derecho.
- **Mobile:** solo se ve el panel izquierdo. Al seleccionar navega al detalle fullscreen con botón de volver.

### Hooks separados de componentes

- **`useCharacters`** — toda la lógica de datos: query GraphQL, debounce en búsqueda, filtros, sort, soft-delete, conteo de filtros activos. El componente solo renderiza.
- **`useFavorite`** — mutation aislada de toggle favorito. Reutilizable en cualquier componente.

### Filtros con estado local en popup

El popup de filtros (`FilterInput`) mantiene un estado local mientras el usuario selecciona chips. Solo al presionar "Filter" se notifica al padre y se dispara la query. Esto evita requests por cada chip seleccionado.

### Debounce en búsqueda por nombre

300ms de delay entre que el usuario escribe y se dispara la query. Evita parpadeos y requests innecesarios.

### Soft-delete local

Los personajes ocultos se guardan en un array `hiddenIds` en memoria. Se filtran antes del sort y antes de pasar a los resultados. No persiste — al recargar vuelven.

### Estado de selección en el index

El `index.tsx` solo guarda el `selectedCharacterId`. Busca el character actualizado en el cache de Apollo, así cuando un refetch ocurre (por comment o favorite), el detalle se actualiza automáticamente.

### Error handling con useEffect

El error de la query se maneja en un `useEffect` dentro del hook, que dispara un toast una sola vez. Evita toasts duplicados por re-renders.

---

## Path aliases

| Alias | Ruta |
|-------|------|
| `@assets/*` | `src/assets/*` |
| `@components/*` | `src/components/*` |
| `@graphql/*` | `src/graphql/*` |
| `@hooks/*` | `src/hooks/*` |
| `@lib/*` | `src/lib/*` |
| `@modules/*` | `src/modules/*` |
| `@pages/*` | `src/pages/*` |
| `@router/*` | `src/router/*` |
| `@appTypes/*` | `src/types/*` |

---

## Funcionalidades

| Feature | Implementación |
|---------|---------------|
| Listar personajes | CharacterResults separa starred/non-starred |
| Buscar por nombre | Input con debounce 300ms |
| Filtrar por status, species, gender | Popup con chips + botón Filter |
| Filtrar por tipo (All/Starred/Others) | Filtro local sobre la lista |
| Ordenar A-Z / Z-A | Sort en cliente con useMemo |
| Detalle con datos completos | CharacterDetail con campos + separadores |
| Marcar como favorito | useFavorite hook + mutation + refetch |
| Agregar comentarios | CommentForm + mutation + refetch |
| Eliminar comentarios | CommentList + mutation + refetch |
| Soft-delete | hiddenIds en useCharacters |
| Responsive | Mobile: panel full → detalle full. Desktop: side by side |
| Notificaciones | React Toastify (success/error) |
| Loading global | Componente Loading fullscreen |

---

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Levanta Vite en modo desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Sirve el build localmente |
| `npm test` | Ejecuta unit tests con Vitest |
