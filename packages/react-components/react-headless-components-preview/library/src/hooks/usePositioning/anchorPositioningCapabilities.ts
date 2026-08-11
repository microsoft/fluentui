export type PositioningRuntimeOverride = 'auto' | 'native' | 'fallback';

const POSITIONING_RUNTIME_OVERRIDE_KEY = '__FUI_HEADLESS_POSITIONING_RUNTIME_MODE__';

type PositioningRuntimeWindow = Window & {
  [POSITIONING_RUNTIME_OVERRIDE_KEY]?: PositioningRuntimeOverride;
};

const supports = (css: typeof CSS, property: string, value: string): boolean => css.supports(property, value);

export function getPositioningRuntimeOverride(targetDocument: Document): PositioningRuntimeOverride {
  return (targetDocument.defaultView as PositioningRuntimeWindow | null)?.[POSITIONING_RUNTIME_OVERRIDE_KEY] ?? 'auto';
}

export function setPositioningRuntimeOverrideForTests(
  targetDocument: Document,
  override: PositioningRuntimeOverride,
): void {
  const targetWindow = targetDocument.defaultView as PositioningRuntimeWindow | null;

  if (targetWindow) {
    targetWindow[POSITIONING_RUNTIME_OVERRIDE_KEY] = override;
  }
}

export function supportsNativeAnchorPositioning(targetDocument: Document): boolean {
  const override = getPositioningRuntimeOverride(targetDocument);
  if (override !== 'auto') {
    return override === 'native';
  }

  const targetWindow = targetDocument.defaultView;
  if (!targetWindow?.CSS || typeof targetWindow.CSS.supports !== 'function') {
    return false;
  }

  const css = targetWindow.CSS;

  return (
    supports(css, 'anchor-name', '--fui-positioning-anchor') &&
    supports(css, 'position-anchor', '--fui-positioning-anchor') &&
    supports(css, 'position-area', 'block-end') &&
    supports(css, 'position-try-fallbacks', 'flip-block') &&
    supports(css, 'width', 'anchor-size(width)')
  );
}
