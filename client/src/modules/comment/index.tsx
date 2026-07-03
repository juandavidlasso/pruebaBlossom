import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { Comment, DeleteCommentResponse } from '@appTypes/comment/comment.types'
import { DELETE_COMMENT } from '@graphql/mutations/comment/comment.mutation'
import { GET_CHARACTERS } from '@graphql/queries/character/characters.query'
import { formatDate } from '@lib/utils'

interface CommentListProps {
  comments?: Comment[]
}

export function CommentList({ comments }: CommentListProps) {
  const [deleteComment] = useMutation<DeleteCommentResponse>(DELETE_COMMENT, {
    refetchQueries: [{ query: GET_CHARACTERS, variables: { filter: {} } }],
  })

  const handleDelete = async (id: number) => {
    try {
      await deleteComment({ variables: { id } })
      toast.success('El comentario se eliminó exitosamente')
    } catch {
      toast.error('No se pudo eliminar el comentario')
    }
  }

  const sortedComments = [...(comments || [])].sort((a, b) => b?.id - a?.id)

  if (sortedComments?.length === 0) {
    return <p className='text-gray-500 text-sm'>No hay comentarios aún.</p>
  }

  return (
    <div className='space-y-3'>
      {sortedComments?.map((comment) => (
        <div
          key={comment.id}
          className='bg-gray-800 rounded-lg p-3 flex justify-between items-start gap-2'
        >
          <div>
            <p className='text-white'>{comment.content}</p>
            <p className='text-gray-500 text-xs mt-1'>{formatDate(comment?.createdAt)}</p>
          </div>
          <button
            onClick={() => handleDelete(comment.id)}
            className='text-white hover:bg-red-500 text-sm shrink-0 bg-red-700 rounded-full w-8 h-8 cursor-pointer font-extrabold'
            style={{
              transform: 'translateY(20%)',
            }}
            title='Eliminar comentario'
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
