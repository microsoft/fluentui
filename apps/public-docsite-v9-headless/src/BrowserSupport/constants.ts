import data from './browser-support-data.generated.json';
import type { BrowserSupportFile, ConceptKey, FeatureDetail, FeatureKey, FeatureSupport } from './types';

const file = data as BrowserSupportFile;

/** Provenance string, e.g. `web-features@3.30.0`. */
export const generatedFrom: string = file.generatedFrom;

/** Browser ids shown in the support matrix, in column order. */
export const browsers: string[] = file.browsers;

/** Per-feature Baseline + support data (generated from `web-features`). */
export const features: Record<FeatureKey, FeatureSupport> = file.features;

/** npm page for the `web-features` package the data is generated from. */
export const WEB_FEATURES_URL = 'https://www.npmjs.com/package/web-features';

/** Rows shown in the overview support matrix — CSS anchor positioning broken into the properties we use. */
export const MATRIX_ORDER: FeatureKey[] = [
  'popover',
  'dialog',
  'anchor-name',
  'position-area',
  'position-try-fallbacks',
  'anchor-center',
  'focusgroup',
];

/** Concept-level features for the components table and per-component notices. */
export const CONCEPT_ORDER: ConceptKey[] = ['popover', 'dialog', 'anchor-positioning', 'focusgroup'];

/** Hand-maintained display label for every feature/property (matrix + notices). */
export const FEATURE_LABELS: Record<FeatureKey, string> = {
  popover: 'Popover API',
  dialog: 'Native <dialog> element',
  'anchor-positioning': 'CSS anchor positioning',
  'anchor-name': 'anchor-name',
  'position-area': 'position-area',
  'position-try-fallbacks': 'position-try-fallbacks',
  'anchor-center': 'anchor-center',
  focusgroup: 'Focus group',
};

export const FEATURE_DETAILS: Record<ConceptKey, FeatureDetail> = {
  popover: {
    referenceUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Popover_API',
    usage:
      'Renders overlays in the top layer with native light-dismiss and stacking, avoiding portals and manual z-index management.',
    fallback:
      'Only non-modal `Dialog` surfaces fall back to `dialog.show()` when the Popover API is missing. `Popover` and `Menu` surfaces render in place, while `Tooltip` logs a development warning.',
  },
  dialog: {
    referenceUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog',
    usage:
      'Provides accessible modal (`showModal()`) and non-modal overlays with native focus handling and a top-layer backdrop.',
    fallback:
      'Non-modal surfaces fall back from `showPopover()` to the basic `dialog.show()` when the Popover API is missing.',
  },
  'anchor-positioning': {
    referenceUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning',
    usage:
      'Positions overlays relative to their trigger via `anchor-name` / `position-anchor` / `position-area`, with `position-try-fallbacks` for flipping. The properties land in browsers individually — see the matrix above.',
    fallback:
      'The headless components do not include a JavaScript positioning fallback, so overlays render at their static position on browsers without CSS anchor positioning. Add a polyfill to keep them anchored.',
  },
  focusgroup: {
    referenceUrl: 'https://open-ui.org/components/scoped-focusgroup.explainer/',
    usage:
      'Provides roving arrow-key focus navigation via the `focusgroup` attribute, replacing manual keyboard event handlers.',
    fallback:
      'No browser supports it natively yet, and the published headless library does not apply a polyfill on your behalf. Add `@microsoft/focusgroup-polyfill` so keyboard navigation works today.',
  },
};

export const COMPONENT_FEATURES: Record<string, ConceptKey[]> = {
  Popover: ['popover', 'dialog', 'anchor-positioning'],
  InfoLabel: ['popover', 'dialog', 'anchor-positioning'],
  Tooltip: ['popover', 'anchor-positioning'],
  Menu: ['popover', 'anchor-positioning', 'focusgroup'],
  Dropdown: ['popover', 'anchor-positioning'],
  Combobox: ['popover', 'anchor-positioning'],
  Dialog: ['dialog', 'popover'],
  Drawer: ['dialog', 'popover'],
  Toast: ['popover'],
  TagGroup: ['focusgroup'],
  Toolbar: ['focusgroup'],
  TabList: ['focusgroup'],
  Nav: ['focusgroup'],
};

export const BROWSER_LABELS: Record<string, string> = {
  chrome: 'Chrome',
  edge: 'Edge',
  firefox: 'Firefox',
  safari: 'Safari',
};

export const REFERENCE_LINKS: Record<string, string> = {
  '@microsoft/focusgroup-polyfill': 'https://github.com/microsoft/polyfills/tree/main/packages/focusgroup',
  'anchor-name': 'https://developer.mozilla.org/en-US/docs/Web/CSS/anchor-name',
  'position-anchor': 'https://developer.mozilla.org/en-US/docs/Web/CSS/position-anchor',
  'position-area': 'https://developer.mozilla.org/en-US/docs/Web/CSS/position-area',
  'position-try-fallbacks': 'https://developer.mozilla.org/en-US/docs/Web/CSS/position-try-fallbacks',
};
