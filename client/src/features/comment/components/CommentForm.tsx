import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { ADD_COMMENT } from '@graphql/mutations/comment/comment.mutation'
import { GET_CHARACTERS } from '@graphql/queries/character/characters.query'
import { AddCommentResponse } from '@appTypes/comment/comment.types'

interface CommentFormProps {
  characterId: number
}

export function CommentForm({ characterId }: CommentFormProps) {
  const [content, setContent] = useState('')

  const [addComment, { loading }] = useMutation<AddCommentResponse>(ADD_COMMENT, {
    refetchQueries: [{ query: GET_CHARACTERS, variables: { filter: {} } }],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    try {
      await addComment({ variables: { characterId, content: content.trim() } })
      toast.success('El comentario se registro exitosamente')
      setContent('')
    } catch {
      toast.error('No se pudo registrar el comentario')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Escribe un comentario...'
        className='flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder:text-white focus:outline-none focus:border-green-400'
      />
      <button
        type='submit'
        disabled={loading || !content.trim()}
        className='bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer disabled:cursor-default'
      >
        Enviar
      </button>
    </form>
  )
}
