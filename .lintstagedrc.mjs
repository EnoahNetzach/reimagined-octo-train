export default {
  '*.{json,js,jsx,ts,tsx,md,html}': 'yarn lint:file',
  '*.{sh,yml,yaml,json,js,jsx,ts,tsx,md,html,css,feature}': 'yarn format:file',
  '.*': 'yarn format:file',
}
