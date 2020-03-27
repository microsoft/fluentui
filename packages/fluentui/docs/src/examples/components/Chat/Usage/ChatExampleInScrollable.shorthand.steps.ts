import { Chat, ChatItem, ChatMessage, MenuItem } from '@fluentui/react-northstar';

const selectors = {
  chat: `.${Chat.className}`,
  item: (itemIndex: number) => `.${ChatItem.className}:nth-child(${itemIndex}) .${ChatMessage.className}`,
  moreAction: (itemIndex: number) =>
    `.${ChatItem.className}:nth-child(${itemIndex}) .${ChatMessage.slotClassNames.actionMenu} :nth-child(7) .${MenuItem.className}`,
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
  ],
};

export default config;
