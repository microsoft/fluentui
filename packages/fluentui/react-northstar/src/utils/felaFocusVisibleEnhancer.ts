import { IRenderer } from 'fela';
import { RULE_TYPE } from 'fela-utils';
import * as _ from 'lodash';

type Renderer = IRenderer & {
  cache: Record<string, RendererChange>;
  _emitChange?: (change: RendererChange) => void;
};

type RendererChange = {
  type: 'RULE' | 'KEYFRAME' | 'FONT' | 'STATIC' | 'CLEAR';
  className: string;
  selector: string;
  declaration: Object;
  pseudo: string;
  media: string;
  support: string;
};

/**
 * A Fela enhancer that allows to use `:focus-visible`. Uses `what-input` library and its global
 * selector. Modifies generated selectors:
 * `.a:focus-visible {}` => `html[data-whatinput="keyboard"] a:focus`.
 */
const felaFocusVisibleEnhancer = (renderer: Renderer) => {
  const existingEmitChange = renderer._emitChange.bind(renderer);

  renderer._emitChange = (change: RendererChange) => {
    if (change.type === RULE_TYPE && change.selector.indexOf(':focus-visible') !== -1) {
      const pseudo = change.pseudo ? change.pseudo.replace(':focus-visible', ':focus') : undefined;
      const selector = `html[data-whatinput="keyboard"] ${change.selector.replace(':focus-visible', ':focus')}`;

      const declarationReference = _.findKey(renderer.cache, change);
      const enhancedChange = {
        ...change,
        pseudo,
        selector,
      };

      // Fela has two types for rendering:
      // - DOM via subscriptions that's why `_emitChange()` is replaced, it will notify all
      //   subscriptions
      // - static rendering, it directly accesses `.cache` via `clusterCache()` and generates
      //   stylesheets from changes
      renderer.cache[declarationReference] = enhancedChange;
      existingEmitChange(enhancedChange);

      return;
    }

    existingEmitChange(change);
  };

  return renderer;
};

export default felaFocusVisibleEnhancer;
