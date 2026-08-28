'use client';

import type * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

/**
 * Development-only guard: warns once per document when this package's root stylesheet
 * (`@fluentui/react-windmod-preview/base.css`) is missing, or when a component chunk reached the
 * document ahead of it.
 *
 * Per-component CSS delivery makes the root sheet a hard prerequisite. Each chunk carries only its
 * own rules; the root sheet carries the two things that are global by nature:
 *
 *  - the `@property` registrations that give Tailwind's `--tw-*` variables their initial values, and
 *  - the `@layer` order statement (which, per the campaign contract, no chunk duplicates).
 *
 * ── Why this measures COMPUTED VALUES rather than looking for the stylesheet ──────────────────
 * An earlier version searched `document.styleSheets` for an order statement naming
 * `fui.components.l1`. That is uncorrelated with whether the setup is correct, in both directions:
 *
 *  - **Silent when broken.** `@fluentui/react-tailwind-theme-preview/dist/styles.css` carries a
 *    BYTE-IDENTICAL order statement and is a hard prerequisite of every documented setup. Its
 *    presence satisfied a presence test unconditionally — so the check could never fire in a real
 *    document, including when `base.css` was absent outright.
 *  - **Loud when correct.** CSSOM does not put an `@import`ed sheet in `document.styleSheets`, so a
 *    Mode-2 consumer (who `@import`s our root sheet at the top of their own) was invisible to it.
 *
 * Reading the registration back off a real element avoids both. The theme stylesheet registers no
 * custom properties at all (verified: zero `@property` at-rules), so `--tw-border-style` resolving
 * to its registered initial value is evidence of THIS package's root sheet — or of `styles.css`,
 * which inlines it, and is equally valid. `@import` nesting is irrelevant to a computed value.
 */

/** Registered by `base.css` as `syntax: "*"; inherits: false; initial-value: solid`. */
const PROBE_PROPERTY = '--tw-border-style';
const PROBE_EXPECTED = 'solid';

/** The layer family whose ordering the root sheet owns. */
const LAYER_PREFIX = 'fui.components';

/**
 * True when the root sheet's custom-property registrations are in effect.
 *
 * `border-style: var(--tw-border-style)` computes to the registered `initial-value` when the
 * `@property` rule is present, and to `none` when it is not (an unregistered, undefined variable
 * makes the declaration invalid at computed-value time). The probe element is appended, read and
 * removed synchronously inside a layout effect, so it is never painted; it must be IN the document
 * because `getComputedStyle` on a detached element returns nothing useful.
 */
function registrationsActive(doc: Document): boolean {
  const probe = doc.createElement('div');

  // `position: fixed` keeps it out of layout flow; the rest makes it inert and invisible even if
  // an exception somehow left it attached.
  probe.setAttribute('aria-hidden', 'true');
  probe.style.cssText = `position:fixed;top:-9999px;left:-9999px;width:0;height:0;visibility:hidden;border-style:var(${PROBE_PROPERTY})`;

  const host = doc.body ?? doc.documentElement;

  if (!host) {
    return true; // Nothing to measure against — stay quiet rather than guess.
  }

  host.appendChild(probe);

  try {
    return doc.defaultView?.getComputedStyle(probe).borderTopStyle === PROBE_EXPECTED;
  } finally {
    probe.remove();
  }
}

type LayerRule = CSSRule & {
  /** Layer STATEMENT (`@layer a, b;`) — standard. */
  nameList?: readonly string[];
  /** Layer BLOCK (`@layer a { … }`) — `name` in browsers, `layerName` in jsdom's rrweb-cssom. */
  name?: string;
  layerName?: string;
  /** `@import` — the sheet it pulls in, which CSSOM does NOT list in `document.styleSheets`. */
  styleSheet?: CSSStyleSheet;
};

/**
 * Walks every rule in document order — descending through `@import`, which is the whole point —
 * and reports which kind of `fui.components` layer reference appears FIRST.
 *
 * `'block'` means a component chunk established the layer family before any order statement did,
 * which is the chunk-first misconfiguration. `'statement'` means the order was declared first, as
 * the contract requires. `null` means neither was found.
 */
function firstLayerReference(doc: Document): 'statement' | 'block' | null {
  // Author sheets first, then adopted sheets, which the spec applies after them.
  const sheets = [...Array.from(doc.styleSheets), ...Array.from(doc.adoptedStyleSheets ?? [])];

  const visit = (sheet: CSSStyleSheet): 'statement' | 'block' | null => {
    let rules: CSSRuleList;

    try {
      // A cross-origin sheet throws. That is "cannot tell", not "absent", so it is skipped rather
      // than treated as evidence either way.
      rules = sheet.cssRules;
    } catch {
      return null;
    }

    for (const rule of Array.from(rules)) {
      const { nameList, name, layerName, styleSheet } = rule as LayerRule;

      if (styleSheet) {
        const nested = visit(styleSheet);

        if (nested) {
          return nested;
        }

        continue;
      }

      if (nameList) {
        if (Array.prototype.some.call(nameList, (n: string) => n.startsWith(LAYER_PREFIX))) {
          return 'statement';
        }

        continue;
      }

      const blockName = name ?? layerName;

      if (typeof blockName === 'string' && blockName.startsWith(LAYER_PREFIX)) {
        return 'block';
      }
    }

    return null;
  };

  for (const sheet of sheets) {
    const found = visit(sheet);

    if (found) {
      return found;
    }
  }

  return null;
}

/**
 * Whether this environment can support the measurements above at all.
 *
 * `CSS.registerProperty` is the imperative half of the same spec as `@property` (CSS Properties
 * and Values API); an engine either implements both or neither. jsdom implements neither — and,
 * measured against the real shipped artifacts, it also returns `null` from the rule walk for
 * every arrangement, because its CSS parser predates cascade layers. Both signals are therefore
 * meaningless under jsdom, so the check stays silent there rather than emitting a verdict it
 * cannot support: without this gate every unit test that renders a provider would warn.
 */
function canMeasure(win: (Window & typeof globalThis) | null): boolean {
  return typeof win?.CSS?.registerProperty === 'function';
}

/** Documents already warned about, so a page full of providers warns at most once each. */
const warned = new WeakSet<Document>();

const FIX =
  'Load the root stylesheet ONCE per document, ahead of every component import and all of your ' +
  'own CSS:\n\n' +
  "    import '@fluentui/react-windmod-preview/base.css';\n\n" +
  'or, if you have your own root stylesheet, as the first line of it:\n\n' +
  "    @import '@fluentui/react-windmod-preview/base.css';\n\n" +
  "Loading '@fluentui/react-windmod-preview/styles.css' instead also satisfies this — it is " +
  'self-contained, bundling the root stylesheet together with every component.';

/**
 * @param elementRef - the provider's own host element. Its `ownerDocument` is the document whose
 * stylesheets actually style this subtree, which is the right one to interrogate when the provider
 * renders into a portal or an iframe — and it avoids reaching for the global `document`, which the
 * workspace forbids for exactly that reason.
 * @param targetDocument - the provider's explicit `targetDocument` prop, which wins when supplied.
 */
/**
 * The decision, separated from the DOM so it can be tested directly.
 *
 * Returns `null` when the setup is correct, or the warning text otherwise. The three inputs map
 * onto the measured matrix (`.scratch/css-splitting/detector-matrix.mjs`, 8 documents served over
 * HTTP against the shipped artifacts):
 *
 * | registrations active | first layer reference | verdict |
 * |---|---|---|
 * | yes | `statement` | correct — Mode 1, Mode 2, and the monolith all land here |
 * | yes | `block`     | a chunk defined the layer order before the root sheet |
 * | no  | `statement` | root sheet absent (the theme sheet supplies the statement) |
 * | no  | `block`     | nothing of ours loaded before the chunks |
 */
export function diagnoseRootStylesheet(active: boolean, firstReference: 'statement' | 'block' | null): string | null {
  if (active && firstReference !== 'block') {
    return null;
  }

  const chunkFirst = firstReference === 'block';

  const diagnosis = !active
    ? chunkFirst
      ? 'a component stylesheet reached the document BEFORE the root stylesheet, which is missing entirely.'
      : 'the root stylesheet has not been loaded.'
    : 'a component stylesheet reached the document BEFORE the root stylesheet.';

  const consequence = chunkFirst
    ? '\n\nCascade layers are established in first-use order, so that component chunk has defined ' +
      'the fui.* layer order instead of the root stylesheet. Components now override each other in ' +
      'the wrong direction — a composed component such as ToggleButton loses to the Button it ' +
      'builds on.'
    : '\n\nWithout it the fui.* cascade-layer order is undefined and registered custom properties ' +
      'lose their initial values, so borders, shadows and rings render wrong.';

  return `@fluentui/react-windmod-preview: ${diagnosis}${consequence}\n\n${FIX}`;
}

export function useRootStylesheetCheck(
  elementRef: React.RefObject<HTMLElement | null>,
  targetDocument: Document | null | undefined,
): void {
  useIsomorphicLayoutEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    // No `document` fallback: under SSR there is none, and in the browser the host element is
    // always mounted by the time a layout effect runs.
    const doc = targetDocument ?? elementRef.current?.ownerDocument;

    if (!doc || warned.has(doc) || !canMeasure(doc.defaultView)) {
      return;
    }

    const message = diagnoseRootStylesheet(registrationsActive(doc), firstLayerReference(doc));

    if (!message) {
      return;
    }

    warned.add(doc);

    // eslint-disable-next-line no-console
    console.warn(message);
  }, [elementRef, targetDocument]);
}

/** Re-exported for the test, which needs to clear the once-per-document latch between cases. */
export const clearRootStylesheetWarnings = (doc: Document): void => {
  warned.delete(doc);
};
