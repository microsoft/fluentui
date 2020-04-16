import { Chat, ChatItem, ChatMessage, MenuItem } from '@fluentui/react-northstar';

const selectors = {
  chat: `.${Chat.deprecated_className}`,
  item: (itemIndex: number) =>
    `.${ChatItem.deprecated_className}:nth-child(${itemIndex}) .${ChatMessage.deprecated_className}`,
  maxActions: '#actions-to-max',
  moreAction: (itemIndex: number) =>
    `.${ChatItem.deprecated_className}:nth-child(${itemIndex}) .${ChatMessage.slotClassNames.actionMenu} :nth-child(7) .${MenuItem.deprecated_className}`,
};

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
    builder =>
      builder
        .executeScript(`document.querySelector("${selectors.chat}").parentNode.scrollTop = 10`)
        .hover(selectors.item(1))
        .snapshot('Hovers first message in scrolled view: actions are visible')
        .executeScript(`document.querySelector("${selectors.chat}").parentNode.scrollTop = 20`)
        .hover(selectors.item(1))
        .snapshot('Hovers first message in scrolled view: actions are hidden'),
    builder =>
      builder
        .click(selectors.item(2))
        .click(selectors.moreAction(2))
        .snapshot('Clicks first message in scrolled view and opens a menu'),
    builder =>
      builder
        .click(selectors.maxActions)
        .hover(selectors.item(3))
        .snapshot('Hovers third message')
        .hover(selectors.item(4))
        .snapshot('Hovers fourth message'),
  ],
};

export default config;
