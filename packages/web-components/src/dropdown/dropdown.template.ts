import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { selectTemplate } from '../select/select.template.js';
import type { Dropdown } from './dropdown.js';

const chevronDown20Regular = html.partial(`
<svg fill="currentColor" aria-hidden="true" width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0Z" fill="currentColor"></path></svg>`);

/**
 * The template for the fluent-dropdown component.
 * @public
 */
export const template: ElementViewTemplate<Dropdown> = selectTemplate({
  indicator: chevronDown20Regular,
});
