import { isObject } from './utils/isObject';

/* eslint-disable */

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
