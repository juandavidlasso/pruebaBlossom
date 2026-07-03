# Rick and Morty GraphQL API

API GraphQL construida con Express, Apollo Server, Sequelize (PostgreSQL) y Redis para buscar personajes de Rick and Morty con filtros avanzados, favoritos y comentarios.

---

## Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 4
- **GraphQL:** Apollo Server 4
- **ORM:** Sequelize 6 (PostgreSQL)
- **Cache:** Redis (ioredis)
- **Cron:** node-cron
- **Testing:** Vitest
- **Docs:** Scalar (OpenAPI 3.0)

---

## Ejecución

```bash
# 1. Levantar PostgreSQL y Redis
docker-compose up -d

# 2. Instalar dependencias
npm install

# 3. Compilar el server
npm run build

# 4. Ejecutar migraciones (crea tablas characters, favorites, comments)
npm run db:migrate

# 5. Seed (carga 15 personajes desde la API de Rick and Morty)
npm run db:seed

# 6. Levantar servidor en desarrollo (hot-reload)
npm run dev

# 7. Ejecutar los test
npm run test
```

**URLs disponibles:**
- GraphQL Playground: `http://localhost:4000/graphql`
- API Docs (Scalar): `http://localhost:4000/api-docs`
- Health Check: `http://localhost:4000/health`

---

## Estructura del proyecto

```
server/
├── database/                → Archivos ejecutados por Sequelize CLI
│   ├── migrations/
│   │   ├── 001-create-characters.js
│   │   ├── 002-create-comments.js
│   │   └── 003-create-favorites.js
│   └── seeders/
│       └── 001-seed-characters.js
│
├── src/
│   ├── cache/
│   │   └── character.cache.ts       → Cache-aside con Redis (TTL 5 min)
│   │
│   ├── config/
│   │   ├── config.js                → Config para Sequelize CLI
│   │   ├── database.ts              → Instancia Sequelize con pool y retry
│   │   ├── environment.ts           → Variables de entorno tipadas
│   │   └── redis.ts                 → Cliente Redis con lazy connect
│   │
│   ├── cron/
│   │   └── updateCharacters.cron.ts → Sync cada 12 horas
│   │
│   ├── datasources/
│   │   └── rickAndMorty.api.ts      → HTTP client a rickandmortyapi.com
│   │
│   ├── decorators/
│   │   └── executionTime.decorator.ts → Mide tiempo de ejecución
│   │
│   ├── docs/
│   │   └── swagger.ts               → OpenAPI 3.0 spec
│   │
│   ├── graphql/
│   │   ├── index.ts                 → Merge de typeDefs y resolvers
│   │   ├── character/
│   │   │   ├── character.typeDefs.ts
│   │   │   └── character.resolvers.ts
│   │   ├── comment/
│   │   │   ├── comment.typeDefs.ts
│   │   │   └── comment.resolvers.ts
│   │   └── favorite/
│   │       ├── favorite.typeDefs.ts
│   │       └── favorite.resolvers.ts
│   │
│   ├── middlewares/
│   │   └── requestLogger.middleware.ts → Log con colores por request
│   │
│   ├── models/
│   │   ├── index.ts                 → Registro central + asociaciones
│   │   ├── character.model.ts
│   │   ├── comment.model.ts
│   │   └── favorite.model.ts
│   │
│   ├── services/
│   │   └── character.service.ts     → Búsqueda con filtros + cache + decorator
│   │
│   ├── app.ts                       → Setup Express + Apollo + Scalar
│   └── server.ts                    → Entry point: conexiones + arranque
│
├── tests/
│   └── character.service.test.ts
│
├── .env
├── .env.example
├── .gitignore
├── .sequelizerc
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

---

## Decisiones de arquitectura

### Estructura por capas

Con pocas entidades y múltiples concerns transversales (cache, cron, decorators, middleware), cada responsabilidad tiene su lugar. Agregar una entidad = crear archivos nuevos en las capas que correspondan.

### Cache-Aside Pattern

El service revisa Redis antes de consultar PostgreSQL. Hit → devuelve cache. Miss → consulta DB, guarda en cache (TTL 5 min). Mutations de favoritos y comentarios invalidan el cache.

### Repository Pattern

Los resolvers de character no tocan Sequelize directamente. Delegan al service que encapsula el acceso a datos. Los resolvers de comment y favorite sí llaman al modelo directo (CRUD simple sin lógica adicional).

### Decorator Pattern

`@ExecutionTime` mide la duración del método `searchCharacters` sin modificar su lógica interna.

### Singleton Pattern

Conexiones a PostgreSQL y Redis se instancian una vez y se reutilizan.

### Input Type en GraphQL

Filtros agrupados en `CharacterFilterInput` en vez de argumentos sueltos.

### Toggle para favoritos

Un solo mutation `toggleFavorite` que crea o elimina el registro. Devuelve `Favorite` si se marcó, `null` si se desmarcó.

---

## Query disponible

```graphql
# Buscar personajes con filtros (incluye comments y favorite)
{
  characters(filter: { status: "Alive", species: "Human" }) {
    id
    name
    status
    species
    gender
    origin
    location
    image
    comments {
      id
      characterId
      content
    }
    favorite {
      id
      characterId
    }
  }
}
```

## Mutations disponibles

```graphql
# Marcar/desmarcar favorito (devuelve Favorite o null)
mutation {
  toggleFavorite(characterId: 1) {
    id
    characterId
    createdAt
  }
}

# Agregar comentario
mutation {
  addComment(characterId: 1, content: "Wubba lubba dub dub!") {
    id
    characterId
    content
    createdAt
  }
}

# Eliminar comentario
mutation {
  deleteComment(id: 1)
}
```

---

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Levanta con tsx watch (hot-reload) |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Ejecuta el build compilado |
| `npm run db:migrate` | Ejecuta migraciones pendientes |
| `npm run db:seed` | Ejecuta seeders |
| `npm run db:undo` | Revierte todas las migraciones |
| `npm run db:reset` | Undo + migrate + seed |
| `npm test` | Ejecuta unit tests con Vitest |

---

## Patrones de diseño aplicados

| Patrón | Dónde |
|--------|-------|
| Cache-Aside | `cache/character.cache.ts` + `services/character.service.ts` |
| Repository | `services/character.service.ts` (abstrae acceso a datos) |
| Decorator | `decorators/executionTime.decorator.ts` → `@ExecutionTime` |
| Singleton | `config/database.ts` + `config/redis.ts` |
