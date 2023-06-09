import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { RetryLink } from '@apollo/client/link/retry'
import Character from '~/components/Character'
import ErrorPage from '~/components/ErrorPage'
import MainLayout from '~/components/MainLayout'
import { basePath } from '~/configs'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [{ path: '/character/:characterId', element: <Character />, errorElement: <ErrorPage /> }],
    },
  ],
  {
    basename: basePath,
  },
)

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: ['filter'],
            merge: (existing = {}, incoming) => ({
              ...existing,
              ...incoming,
              results: [...(existing.results ?? []), ...(incoming.results ?? [])],
            }),
          },
        },
      },
    },
  }),
  link: new RetryLink({ attempts: { max: Infinity }, delay: { initial: 100 } }).concat(
    new BatchHttpLink({ uri: 'https://rickandmortyapi.com/graphql' }),
  ),
})

export default function App() {
  return (
    <Suspense fallback={null}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </Suspense>
  )
}
