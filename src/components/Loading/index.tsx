import { useTranslation } from 'react-i18next'
import portal from './portal.png'

export default function Loading() {
  const { t } = useTranslation()

  return (
    <span className="inline-block -scale-x-50">
      <img alt={t('loading') ?? ''} className="animate-loading motion-reduce:animate-pulse" src={portal} />
    </span>
  )
}
