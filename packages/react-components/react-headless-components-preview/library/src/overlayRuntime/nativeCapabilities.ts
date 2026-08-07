export type OverlayRuntimeOverride = 'auto' | 'native' | 'fallback';

const OVERLAY_RUNTIME_OVERRIDE_KEY = '__FUI_HEADLESS_OVERLAY_RUNTIME_MODE__';

type OverlayRuntimeWindow = Window & {
  [OVERLAY_RUNTIME_OVERRIDE_KEY]?: OverlayRuntimeOverride;
};

const supports = (css: typeof CSS, property: string, value?: string): boolean =>
  value === undefined ? css.supports(property) : css.supports(property, value);

export function getOverlayRuntimeOverride(targetDocument: Document): OverlayRuntimeOverride {
  return (targetDocument.defaultView as OverlayRuntimeWindow | null)?.[OVERLAY_RUNTIME_OVERRIDE_KEY] ?? 'auto';
}

export function setOverlayRuntimeOverrideForTests(
  targetDocument: Document,
  override: OverlayRuntimeOverride,
): void {
  const targetWindow = targetDocument.defaultView as OverlayRuntimeWindow | null;

  if (targetWindow) {
    targetWindow[OVERLAY_RUNTIME_OVERRIDE_KEY] = override;
  }
}

export function supportsNativeOverlayRuntime(targetDocument: Document): boolean {
  const targetWindow = targetDocument.defaultView;

  if (!targetWindow) {
    return false;
  }

  const override = getOverlayRuntimeOverride(targetDocument);
  if (override !== 'auto') {
    return override === 'native';
  }

  const { CSS: css, HTMLElement: HTMLElementCtor, HTMLDialogElement: HTMLDialogElementCtor } = targetWindow;
  if (
    !css ||
    typeof css.supports !== 'function' ||
    !HTMLElementCtor ||
    !HTMLDialogElementCtor
  ) {
    return false;
  }

  const popoverPrototype = HTMLElementCtor.prototype;
  const dialogPrototype = HTMLDialogElementCtor.prototype;
  const hintProbe = targetDocument.createElement('div');
  hintProbe.setAttribute('popover', 'hint');

  return (
    typeof popoverPrototype.showPopover === 'function' &&
    typeof popoverPrototype.hidePopover === 'function' &&
    typeof dialogPrototype.showModal === 'function' &&
    hintProbe.popover === 'hint' &&
    supports(css, 'selector(:popover-open)') &&
    supports(css, 'anchor-name', '--fui-overlay-anchor') &&
    supports(css, 'position-anchor', '--fui-overlay-anchor') &&
    supports(css, 'position-area', 'block-end') &&
    supports(css, 'position-try-fallbacks', 'flip-block') &&
    supports(css, 'width', 'anchor-size(width)')
  );
}
