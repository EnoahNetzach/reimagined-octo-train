import { useTranslation } from 'react-i18next'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const { t } = useTranslation()
  const error = useRouteError()
  console.error(error)

  return (
    <main>
      <h1>{t('error.title')}</h1>

      <p>{t('error.body')}</p>
    </main>
  )
}
