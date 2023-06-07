import { useTranslation } from 'react-i18next'
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

export default function Character() {
  const { t } = useTranslation()
  const { characterId } = useParams()
  const { data, loading } = useQuery(GET_CHARACTER, { variables: { id: characterId } })
  const { character } = data ?? {}

  return (
    <article className="isolate grid gap-2 grid-cols-1">
      {loading ? (
        t('loading')
      ) : (
        <>
          <img alt="" className="object-cover max-h-96 max-w-96" src={character.image} />

          <h1 className="text-6xl font-bold text-primary">{character.name}</h1>

          <section>
            <span
              aria-description={t('character.status')}
              className={`inline-block rounded-full w-2 h-2 ${getCharacterStatusColor(character)}`}
            />{' '}
            {t(`character.status.${character.status?.toLowerCase()}`)}
          </section>

          <section>
            <h3 className="text-secondary inline-block">{t('character.species')}</h3> {character.species}
            {character.type ? <span> ({character.type})</span> : null}
          </section>

          <section>
            <h3 className="text-secondary inline-block">{t('character.gender')}</h3>{' '}
            {t(`character.gender.${character.gender?.toLowerCase()}`)}
          </section>

          <section>
            <h3 className={`text-secondary ${character.origin.id ? '' : 'inline-block'}`}>{t('origin.name')}</h3>

            {character.origin.id ? (
              <details>
                <summary>{character.origin.name}</summary>

                <div className="py-0 px-4">
                  <h4 className="text-ternary inline-block">{t('location.type')}</h4> {character.origin.type}
                  <br />
                  <h4 className="text-ternary inline-block">{t('location.dimension')}</h4>{' '}
                  {character.origin.dimension.toLowerCase() === 'unknown'
                    ? t('dimension.unknown')
                    : character.origin.dimension}
                  <br />
                  <h4 className="text-ternary inline-block">{t('location.residents')}</h4>{' '}
                  {character.origin.residents.length}
                </div>
              </details>
            ) : (
              ' ' + t('origin.unknown')
            )}
          </section>

          <section>
            <h3 className={`text-secondary ${character.location.id ? '' : 'inline-block'}`}>{t('location.name')}</h3>

            {character.location.id ? (
              <details>
                <summary>{character.location.name}</summary>

                <div className="py-0 px-4">
                  <h4 className="text-ternary inline-block">{t('location.type')}</h4> {character.location.type}
                  <br />
                  <h4 className="text-ternary inline-block">{t('location.dimension')}</h4>{' '}
                  {character.location.dimension.toLowerCase() === 'unknown'
                    ? t('dimension.unknown')
                    : character.location.dimension}
                  <br />
                  <h4 className="text-ternary inline-block">{t('location.residents')}</h4>{' '}
                  {character.location.residents.length}
                </div>
              </details>
            ) : (
              ' ' + t('location.unknown')
            )}
          </section>

          <section>
            <h3 className="text-secondary">{t('episode.list')}</h3>
            <details>
              <summary>{t('episode.number', { count: character.episode.length })}</summary>

              {character.episode.map((episode) => (
                <div className="py-0 px-4" key={episode.id}>
                  <h4 className="text-ternary inline-block">{episode.name}</h4>{' '}
                  {t('episode.aired', {
                    formatParams: { val: { year: 'numeric', month: 'short', day: 'numeric' } },
                    val: new Date(Date.parse(episode.air_date)),
                  })}
                </div>
              ))}
            </details>
          </section>
        </>
      )}
    </article>
  )
}
