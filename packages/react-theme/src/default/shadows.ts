import { ShadowTokens } from '../types';

export function createShadowTokens(ambientColor: string, keyColor: string): ShadowTokens {
  return {
    shadow2: {
      ambient: `0 0 2px ${ambientColor}`,
      key: `0 1px 2px ${keyColor}`,
    },
    shadow4: {
      ambient: `0 0 2px ${ambientColor}`,
      key: `0 2px 4px ${keyColor}`,
    },
    shadow8: {
      ambient: `0 0 2px ${ambientColor}`,
      key: `0 4px 8px ${keyColor}`,
    },
    shadow16: {
      ambient: `0 0 2px ${ambientColor}`,
      key: `0 6px 16px ${keyColor}`,
    },
    shadow28: {
      ambient: `0 0 8px ${ambientColor}`,
      key: `0 14px 28px ${keyColor}`,
    },
    shadow64: {
      ambient: `0 0 8px ${ambientColor}`,
      key: `0 32px 64px ${keyColor}`,
    },
  };
}
