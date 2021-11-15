import { RULE_TYPE } from 'fela-utils';
import { compile, middleware, serialize, stringify, prefixer } from 'stylis';

import { FelaRenderer, FelaRendererChange } from './types';

export const felaStylisEnhancer = (renderer: FelaRenderer) => {
  const existingEmitChange = renderer._emitChange.bind(renderer);

  renderer._emitChange = (change: FelaRendererChange) => {
    if (change.type === RULE_TYPE) {
      const prefixed: string = serialize(compile(change.declaration), middleware([prefixer, stringify]));

      // Fela uses objects by references, it's safe to override properties
      change.declaration = prefixed.slice(0, -1);
    }

    existingEmitChange(change);
  };

  return renderer;
};
