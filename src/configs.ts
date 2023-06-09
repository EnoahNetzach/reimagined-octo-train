export const basePath = process.env.NODE_ENV === 'production' ? import.meta.env.BASE_URL : '/'

export const assetsHash =
  process.env.NODE_ENV === 'production' ? import.meta.env.VITE_PUBLIC_HASH : new Date().getTime()
