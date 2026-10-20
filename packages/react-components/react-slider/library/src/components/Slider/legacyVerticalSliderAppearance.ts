const LEGACY_STYLE_ID = 'fui-Slider-legacy-vertical-appearance';

/**
 * Scoped to vertical inputs: in engines that need this value, it also turns a horizontal range input vertical.
 * @internal
 */
export const LEGACY_VERTICAL_SLIDER_RULE = '.fui-Slider__input[orient="vertical"]{-webkit-appearance:slider-vertical;}';

// `all: initial` drops every author declaration (for example a global `input { width: 100% }`), and `!important` keeps
// author `!important` rules from winning over the inline values, so the probe renders at the native intrinsic size of a
// range input.
const PROBE_STYLE =
  'all:initial!important;appearance:auto!important;' +
  'position:absolute!important;left:-9999px!important;top:-9999px!important;' +
  'visibility:hidden!important;pointer-events:none!important;' +
  'writing-mode:vertical-lr!important;direction:rtl!important;';

const probeResults = new WeakMap<Document, boolean>();

/**
 * Detects whether the engine orients a range input with `writing-mode`.
 *
 * A vertically oriented range input swaps its intrinsic axes, so an unconstrained probe renders taller than it is
 * wide. This is deliberately a layout probe rather than a `CSS.supports('writing-mode', ...)` check: engines gained
 * vertical range support at different times from `sideways-lr`, so a feature query would take the fallback on versions
 * that no longer need it.
 *
 * The probe is isolated from application styles (see `PROBE_STYLE`) and measured with `offsetWidth`/`offsetHeight`,
 * which report the layout box before transforms, so styles on its ancestors (such as a rotated or scaled `body`)
 * cannot change the result either.
 *
 * @returns `undefined` when the document has no layout (for example a `display: none` iframe or jsdom), so the caller
 * does not install the fallback on a guess.
 * @internal
 */
export function supportsVerticalRangeInput(targetDocument: Document): boolean | undefined {
  const cached = probeResults.get(targetDocument);
  if (cached !== undefined) {
    return cached;
  }

  const probe = targetDocument.createElement('input');
  probe.type = 'range';
  probe.style.cssText = PROBE_STYLE;
  targetDocument.body.append(probe);
  const height = probe.offsetHeight;
  const width = probe.offsetWidth;
  probe.remove();

  if (height === width) {
    return undefined;
  }

  const supported = height > width;
  probeResults.set(targetDocument, supported);
  return supported;
}

/**
 * Installs the deprecated `-webkit-appearance: slider-vertical` value only in engines that cannot orient a range input
 * themselves.
 *
 * Chromium reports that value while parsing the CSS, even inside an `@supports` block that never matches, so it cannot
 * ship in the package stylesheet. This keeps the fallback automatic for browsers that still need it without warning in
 * browsers that do not. It is client-only (passing no document is a no-op, so server rendering is unaffected), it
 * injects a style element rather than changing markup (so it cannot cause a hydration mismatch), it probes each
 * document at most once, and it is idempotent per document.
 *
 * @param styleElementAttributes - attributes for the style element, such as the Griffel renderer's `nonce`
 * @internal
 */
export function ensureLegacyVerticalSliderInput(
  targetDocument: Document | undefined,
  styleElementAttributes: Record<string, string> = {},
): void {
  if (!targetDocument?.body || !targetDocument.head || targetDocument.getElementById(LEGACY_STYLE_ID) !== null) {
    return;
  }

  if (supportsVerticalRangeInput(targetDocument) !== false) {
    return;
  }

  const style = targetDocument.createElement('style');
  Object.keys(styleElementAttributes).forEach(name => {
    style.setAttribute(name, styleElementAttributes[name]);
  });
  style.id = LEGACY_STYLE_ID;
  style.textContent = LEGACY_VERTICAL_SLIDER_RULE;
  targetDocument.head.append(style);
}
