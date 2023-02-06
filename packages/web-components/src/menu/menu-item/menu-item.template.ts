import type { ElementViewTemplate } from '@microsoft/fast-element';
import { html } from '@microsoft/fast-element';
import { menuItemTemplate } from '@microsoft/fast-foundation';
import type { MenuItem } from './menu-item.js';

const checkmark24Regular = html.partial(
  `<svg class="___12fm75w f1w7gpdv fez10in fg4l7m0" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.53 12.97a.75.75 0 00-1.06 1.06l4.5 4.5c.3.3.77.3 1.06 0l11-11a.75.75 0 00-1.06-1.06L8.5 16.94l-3.97-3.97z" fill="currentColor"></path></svg>`,
);
const chevronRight20Filled = html.partial(
  `<svg class="fui-Icon-filled ___1vjqft9 fjseox fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.73 4.2a.75.75 0 011.06.03l5 5.25c.28.3.28.75 0 1.04l-5 5.25a.75.75 0 11-1.08-1.04L12.2 10l-4.5-4.73a.75.75 0 01.02-1.06z" fill="currentColor"></path></svg>`,
);

export const template: ElementViewTemplate<MenuItem> = menuItemTemplate({
  checkboxIndicator: checkmark24Regular,
  expandCollapseGlyph: chevronRight20Filled,
  radioIndicator: checkmark24Regular,
});
