import { Outlet } from 'react-router-dom'
import Characters from '~/components/Characters'

export default function MainLayout() {
  return (
    <div className="p-4 h-screen grid gap-8 grid-cols-main grid-rows-1 text-white bg-black">
      <aside className="overflow-scroll">
        <Characters />
      </aside>

      <main className="max-w-3xl overflow-scroll">
        <Outlet />
      </main>
    </div>
  )
}