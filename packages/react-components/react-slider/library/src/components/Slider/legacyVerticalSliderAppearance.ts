/**
 * Id of the style element that carries the legacy rule when it cannot be a constructed stylesheet.
 * @internal
 */
export const LEGACY_STYLE_ID = 'fui-Slider-legacy-vertical-appearance';

/**
 * Scoped to vertical inputs: in engines that need this value, it also turns a horizontal range input vertical.
 * @internal
 */
export const LEGACY_VERTICAL_SLIDER_SELECTOR = '.fui-Slider__input[orient="vertical"]';

/**
 * @internal
 */
export const LEGACY_VERTICAL_SLIDER_RULE = `${LEGACY_VERTICAL_SLIDER_SELECTOR}{-webkit-appearance:slider-vertical;}`;

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

  // Assigned through CSSOM rather than the `style` attribute: a nonce-only `style-src` (or `style-src-attr 'none'`)
  // blocks style attributes, which would drop `writing-mode` from the probe and misread a supporting engine.
  const host = targetDocument.createElement('div');
  host.style.cssText = PROBE_HOST_STYLE;
  const probe = targetDocument.createElement('input');
  probe.type = 'range';
  probe.style.cssText = PROBE_STYLE;
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

type DocumentView = NonNullable<Document['defaultView']>;

const legacyValueResults = new WeakMap<DocumentView, boolean>();

// Chromium logs the deprecation for this query as well, so it is asked at most once per window, and only after the
// probe has shown the engine needs the fallback.
function parsesLegacyValue(view: DocumentView): boolean {
  let parses = legacyValueResults.get(view);
  if (parses === undefined) {
    parses = typeof view.CSS?.supports !== 'function' || view.CSS.supports('-webkit-appearance', 'slider-vertical');
    legacyValueResults.set(view, parses);
  }
  return parses;
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
  const view = targetDocument.defaultView;
  const rootNode = element.getRootNode();
  const shadowRoot = isShadowRoot(rootNode) ? rootNode : undefined;
  const container = shadowRoot ?? targetDocument.head;

  // Dedupe by what is actually in the root rather than by module state, so a rule removed by someone else is restored
  // and a second copy of this package does not add the rule again.
  if (!container || hasLegacyRule(shadowRoot ?? targetDocument)) {
    return;
  }

  // Skip engines that cannot parse the value (Firefox before 120): the rule would be inert there, and because the
  // declaration is dropped, the root could never be recognised as carrying it, so each mount would add another sheet.
  if (view && !parsesLegacyValue(view)) {
    return;
  }

  // Constructed sheets must come from the root's own window, so this also works for a Slider inside an iframe.
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
  // Match the selector and the declaration, not just the keyword: an application sheet such as
  // `.native-range { -webkit-appearance: slider-vertical }` must not stand in for the Slider rule.
  return Array.from(root.adoptedStyleSheets ?? []).some(sheet => Array.from(sheet.cssRules).some(isLegacyRule));
}

function isLegacyRule(rule: CSSRule): boolean {
  const styleRule = rule as Partial<CSSStyleRule>;
  return (
    styleRule.selectorText === LEGACY_VERTICAL_SLIDER_SELECTOR &&
    styleRule.style?.getPropertyValue('-webkit-appearance') === 'slider-vertical'
  );
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
 * When the document has no layout yet (for example a Slider mounted in a `display: none` iframe), it watches the Slider
 * element and decides once it is laid out, so revealing the iframe is enough and no Slider prop has to change.
 *
 * @param elementOrDocument - a rendered Slider element, which locates its styling root, or its document as a fallback
 * @param styleElementAttributes - attributes for a style element, such as the Griffel renderer's `nonce`
 * @returns a cleanup function while a retry is pending
 * @internal
 */
export function ensureLegacyVerticalSliderInput(
  elementOrDocument: HTMLElement | Document | null | undefined,
  styleElementAttributes?: Record<string, string>,
): (() => void) | undefined {
  if (!elementOrDocument) {
    return undefined;
  }

  // Without a rendered element (a custom `root` slot that does not forward refs), fall back to the document root.
  const element = 'body' in elementOrDocument ? elementOrDocument.body : elementOrDocument;
  if (!element?.ownerDocument.body) {
    return undefined;
  }

  const attempt = (): boolean => {
    const supported = supportsVerticalRangeInput(element.ownerDocument);
    if (supported === false) {
      installLegacyVerticalSliderRule(element, styleElementAttributes);
    }
    return supported !== undefined;
  };

  if (attempt()) {
    return undefined;
  }

  const ResizeObserverCtor = element.ownerDocument.defaultView?.ResizeObserver;
  if (!ResizeObserverCtor) {
    return undefined;
  }

  const observer = new ResizeObserverCtor(() => {
    if (attempt()) {
      observer.disconnect();
    }
  });
  observer.observe(element);
  return () => observer.disconnect();
}
