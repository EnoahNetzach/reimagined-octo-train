import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { gql } from './__generated__'
import getCharacterStatusColor from './getCharacterStatusColor.tsx'

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      gender
      species
      type
      image
      origin {
        id
        name
        type
        dimension
        residents {
          id
        }
      }
      location {
        id
        name
        type
        dimension
        residents {
          id
        }
      }
      episode {
        id
        name
        air_date
      }
    }
  }
`

const dateFormatter = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(Date.parse(date)))

export default function Character() {
  const { characterId } = useParams()
  const { data, loading } = useQuery(GET_CHARACTER, { variables: { id: characterId } })
  const { character } = data ?? {}

  return (
    <article className="isolate grid gap-2 grid-cols-1">
      {loading ? (
        'loading...'
      ) : (
        <>
          <img alt="" className="object-cover max-h-96 max-w-96" src={character.image} />

          <h1 className="text-6xl font-bold text-primary">{character.name}</h1>

          <section>
            <span
              aria-description="Status"
              className={`inline-block rounded-full w-2 h-2 ${getCharacterStatusColor(character)}`}
            />{' '}
            {character.status}
          </section>

          <section>
            <h3 className="text-secondary inline-block">Species:</h3> {character.species}
            {character.type ? <span> ({character.type})</span> : null}
          </section>

          <section>
            <h3 className="text-secondary inline-block">Gender:</h3> {character.gender}
          </section>

          <section>
            <h3 className="text-secondary">Origin:</h3>

            {character.origin.id ? (
              <details>
                <summary>{character.origin.name}</summary>

                <div className="py-0 px-4">
                  <h4 className="text-ternary inline-block">Type:</h4> {character.origin.type}
                  <br />
                  <h4 className="text-ternary inline-block">Dimension:</h4> {character.origin.dimension}
                  <br />
                  <h4 className="text-ternary inline-block">Known residents:</h4> {character.origin.residents.length}
                </div>
              </details>
            ) : (
              character.origin.name
            )}
          </section>

          <section>
            <h3 className="text-secondary">Last known location:</h3>
            {character.location.id ? (
              <details>
                <summary>{character.location.name}</summary>

                <div className="py-0 px-4">
                  <h4 className="text-ternary inline-block">Type:</h4> {character.location.type}
                  <br />
                  <h4 className="text-ternary inline-block">Dimension:</h4> {character.location.dimension}
                  <br />
                  <h4 className="text-ternary inline-block">Known residents:</h4> {character.location.residents.length}
                </div>
              </details>
            ) : (
              character.location.name
            )}
          </section>

          <section>
            <h3 className="text-secondary">Appeared in:</h3>
            <details>
              <summary>{character.episode.length} episodes</summary>

              {character.episode.map((episode) => (
                <div className="py-0 px-4" key={episode.id}>
                  <h4 className="text-ternary inline-block">{episode.name}</h4> aired {dateFormatter(episode.air_date)}
                </div>
              ))}
            </details>
          </section>
        </>
      )}
    </article>
  )
}
