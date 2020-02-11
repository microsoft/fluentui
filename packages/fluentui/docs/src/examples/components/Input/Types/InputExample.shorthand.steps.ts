import { Input } from '@fluentui/react'

const config: ScreenerTestsConfig = {
  steps: [builder => builder.focus(`.${Input.className} input`).snapshot('Can be focused')],
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
}

export default config
