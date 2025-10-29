import type { Renderer } from '@fluentui/react-northstar-fela-renderer';
import * as React from 'react';

function useInsertionEffectFallback(callback: () => void) {
  callback();
}

// String concatenation is used to prevent bundlers to complain with older versions of React
// eslint-disable-next-line no-useless-concat
const useInsertionEffectWithFallback = (React as never)['useInsertion' + 'Effect']
  ? // eslint-disable-next-line no-useless-concat
    (React as never)['useInsertion' + 'Effect']
  : useInsertionEffectFallback;

export function useInsertPendingRules(renderer: Renderer) {
  // Heads up!
  // Regular "useInsertionEffect" will be used without dependencies and run on every commit to ensure that
  // CSS rules are inserted. This should be cheap due checks in ".insertPendingRules()".
  useInsertionEffectWithFallback(() => {
    renderer.insertPendingRules();
  });
}
