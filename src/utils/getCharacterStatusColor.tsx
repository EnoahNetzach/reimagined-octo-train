export default function getCharacterStatusColor(character: { status?: string | null }) {
  switch (character.status?.toLowerCase()) {
    case 'alive':
      return 'bg-green-500' as const
    case 'dead':
      return 'bg-rose-500' as const
    default:
      return 'bg-gray-500' as const
  }
}
