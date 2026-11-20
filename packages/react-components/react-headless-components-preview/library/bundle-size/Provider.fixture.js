// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Provider,
  renderProvider,
  useProvider,
  useProviderContext,
  useProviderContextValues,
} from '@fluentui/react-headless-components-preview/provider';

console.log(Provider, renderProvider, useProvider, useProviderContext, useProviderContextValues);

export default {
  name: '@fluentui/react-headless-components-preview/provider',
};
