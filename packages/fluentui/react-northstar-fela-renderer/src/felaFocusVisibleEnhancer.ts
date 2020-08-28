import { RULE_TYPE } from 'fela-utils';
import { FelaRenderer, FelaRendererChange } from './types';

/**
 * A Fela enhancer that allows to use `:focus-visible`. Uses `what-input` library and its global
 * selector. Modifies generated selectors:
 * `.a:focus-visible {}` => `html[data-whatinput="keyboard"] a:focus`.
 */
export const felaFocusVisibleEnhancer = (renderer: FelaRenderer) => {
  const existingEmitChange = renderer._emitChange.bind(renderer);

  renderer._emitChange = (change: FelaRendererChange) => {
    if (change.type === RULE_TYPE && change.selector.indexOf(':focus-visible') !== -1) {
      // Fela uses objects by references, it's safe to override properties
      change.pseudo = change.pseudo ? change.pseudo.replace(':focus-visible', ':focus') : '';
      change.selector = `html[data-whatinput="keyboard"] ${change.selector.replace(':focus-visible', ':focus')}`;
    }

    existingEmitChange(change);
  };

  return renderer;
};
