export type ShadowConfig = {
  stylesheetKey: string;
  inShadow: boolean;
  window?: Window;
  __isShadowConfig__: true;
};

export type PartialShadowConfig = Partial<ShadowConfig>;

export const GLOBAL_STYLESHEET_KEY = '__global__';
export const SHADOW_DOM_STYLESHEET_SETTING = '__shadow_dom_stylesheet__';

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

export const isShadowConfig = <T extends ShadowConfig | PartialShadowConfig>(obj: unknown): obj is T => {
  if (!obj) {
    return false;
  }

  return (
    (obj as ShadowConfig).__isShadowConfig__ === true &&
    typeof (obj as ShadowConfig).stylesheetKey === 'string' &&
    typeof (obj as ShadowConfig).inShadow === 'boolean'
  );
};
