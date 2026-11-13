// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Link,
  LinkContextProvider,
  linkContextDefaultValue,
  renderLink,
  useLink,
  useLinkContext,
} from '@fluentui/react-headless-components-preview/link';

console.log(Link, LinkContextProvider, linkContextDefaultValue, renderLink, useLink, useLinkContext);

export default {
  name: '@fluentui/react-headless-components-preview/link',
};
