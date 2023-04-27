import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { radioTemplate } from '@microsoft/fast-foundation';
import type { Radio } from './radio.js';

export const template: ElementViewTemplate<Radio> = radioTemplate({
  checkedIndicator: html`<div part="checked-indicator" class="checked-indicator"></div>`,
});
