export const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Rick and Morty GraphQL API',
    version: '1.0.0',
    description:
      'API GraphQL para buscar personajes de Rick and Morty con filtros, favoritos y comentarios. Incluye cache con Redis y actualización automática cada 12 horas.',
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Development server',
    },
  ],
  paths: {
    '/graphql': {
      post: {
        summary: 'GraphQL endpoint',
        description: 'Endpoint principal para ejecutar queries y mutations GraphQL.',
        tags: ['GraphQL'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['query'],
                properties: {
                  query: {
                    type: 'string',
                    description: 'Query o Mutation GraphQL',
                  },
                  variables: {
                    type: 'object',
                    description: 'Variables de la query (opcional)',
                  },
                },
              },
              examples: {
                allCharacters: {
                  summary: 'Obtener todos los personajes',
                  value: {
                    query: '{ characters(filter: {}) { id name status species gender origin location image } }',
                  },
                },
                filterByStatus: {
                  summary: 'Filtrar por status',
                  value: {
                    query: '{ characters(filter: { status: "Alive" }) { id name status species } }',
                  },
                },
                filterBySpecies: {
                  summary: 'Filtrar por species',
                  value: {
                    query: '{ characters(filter: { species: "Human" }) { id name species gender } }',
                  },
                },
                filterByGender: {
                  summary: 'Filtrar por gender',
                  value: {
                    query: '{ characters(filter: { gender: "Male" }) { id name gender } }',
                  },
                },
                filterByName: {
                  summary: 'Buscar por nombre (parcial)',
                  value: {
                    query: '{ characters(filter: { name: "Rick" }) { id name status species } }',
                  },
                },
                filterByOrigin: {
                  summary: 'Filtrar por origin (parcial)',
                  value: {
                    query: '{ characters(filter: { origin: "Earth" }) { id name origin } }',
                  },
                },
                multipleFilters: {
                  summary: 'Combinar multiples filtros',
                  value: {
                    query: '{ characters(filter: { status: "Alive", species: "Human", gender: "Male" }) { id name status species gender origin } }',
                  },
                },
                getFavorites: {
                  summary: 'Obtener personajes favoritos',
                  value: {
                    query: '{ favorites { id name status species image } }',
                  },
                },
                checkFavorite: {
                  summary: 'Verificar si un personaje es favorito',
                  value: {
                    query: '{ isFavorite(characterId: 1) }',
                  },
                },
                toggleFavorite: {
                  summary: 'Marcar/desmarcar favorito (toggle)',
                  value: {
                    query: 'mutation { toggleFavorite(characterId: 1) { isFavorite characterId } }',
                  },
                },
                getComments: {
                  summary: 'Obtener comentarios de un personaje',
                  value: {
                    query: '{ comments(characterId: 1) { id content createdAt } }',
                  },
                },
                addComment: {
                  summary: 'Agregar comentario a un personaje',
                  value: {
                    query: 'mutation { addComment(characterId: 1, content: "Rick es el mejor!") { id content createdAt } }',
                  },
                },
                deleteComment: {
                  summary: 'Eliminar un comentario',
                  value: {
                    query: 'mutation { deleteComment(id: 1) }',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Respuesta exitosa',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'object',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/health': {
      get: {
        summary: 'Health check',
        description: 'Verifica que el servidor esté corriendo correctamente.',
        tags: ['Health'],
        responses: {
          '200': {
            description: 'Servidor activo',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    services: {
                      type: 'object',
                      properties: {
                        database: { type: 'string', example: 'initialized' },
                      },
                    },
                    timestamp: { type: 'string', example: '2026-06-17T21:00:00.000Z' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Character: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Rick Sanchez' },
          status: { type: 'string', enum: ['Alive', 'Dead', 'unknown'], example: 'Alive' },
          species: { type: 'string', example: 'Human' },
          type: { type: 'string', example: '' },
          gender: { type: 'string', enum: ['Female', 'Male', 'Genderless', 'unknown'], example: 'Male' },
          origin: { type: 'string', example: 'Earth (C-137)' },
          location: { type: 'string', example: 'Citadel of Ricks' },
          image: { type: 'string', example: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
          created: { type: 'string', example: '2017-11-04T18:48:46.250Z' },
        },
      },
      Comment: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          characterId: { type: 'integer', example: 1 },
          content: { type: 'string', example: 'Rick es el mejor!' },
          createdAt: { type: 'string', example: '2026-06-17T21:00:00.000Z' },
        },
      },
      ToggleFavoriteResponse: {
        type: 'object',
        properties: {
          isFavorite: { type: 'boolean', example: true },
          characterId: { type: 'integer', example: 1 },
        },
      },
    },
  },
  tags: [
    { name: 'GraphQL', description: 'Endpoint GraphQL para queries y mutations' },
    { name: 'Health', description: 'Health check del servidor' },
  ],
};