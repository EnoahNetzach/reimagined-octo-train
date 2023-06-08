import { Outlet } from 'react-router-dom'
import Characters from '~/components/Characters'

export default function MainLayout() {
  return (
    <div className="p-4 h-screen grid gap-8 grid-cols-1 grid-rows-none md:grid-cols-main md:grid-rows-1 text-white bg-black">
      <aside className="order-2 md:order-1 md:overflow-scroll">
        <Characters />
      </aside>

      <main className="order-1 md:order-2 md:max-w-3xl md:overflow-scroll">
        <Outlet />
      </main>
    </div>
  )
}
