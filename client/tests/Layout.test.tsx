import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@components/Layout'

describe('Layout', () => {
  it('renders child route content via Outlet', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<p>Child content</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('renders with max width container', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<p>Test</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )
    const wrapper = container.querySelector('.max-w-360')
    expect(wrapper).toBeInTheDocument()
  })
})
