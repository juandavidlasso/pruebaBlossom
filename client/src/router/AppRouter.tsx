import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@components/Layout'
import { Loading } from '@components/Loading'

const LazyCharacterListPage = lazy(() => import('@pages/character/CharacterListPage'))

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Suspense fallback={<Loading visible />}><LazyCharacterListPage /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
