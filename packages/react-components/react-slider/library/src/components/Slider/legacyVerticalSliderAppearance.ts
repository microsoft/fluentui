/**
 * Id of the style element that carries the legacy rule when it cannot be a constructed stylesheet.
 * @internal
 */
export const LEGACY_STYLE_ID = 'fui-Slider-legacy-vertical-appearance';

/**
 * Scoped to vertical inputs: in engines that need this value, it also turns a horizontal range input vertical.
 * @internal
 */
export const LEGACY_VERTICAL_SLIDER_RULE = '.fui-Slider__input[orient="vertical"]{-webkit-appearance:slider-vertical;}';

// The probe is measured inside its own shadow root, so no document selector reaches it or its range pseudo-elements
// (for example `input::-webkit-slider-runnable-track { width: 200px }`). `all: initial` on the host stops inherited
// values such as `writing-mode` from crossing the boundary, and `!important` keeps the inline values ahead of author
// `!important` rules on the host itself. `all: initial` also resets `appearance` to `none`, so the native range
// appearance is restored with every spelling: engines without unprefixed `appearance` (Safari < 15.4, Firefox < 80)
// are exactly the ones that need the fallback.
const PROBE_HOST_STYLE =
  'all:initial!important;position:absolute!important;left:-9999px!important;top:-9999px!important;' +
  'visibility:hidden!important;pointer-events:none!important;';
const PROBE_STYLE =
  'all:initial!important;-webkit-appearance:auto!important;-moz-appearance:auto!important;appearance:auto!important;' +
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
 * The probe is measured in an isolated shadow root (see `PROBE_HOST_STYLE`) with `offsetWidth`/`offsetHeight`, which
 * report the layout box before transforms, so neither application styles nor a transformed ancestor change the result.
 *
 * @returns `undefined` when the document has no layout (for example a `display: none` iframe or jsdom), so the caller
 * can retry once it does instead of installing the fallback on a guess.
 * @internal
 */
export function supportsVerticalRangeInput(targetDocument: Document): boolean | undefined {
  const cached = probeResults.get(targetDocument);
  if (cached !== undefined) {
    return cached;
  }

  const host = targetDocument.createElement('div');
  host.setAttribute('style', PROBE_HOST_STYLE);
  const probe = targetDocument.createElement('input');
  probe.type = 'range';
  probe.setAttribute('style', PROBE_STYLE);
  host.attachShadow({ mode: 'open' }).append(probe);
  targetDocument.body.append(host);
  const height = probe.offsetHeight;
  const width = probe.offsetWidth;
  host.remove();

  if (height === width) {
    return undefined;
  }

  const supported = height > width;
  probeResults.set(targetDocument, supported);
  return supported;
}

function isShadowRoot(node: Node): node is ShadowRoot {
  return node.nodeType === 11 && 'host' in node;
}

/**
 * Adds the legacy rule to the styling root that contains `element`: the shadow root it renders in, matching
 * `createShadowDOMRenderer(root)`, or otherwise its document's `head`. Each root receives the rule at most once.
 * @internal
 */
export function installLegacyVerticalSliderRule(
  element: Element,
  styleElementAttributes: Record<string, string> = {},
): void {
  const targetDocument = element.ownerDocument;
  const rootNode = element.getRootNode();
  const shadowRoot = isShadowRoot(rootNode) ? rootNode : undefined;
  const container = shadowRoot ?? targetDocument.head;

  // Dedupe by what is actually in the root rather than by module state, so a rule removed by someone else is restored
  // and a second copy of this package does not add the rule again.
  if (!container || hasLegacyRule(shadowRoot ?? targetDocument)) {
    return;
  }

  // Constructed sheets must come from the root's own window, so this also works for a Slider inside an iframe.
  const view = targetDocument.defaultView;
  if (shadowRoot && view && 'adoptedStyleSheets' in shadowRoot && 'replaceSync' in view.CSSStyleSheet.prototype) {
    const sheet = new view.CSSStyleSheet();
    sheet.replaceSync(LEGACY_VERTICAL_SLIDER_RULE);
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet];
    return;
  }

  const style = targetDocument.createElement('style');
  Object.keys(styleElementAttributes).forEach(name => {
    style.setAttribute(name, styleElementAttributes[name]);
  });
  style.id = LEGACY_STYLE_ID;
  style.textContent = LEGACY_VERTICAL_SLIDER_RULE;
  container.append(style);
}

function hasLegacyRule(root: Document | ShadowRoot): boolean {
  if (root.getElementById(LEGACY_STYLE_ID)) {
    return true;
  }
  const isLegacySheet = (sheet: CSSStyleSheet) =>
    sheet.cssRules.length === 1 && sheet.cssRules[0].cssText.includes('slider-vertical');
  return Array.from(root.adoptedStyleSheets ?? []).some(isLegacySheet);
}

/**
 * Installs the deprecated `-webkit-appearance: slider-vertical` value for a vertical Slider input, only in engines that
 * cannot orient a range input themselves.
 *
 * Chromium reports that value while parsing the CSS, even inside an `@supports` block that never matches, so it cannot
 * ship in the package stylesheet. This keeps the fallback automatic for browsers that still need it without warning in
 * browsers that do not. It runs only in effects, so server rendering is unaffected, and it adds a style rather than
 * changing markup, so it cannot cause a hydration mismatch.
 *
 * When the document has no layout yet (for example a Slider mounted in a `display: none` iframe), it watches the input
 * and decides once the input is laid out, so revealing the iframe is enough and no Slider prop has to change.
 *
 * @param styleElementAttributes - attributes for a style element, such as the Griffel renderer's `nonce`
 * @returns a cleanup function while a retry is pending
 * @internal
 */
export function ensureLegacyVerticalSliderInput(
  inputOrDocument: HTMLElement | Document | null | undefined,
  styleElementAttributes?: Record<string, string>,
): (() => void) | undefined {
  if (!inputOrDocument) {
    return undefined;
  }

  // Without the rendered input (a custom `input` slot that does not forward refs), fall back to the document root.
  const input = 'body' in inputOrDocument ? inputOrDocument.body : inputOrDocument;
  if (!input?.ownerDocument.body) {
    return undefined;
  }

  const attempt = (): boolean => {
    const supported = supportsVerticalRangeInput(input.ownerDocument);
    if (supported === false) {
      installLegacyVerticalSliderRule(input, styleElementAttributes);
    }
    return supported !== undefined;
  };

  if (attempt()) {
    return undefined;
  }

  const ResizeObserverCtor = input.ownerDocument.defaultView?.ResizeObserver;
  if (!ResizeObserverCtor) {
    return undefined;
  }

  const observer = new ResizeObserverCtor(() => {
    if (attempt()) {
      observer.disconnect();
    }
  });
  observer.observe(input);
  return () => observer.disconnect();
}
