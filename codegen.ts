import { CodegenConfig } from '@graphql-codegen/cli'

export default {
  schema: 'https://rickandmortyapi.com/graphql',
  documents: ['src/**/*.tsx'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
} satisfies CodegenConfig
