export { MessageBar, messageBarClassNames, useMessageBarStyles } from './components/MessageBar';
export type {
  MessageBarContextValues,
  MessageBarIntent,
  MessageBarProps,
  MessageBarShape,
  MessageBarSlots,
  MessageBarState,
} from './components/MessageBar';

/** Headless building blocks, re-exported for consumers composing their own MessageBar. */
export {
  renderMessageBar,
  useMessageBar,
  useMessageBarContext,
  useMessageBarContextValues,
} from '@fluentui/react-headless-components-preview/message-bar';
