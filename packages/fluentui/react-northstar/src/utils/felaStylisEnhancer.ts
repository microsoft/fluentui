import { RULE_TYPE } from 'fela-utils';
import { compile, middleware, prefixer, serialize, stringify } from 'stylis';

import { Renderer, RendererChange } from './types';

const felaStylisEnhancer = (renderer: Renderer) => ({
  ...renderer,
  _emitChange: (change: RendererChange) => {
    if (change.type === RULE_TYPE) {
      const prefixed: string = serialize(compile(change.declaration), middleware([prefixer, stringify]));

      // Fela uses objects by references, it's safe to override properties
      change.declaration = prefixed.slice(0, -1);
    }

    renderer._emitChange(change);
  },
});

export default felaStylisEnhancer;
