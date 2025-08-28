import { html, ref } from '@microsoft/fast-element';
import type { ElementViewTemplate } from '@microsoft/fast-element';
import type { ProgressBar } from './progress-bar.js';

export function progressTemplate<T extends ProgressBar>(): ElementViewTemplate<T> {
  return html` <div class="indicator" part="indicator" ${ref('indicator')}></div> `;
}

export const template: ElementViewTemplate<ProgressBar> = progressTemplate();
