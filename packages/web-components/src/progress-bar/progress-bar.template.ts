import type { ElementViewTemplate } from '@microsoft/fast-element';
import { progressTemplate } from '@microsoft/fast-foundation';
import type { ProgressBar } from './progress-bar.js';

export const template: ElementViewTemplate<ProgressBar> = progressTemplate({
  indeterminateIndicator1: `<span class="indeterminate-indicator-1" part="indeterminate-indicator-1></span>`,
  indeterminateIndicator2: `<span class="indeterminate-indicator-2" part="indeterminate-indicator-2"></span>`,
});
