import { ChatItem, ChatMessage } from '@fluentui/react'

const selectors = {
  item: (itemIndex: number) =>
    `.${ChatItem.className}:nth-child(${itemIndex}) .${ChatMessage.className}`,
}

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .hover(selectors.item(1))
        .snapshot('Hovers first message')
        .hover(selectors.item(2))
        .snapshot('Hovers second message')
        .hover(selectors.item(3))
        .snapshot('Hovers third message'),
  ],
}

export default config
