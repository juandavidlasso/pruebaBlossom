export interface Comment {
  id: number
  characterId: number
  content: string
  createdAt: string
}

export interface AddCommentResponse {
  addComment: Comment
}

export interface DeleteCommentResponse {
  deleteComment: boolean
}
