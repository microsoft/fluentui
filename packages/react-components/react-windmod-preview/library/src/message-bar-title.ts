export {
  MessageBarTitle,
  messageBarTitleClassNames,
  useMessageBarTitleStyles,
} from './components/MessageBar/MessageBarTitle';
export type {
  MessageBarTitleProps,
  MessageBarTitleSlots,
  MessageBarTitleState,
} from './components/MessageBar/MessageBarTitle';

/** Headless building blocks, re-exported for consumers composing their own MessageBarTitle. */
export { renderMessageBarTitle, useMessageBarTitle } from '@fluentui/react-headless-components-preview/message-bar';
