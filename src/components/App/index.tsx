import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
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
  uri: 'https://rickandmortyapi.com/graphql',
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
