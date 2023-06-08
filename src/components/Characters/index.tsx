import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { gql } from '~/__generated__'
import { Character } from '~/__generated__/graphql'
import getCharacterStatusColor from '~/utils/getCharacterStatusColor'

const GET_CHARACTERS = gql(/* GraphQL */ `
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
`)

export default function Characters() {
  const { t } = useTranslation()
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
      <div className="sticky self-start top-0 bg-gray-900 w-full p-2 flex gap-2">
        <label className="self-center" htmlFor="main-search">
          {t('list.filter')}
        </label>
        <input
          className="w-full p-1"
          id="main-search"
          onChange={(event) => setFilter(event.target.value)}
          value={filter}
        />
      </div>

      {loading ? (
        t('loading')
      ) : (
        <nav aria-label="Customer service" className="contents">
          {data?.characters?.results
            ?.filter((character: unknown): character is Character => !!character)
            .map((character: Character) =>
              character ? (
                <Link aria-current={characterId === character.id} key={character.id} to={`/character/${character.id}`}>
                  <figure
                    className={`flex gap-4 flex-row p-2 ${
                      characterId === character.id ? 'bg-gray-800' : 'bg-gray-900'
                    }`}
                    role="row"
                  >
                    <img
                      alt=""
                      className="self-center object-cover h-24 w-24"
                      fetchPriority="low"
                      src={character.image ?? ''}
                    />

                    <figcaption className="flex-grow">
                      <h2 className="text-lg font-bold text-primary">{character.name}</h2>

                      <section>
                        <span
                          aria-description={t('character.status')}
                          className={`inline-block rounded-full w-2 h-2 ${getCharacterStatusColor(character)}`}
                        />{' '}
                        {t(`character.status.${character.status?.toLowerCase()}`)} - {character.species}
                      </section>

                      <section>
                        <h3 className="text-secondary">{t('location.name')}</h3>
                        {character.location?.id ? character.location.name : t('location.unknown')}
                      </section>

                      <section>
                        <h3 className="text-secondary">{t('episode.first.name')}</h3>
                        {character.episode[0]?.name}
                      </section>
                    </figcaption>
                  </figure>
                </Link>
              ) : null,
            )
            .filter(Boolean)}

          {(data?.characters?.info?.count ?? 0) > (data?.characters?.results?.length ?? 0) ? (
            <div>
              <button onClick={loadMore}>{t('list.loadMore')}</button>
            </div>
          ) : null}
        </nav>
      )}
    </div>
  )
}
