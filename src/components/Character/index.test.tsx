import { createRenderer } from 'react-test-renderer/shallow'
import * as apolloClient from '@apollo/client'
import { QueryResult } from '@apollo/client'
import { render } from '@testing-library/react'
import Character from '.'

const mockCharacter = {
  episode: [
    {
      air_date: '__character_episode_air_date__',
      id: '__character_episode_id__',
      name: '__character_episode_name__',
    },
  ],
  gender: '__character_gender__',
  id: '__character_id__',
  image: '__character_image__',
  location: {
    dimension: '__character_location_dimension__',
    id: '__character_location_id__',
    name: '__character_location_name__',
    residents: Array.from({ length: 5 }),
    type: '__character_location_type__',
  },
  name: '__character_name__',
  origin: {
    dimension: '__character_origin_dimension__',
    id: '__character_origin_id__',
    name: '__character_origin_name__',
    residents: Array.from({ length: 6 }),
    type: '__character_origin_type__',
  },
  species: '__character_species__',
  status: '__character_status__',
  type: '__character_type__',
}

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(() => ({
    data: {
      character: mockCharacter,
    },
    loading: false,
  })),
}))

jest.mock('~/__generated__', () => ({ gql: jest.fn() }))

jest.mock('~/utils/getCharacterStatusColor', () => () => '__character_status_color__')

describe('Character', () => {
  it('mounts', () => {
    const renderer = createRenderer()
    renderer.render(<Character />)
    expect(renderer.getRenderOutput()).toMatchSnapshot()
  })

  it('loads', () => {
    jest.spyOn(apolloClient, 'useQuery').mockReturnValueOnce({
      loading: true,
    } as QueryResult<unknown>)

    const renderer = createRenderer()
    renderer.render(<Character />)
    expect(renderer.getRenderOutput()).toMatchSnapshot()
  })

  it('has the correct data', () => {
    const { queryByText } = render(<Character />)
    expect(queryByText('__character_name__')).toBeInTheDocument()
    expect(queryByText('__character_species__')).toBeInTheDocument()
    expect(document.querySelector('img[src="__character_image__"]')).not.toBeNull()
    expect(queryByText('__character_origin_name__')).toBeInTheDocument()
    expect(queryByText('t(origin.unknown)')).not.toBeInTheDocument()
    expect(queryByText('__character_location_name__')).toBeInTheDocument()
    expect(queryByText('t(location.unknown)')).not.toBeInTheDocument()
  })

  it('has the correct data when the location and origin are unknown', () => {
    jest.spyOn(apolloClient, 'useQuery').mockReturnValueOnce({
      data: {
        character: {
          ...mockCharacter,
          origin: null,
          location: null,
        },
      },
      loading: false,
    } as QueryResult<unknown>)

    const { queryByText } = render(<Character />)
    expect(queryByText('__character_origin_name__')).not.toBeInTheDocument()
    expect(queryByText('t(origin.unknown)')).toBeInTheDocument()
    expect(queryByText('__character_location_name__')).not.toBeInTheDocument()
    expect(queryByText('t(location.unknown)')).toBeInTheDocument()
  })
})
