import { coreComponents } from './components/core';
import { describeParity } from './harness';

/**
 * App styles that don't target a component: a global reset stylesheet loaded before everything else, and
 * `makeResetStyles()` classes, which Griffel orders before every atomic class. Run with `FUI_PARITY_LAYER=1` to see how
 * a cascade layer around Fluent CSS Modules changes the result.
 */
describeParity('app global styles', coreComponents, {
  scenarios: ['global reset CSS', 'app reset styles', 'app reset styles with makeStyles'],
});
