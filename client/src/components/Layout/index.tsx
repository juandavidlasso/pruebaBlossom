import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className='h-screen bg-white md:overflow-hidden'>
      <div className='flex h-full max-w-360 mx-auto'>
        <Outlet />
      </div>
    </div>
  )
}
