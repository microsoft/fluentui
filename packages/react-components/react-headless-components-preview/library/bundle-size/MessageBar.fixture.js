// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
  renderMessageBar,
  renderMessageBarActions,
  renderMessageBarBody,
  renderMessageBarTitle,
  useMessageBar,
  useMessageBarActions,
  useMessageBarActionsContextValues,
  useMessageBarBody,
  useMessageBarBodyContextValues,
  useMessageBarContext,
  useMessageBarContextValues,
  useMessageBarTitle,
} from '@fluentui/react-headless-components-preview/message-bar';

console.log(
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
  renderMessageBar,
  renderMessageBarActions,
  renderMessageBarBody,
  renderMessageBarTitle,
  useMessageBar,
  useMessageBarActions,
  useMessageBarActionsContextValues,
  useMessageBarBody,
  useMessageBarBodyContextValues,
  useMessageBarContext,
  useMessageBarContextValues,
  useMessageBarTitle,
);

export default {
  name: '@fluentui/react-headless-components-preview/message-bar',
};
