// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ShadowConfig {
  stylesheetKey: string;
  inShadow: boolean;
  window?: Window;
  __isShadowConfig__: true;
}

export const GLOBAL_STYLESHEET_KEY = '__global__';
export const SHADOW_DOM_STYLESHEET_SETTING = '__shadow_dom_stylesheet__';

export const DEFAULT_SHADOW_CONFIG: ShadowConfig = {
  stylesheetKey: GLOBAL_STYLESHEET_KEY,
  inShadow: false,
  window: undefined,
  __isShadowConfig__: true,
};

export const makeShadowConfig = (stylesheetKey: string, inShadow: boolean, window?: Window): ShadowConfig => {
  return {
    stylesheetKey,
    inShadow,
    window,
    __isShadowConfig__: true,
  };
};

export const isShadowConfig = (value: unknown): value is ShadowConfig => {
  if (!(value && isRecord(value))) {
    return false;
  }

  return value.__isShadowConfig__ === true;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
