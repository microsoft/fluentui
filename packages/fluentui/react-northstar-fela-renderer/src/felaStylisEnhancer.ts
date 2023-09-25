import { RULE_TYPE } from 'fela-utils';
// @ts-ignore
import _Stylis from 'stylis';

import { FelaRenderer, FelaRendererChange } from './types';

// `stylis@3` is a CJS library, there are known issues with them:
// https://github.com/rollup/rollup/issues/1267#issuecomment-446681320
const Stylis: typeof import('stylis') = (_Stylis as any).default || _Stylis;

// We use Stylis only for vendor prefixing, all other capabilities are disabled
const stylis = new Stylis({
  cascade: false,
  compress: false,
  global: false,
  keyframe: false,
  preserve: false,
  semicolon: false,
});

export const felaStylisEnhancer = (renderer: FelaRenderer) => {
  const existingEmitChange = renderer._emitChange.bind(renderer);

  renderer._emitChange = (change: FelaRendererChange) => {
    if (change.type === RULE_TYPE) {
      const prefixed: string = stylis('', change.declaration);

      // Fela uses objects by references, it's safe to override properties
      change.declaration = prefixed.slice(1, -1);
    }

    existingEmitChange(change);
  };

  return renderer;
};
