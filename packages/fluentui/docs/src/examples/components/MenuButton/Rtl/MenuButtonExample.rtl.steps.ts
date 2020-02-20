import { Button } from '@fluentui/react'

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(`.${Button.className}`).snapshot('RTL: Shows menuButton')],
}

export default config
