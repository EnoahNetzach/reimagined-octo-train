import { Character } from './__generated__/graphql.ts'

export default function getCharacterStatusColor(character: Character) {
  switch (character.status?.toLowerCase()) {
    case 'alive':
      return 'bg-green-500' as const
    case 'dead':
      return 'bg-rose-500' as const
    default:
      return 'bg-gray-500' as const
  }
}
