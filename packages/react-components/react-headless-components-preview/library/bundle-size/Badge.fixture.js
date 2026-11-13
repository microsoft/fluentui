// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Badge,
  CounterBadge,
  PresenceBadge,
  renderBadge,
  renderCounterBadge,
  renderPresenceBadge,
  useBadge,
  useCounterBadge,
  usePresenceBadge,
} from '@fluentui/react-headless-components-preview/badge';

console.log(
  Badge,
  CounterBadge,
  PresenceBadge,
  renderBadge,
  renderCounterBadge,
  renderPresenceBadge,
  useBadge,
  useCounterBadge,
  usePresenceBadge,
);

export default {
  name: '@fluentui/react-headless-components-preview/badge',
};
