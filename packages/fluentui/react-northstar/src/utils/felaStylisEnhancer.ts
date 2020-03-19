import { RULE_TYPE } from 'fela-utils';
// @ts-ignore
import Stylis from 'stylis';

import { Renderer, RendererChange } from './types';

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
      // const pseudo = change.pseudo ? change.pseudo.replace(':focus-visible', ':focus') : undefined;
      // const selector = `html[data-whatinput="keyboard"] ${change.selector.replace(':focus-visible', ':focus')}`;

      // const declarationReference = _.findKey(renderer.cache, change);
      // const enhancedChange = {
      //   ...change,
      //   pseudo,
      //   selector
      // };

      // if (change.declaration === 'display:grid') {
      // console.log(change);
      const prefixed = stylis('', change.declaration);
      const enhancedChange = {
        ...change,
        declaration: prefixed.slice(1, -1),
      };
      // console.log(prefixed, change.declaration);
      // }

      // Fela has two types for rendering:
      // - DOM via subscriptions that's why `_emitChange()` is replaced, it will notify all
      //   subscriptions
      // - static rendering, it directly accesses `.cache` via `clusterCache()` and generates
      //   stylesheets from changes
      // renderer.cache[declarationReference] = enhancedChange;
      renderer._emitChange(enhancedChange);

      return;
    }

    renderer._emitChange(change);
  },
});

export default felaStylisEnhancer;
