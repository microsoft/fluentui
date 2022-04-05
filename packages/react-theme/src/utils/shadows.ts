import type { ShadowBrandTokens, ShadowTokens } from '../types';

export function createShadowTokens(ambientColor: string, keyColor: string, tokenSuffix: 'Brand'): ShadowBrandTokens;
export function createShadowTokens(ambientColor: string, keyColor: string): ShadowTokens;

export function createShadowTokens(ambientColor: string, keyColor: string, tokenSuffix: 'Brand' | '' = '') {
  return {
    [`shadow2${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 1px 2px ${keyColor}`,
    [`shadow4${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 2px 4px ${keyColor}`,
    [`shadow8${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 4px 8px ${keyColor}`,
    [`shadow16${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 8px 16px ${keyColor}`,
    [`shadow28${tokenSuffix}`]: `0 0 8px ${ambientColor}, 0 14px 28px ${keyColor}`,
    [`shadow64${tokenSuffix}`]: `0 0 8px ${ambientColor}, 0 32px 64px ${keyColor}`,
  };
}
