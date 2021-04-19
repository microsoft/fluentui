import { isObject } from './utils/isObject';

/* eslint-disable */

/**
 * A temporary solution that transforms passed theme to return CSS variables instead of actual values.
 *
 * @internal
 */
export function createCSSVariablesProxy<Tokens>(tokens: Tokens): Tokens {
  const g = {
    // @ts-ignore
    get(target: any, key: any) {
      if (isObject(target[key])) {
        // @ts-ignore
        return new Proxy({ ...target[key], value: (target.value ?? '') + '-' + key }, g);
      }

      return `var(-${target.value ?? ''}-${key})`;
    },
  };

  // @ts-ignore
  return new Proxy(tokens, g);
}
