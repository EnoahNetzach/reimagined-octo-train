import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { gql } from './__generated__'
import { Character } from './__generated__/graphql.ts'
import getCharacterStatusColor from './getCharacterStatusColor.tsx'

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $filter: String) {
    characters(page: $page, filter: { name: $filter }) {
      info {
        count
      }
      results {
        id
        name
        status
        species
        image
        location {
          id
          name
        }
        episode {
          id
          name
        }
      }
    }
  }
`

export default function Characters() {
  const { characterId } = useParams()

  const [filter, setFilter] = useState('')
  const [latestPageLoaded, setLatestPageLoaded] = useState(1)

  useEffect(() => {
    setLatestPageLoaded(1)
  }, [filter])

  const { data, fetchMore, loading } = useQuery(GET_CHARACTERS, { variables: { filter, page: latestPageLoaded } })

  const loadMore = useCallback(async () => {
    try {
      const nextPage = latestPageLoaded + 1
      await fetchMore({ variables: { page: nextPage } })
      setLatestPageLoaded(nextPage)
    } catch {
      // ignore
    }
  }, [fetchMore, latestPageLoaded])

  return (
    <div className="flex gap-4 flex-col">
      <div className="sticky self-start top-0 bg-gray-900 w-full p-2">
        <label>
          Filter: <input onChange={(event) => setFilter(event.target.value)} value={filter} />
        </label>
      </div>

      {loading ? (
        'loading...'
      ) : (
        <>
          {data?.characters?.results
            ?.map((character: Character) =>
              character ? (
                <Link key={character.id} to={`/character/${character.id}`}>
                  <figure
                    aria-selected={characterId === character.id}
                    className={`flex gap-4 flex-row ${characterId === character.id ? 'bg-gray-800' : 'bg-gray-900'}`}
                  >
                    <img alt="" className="object-cover max-h-24 max-w-24" src={character.image} />

                    <figcaption className="flex-grow">
                      <h2 className="text-lg font-bold text-primary">{character.name}</h2>

                      <section>
                        <span
                          aria-description="Status"
                          className={`inline-block rounded-full w-2 h-2 ${getCharacterStatusColor(character)}`}
                        />{' '}
                        {character.status} - {character.species}
                      </section>

                      <section>
                        <h3 className="text-secondary">Last known location:</h3>
                        {character.location?.name ?? 'unknown'}
                      </section>

                      <section>
                        <h3 className="text-secondary">First seen in:</h3>
                        {character.episode[0]?.name}
                      </section>
                    </figcaption>
                  </figure>
                </Link>
              ) : null,
            )
            .filter(Boolean)}

          {data?.characters.info.count > data?.characters?.results.length ? (
            <div>
              <button onClick={loadMore}>Load more</button>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
