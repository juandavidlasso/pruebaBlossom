export interface Favorite {
  id: number
  characterId: number
  createdAt: string
}

export interface ToggleFavoriteResponse {
  toggleFavorite: Favorite | null
}
