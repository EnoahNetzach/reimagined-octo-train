import * as reactRouterDOM from 'react-router-dom'
import { createRenderer } from 'react-test-renderer/shallow'
import * as apolloClient from '@apollo/client'
import { QueryResult } from '@apollo/client'
import { fireEvent, render } from '@testing-library/react'
import Characters from '.'

const mockCharacter = (n: number) => ({
  episode: [
    {
      air_date: `__character_${n}_episode_air_date__`,
      id: `__character_${n}_episode_id__`,
      name: `__character_${n}_episode_name__`,
    },
  ],
  gender: `__character_${n}_gender__`,
  id: `__character_${n}_id__`,
  image: `__character_${n}_image__`,
  location: {
    dimension: `__character_${n}_location_dimension__`,
    id: `__character_${n}_location_id__`,
    name: `__character_${n}_location_name__`,
    residents: Array.from({ length: 5 }),
    type: `__character_${n}_location_type__`,
  },
  name: `__character_${n}_name__`,
  origin: {
    dimension: `__character_${n}_origin_dimension__`,
    id: `__character_${n}_origin_id__`,
    name: `__character_${n}_origin_name__`,
    residents: Array.from({ length: 6 }),
    type: `__character_${n}_origin_type__`,
  },
  species: `__character_${n}_species__`,
  status: `__character_${n}_status__`,
  type: `__character_${n}_type__`,
})

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(() => ({
    data: {
      characters: { info: { count: 4 }, results: [mockCharacter(1), mockCharacter(2), mockCharacter(3)] },
    },
    loading: false,
  })),
}))

jest.mock('~/__generated__', () => ({ gql: jest.fn() }))

jest.mock('~/utils/getCharacterStatusColor', () => () => '__character_1_status_color__')

describe('Characters', () => {
  it('mounts', () => {
    const renderer = createRenderer()
    renderer.render(<Characters />)
    expect(renderer.getRenderOutput()).toMatchSnapshot()
  })

  it('loads', () => {
    jest.spyOn(apolloClient, 'useQuery').mockReturnValueOnce({
      loading: true,
    } as QueryResult<unknown>)

    const renderer = createRenderer()
    renderer.render(<Characters />)
    expect(renderer.getRenderOutput()).toMatchSnapshot()
  })

  it('has the correct data', () => {
    const { queryByText } = render(<Characters />)
    expect(queryByText('__character_1_name__')).toBeInTheDocument()
    expect(document.querySelector('img[src="__character_1_image__"]')).not.toBeNull()
    expect(queryByText('__character_2_name__')).toBeInTheDocument()
    expect(document.querySelector('img[src="__character_2_image__"]')).not.toBeNull()
    expect(queryByText('__character_3_name__')).toBeInTheDocument()
    expect(document.querySelector('img[src="__character_3_image__"]')).not.toBeNull()
  })

  it('links to the correct profile when clicking to the character', () => {
    const { getByText } = render(<Characters />)

    fireEvent.click(getByText('__character_2_name__'))

    expect(reactRouterDOM.__linkOnClick).toHaveBeenCalledTimes(1)
    expect(reactRouterDOM.__linkOnClick).toHaveBeenCalledWith('/character/__character_2_id__')
  })
})
