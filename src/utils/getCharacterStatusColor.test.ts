import { Character } from '~/__generated__/graphql'
import getCharacterStatusColor from './getCharacterStatusColor'

describe('getCharacterStatusColor', () => {
  it('returns the expected color class when alive', () => {
    expect(getCharacterStatusColor({ status: 'Alive' } as Character)).toMatchInlineSnapshot(`"bg-green-500"`)
  })

  it('returns the expected color class when dead', () => {
    expect(getCharacterStatusColor({ status: 'Dead' } as Character)).toMatchInlineSnapshot(`"bg-rose-500"`)
  })

  it('is case insensitive', () => {
    expect(getCharacterStatusColor({ status: 'aLIVe' } as Character)).toMatchInlineSnapshot(`"bg-green-500"`)
    expect(getCharacterStatusColor({ status: 'DeAD' } as Character)).toMatchInlineSnapshot(`"bg-rose-500"`)
  })

  it('returns the default color class by default', () => {
    expect(getCharacterStatusColor({ status: 'this is not a valid status' } as Character)).toMatchInlineSnapshot(
      `"bg-gray-500"`,
    )
  })
})
