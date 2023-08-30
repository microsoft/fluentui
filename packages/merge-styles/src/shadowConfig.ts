export type ShadowConfig = {
  stylesheetKey: string;
  inShadow: boolean;
  window?: Window;
};

export const GLOBAL_STYLESHEET_KEY = '__global__';

export const DEFAULT_SHADOW_CONFIG: ShadowConfig = {
  stylesheetKey: GLOBAL_STYLESHEET_KEY,
  inShadow: false,
  window: undefined,
} as const;

export const isShadowConfig = (obj: unknown): obj is ShadowConfig => {
  if (!obj) {
    return false;
  }

  const config = obj as ShadowConfig;
  const numKeys = Object.keys(config).length;

  if (typeof config.stylesheetKey !== 'string' || typeof config.inShadow !== 'boolean') {
    return false;
  }

  if (numKeys === 3) {
    return typeof config.window === 'undefined' || !!(config.window && typeof config.window === 'object');
  }

  return true;
};
