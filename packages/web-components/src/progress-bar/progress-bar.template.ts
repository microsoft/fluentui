import { html } from '@microsoft/fast-element';
import type { ElementViewTemplate } from '@microsoft/fast-element';
import type { ProgressBar } from './progress-bar.js';

export function progressTemplate<T extends ProgressBar>(): ElementViewTemplate<T> {
  return html`
    <div
      class="indicator"
      part="indicator"
      style="${x => (typeof x.value === 'number' ? `width: ${x.percentComplete}%` : void 0)}"
    ></div>
  `;
}

export const template: ElementViewTemplate<ProgressBar> = progressTemplate();
