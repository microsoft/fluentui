export type ShadowConfig = {
  stylesheetKey: string;
  inShadow: boolean;
  window?: Window;
  __isShadowConfig__: true;
};

export const GLOBAL_STYLESHEET_KEY = '__global__';

export const DEFAULT_SHADOW_CONFIG: ShadowConfig = {
  stylesheetKey: GLOBAL_STYLESHEET_KEY,
  inShadow: false,
  window: undefined,
  __isShadowConfig__: true,
} as const;

export const makeShadowConfig = (stylesheetKey: string, inShadow: boolean, window?: Window): ShadowConfig => {
  return {
    stylesheetKey,
    inShadow,
    window,
    __isShadowConfig__: true,
  };
};

export const isShadowConfig = (obj: unknown): obj is ShadowConfig => {
  if (!obj) {
    return false;
  }

  return (obj as ShadowConfig).__isShadowConfig__ === true;
};
