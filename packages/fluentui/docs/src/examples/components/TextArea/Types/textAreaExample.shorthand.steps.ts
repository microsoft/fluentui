import { TextArea } from '@fluentui/react'

const config: ScreenerTestsConfig = {
  steps: [builder => builder.focus(`.${TextArea.className}`).snapshot('Can be focused')],
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
}

export default config
