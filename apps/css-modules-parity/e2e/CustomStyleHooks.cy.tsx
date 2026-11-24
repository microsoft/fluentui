import { coreComponents } from './components/core';
import { describeParity } from './harness';

/**
 * Global custom style hooks (`FluentProvider` `customStyleHooks_unstable`) beyond merging one class last: prepending,
 * classes picked from component state, and a nested provider with another theme and hook.
 */
describeParity('custom style hooks', coreComponents, {
  scenarios: ['custom style hook prepended', 'custom style hook reading state', 'nested provider custom style hook'],
});
