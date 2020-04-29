import { RULE_TYPE } from 'fela-utils';
import * as Stylis from 'stylis';

import { Renderer, RendererChange } from './types';

// We use Stylis only for vendor prefixing, all other capabilities are disabled
const stylis = new Stylis({
  cascade: false,
  compress: false,
  global: false,
  keyframe: false,
  preserve: false,
  semicolon: false,
});

const felaStylisEnhancer = (renderer: Renderer) => ({
  ...renderer,
  _emitChange: (change: RendererChange) => {
    if (change.type === RULE_TYPE) {
      const prefixed: string = stylis('', change.declaration);

      // Fela uses objects by references, it's safe to override properties
      change.declaration = prefixed.slice(1, -1);
    }

    renderer._emitChange(change);
  },
});

export default felaStylisEnhancer;
