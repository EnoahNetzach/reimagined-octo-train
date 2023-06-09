import { PropsWithChildren } from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import App from '.'

jest.mock('@apollo/client', () => ({
  ApolloClient: class {
    options: unknown
    constructor(options: unknown) {
      this.options = options
    }
  },
  ApolloProvider: ({ children }: PropsWithChildren) => <>{children}</>,
  BatchHttpLink: class {
    options: unknown
    constructor(options: unknown) {
      this.options = options
    }
  },
  InMemoryCache: class {
    options: unknown
    constructor(options: unknown) {
      this.options = options
    }
  },
  RetryLink: class {
    options: unknown
    constructor(options: unknown) {
      this.options = options
    }
  },
}))

jest.mock('@apollo/client/link/batch-http', () => ({
  BatchHttpLink: class {
    options: unknown
    constructor(options: unknown) {
      this.options = options
    }
  },
}))

jest.mock('@apollo/client/link/retry', () => ({
  RetryLink: class {
    next: unknown
    options: unknown
    constructor(options: unknown) {
      this.options = options
    }
    concat(next: unknown) {
      this.next = next
      return this
    }
  },
}))

jest.mock('react-router-dom', () => ({
  createBrowserRouter: (routes: unknown[]) => routes,
  RouterProvider: ({ children }: PropsWithChildren) => <>{children}</>,
}))

jest.mock(
  '~/components/Character',
  () =>
    function Character() {
      return <>Character Mock</>
    },
)

jest.mock(
  '~/components/ErrorPage',
  () =>
    function ErrorPage() {
      return <>ErrorPage Mock</>
    },
)

jest.mock(
  '~/components/MainLayout',
  () =>
    function MainLayout() {
      return <>MainLayout Mock</>
    },
)

describe('App', () => {
  it('mounts', () => {
    const renderer = createRenderer()
    renderer.render(<App />)
    expect(renderer.getRenderOutput()).toMatchSnapshot()
  })
})
