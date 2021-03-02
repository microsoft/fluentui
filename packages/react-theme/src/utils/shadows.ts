import { ShadowLevelTokens } from '../types';

export function createShadowLevelTokens(ambientColor: string, keyColor: string): ShadowLevelTokens {
  return {
    shadow2: `0 0 2px ${ambientColor}, 0 1px 2px ${keyColor}`,
    shadow4: `0 0 2px ${ambientColor}, 0 2px 4px ${keyColor}`,
    shadow8: `0 0 2px ${ambientColor}, 0 4px 8px ${keyColor}`,
    shadow16: `0 0 2px ${ambientColor}, 0 6px 16px ${keyColor}`,
    shadow28: `0 0 8px ${ambientColor}, 0 14px 28px ${keyColor}`,
    shadow64: `0 0 8px ${ambientColor}, 0 32px 64px ${keyColor}`,
  };
}
