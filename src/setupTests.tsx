// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { PropsWithChildren } from 'react'
import '@testing-library/jest-dom'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => `t(${key})` }),
}))

jest.mock('react-router-dom', () => {
  const __linkOnClick = jest.fn()

  return {
    Link: ({ children, to }: PropsWithChildren<{ to: string }>) => <a onClick={() => __linkOnClick(to)}>{children}</a>,
    __linkOnClick,
    Outlet: () => <></>,
    useParams: () => ({ characterId: 1 }),
    useRouteError: jest.fn(() => new Error('__route_error__')),
  }
})

declare module 'react-router-dom' {
  export function __linkOnClick(): void
}
