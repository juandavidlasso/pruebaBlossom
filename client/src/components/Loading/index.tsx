interface Props {
  visible: boolean
}

export function Loading({ visible }: Props) {
  if (!visible) return null
  return (
    <div className='fixed inset-0 w-screen h-screen z-50 flex items-center justify-center bg-gray-500/80'>
      <div className='flex flex-col items-center gap-3'>
        <div className='w-10 h-10 border-4 border-gray-400 border-t-green-400 rounded-full animate-spin' />
        <p className='text-white text-lg'>Cargando...</p>
      </div>
    </div>
  )
}
