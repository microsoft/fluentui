export { MessageBarBody, messageBarBodyClassNames, useMessageBarBodyStyles } from './components/MessageBarBody';
export type {
  MessageBarBodyContextValues,
  MessageBarBodyProps,
  MessageBarBodySlots,
  MessageBarBodyState,
} from './components/MessageBarBody';

/** Headless building blocks, re-exported for consumers composing their own MessageBarBody. */
export {
  renderMessageBarBody,
  useMessageBarBody,
  useMessageBarBodyContextValues,
} from '@fluentui/react-headless-components-preview/message-bar';
