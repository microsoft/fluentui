import { html, when } from '@microsoft/fast-element';
import type { ElementViewTemplate } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/template-helpers.js';
import type { ProgressOptions } from './progress-bar.options.js';
import type { ProgressBar } from './progress-bar.js';

export function progressTemplate<T extends ProgressBar>(options: ProgressOptions = {}): ElementViewTemplate<T> {
  return html`
    <template
      role="progressbar"
      aria-valuenow="${x => x.value}"
      aria-valuemin="${x => x.min}"
      aria-valuemax="${x => x.max}"
    >
      ${when(
        x => typeof x.value === 'number',
        html<T>`
          <div class="progress" part="progress" slot="determinate">
            <div class="determinate" part="determinate" style="width: ${x => x.percentComplete}%"></div>
          </div>
        `,
        html<T>`
          <div class="progress" part="progress" slot="indeterminate">
            <slot name="indeterminate">
              ${staticallyCompose(options.indeterminateIndicator1)}
              ${staticallyCompose(options.indeterminateIndicator2)}
            </slot>
          </div>
        `,
      )}
    </template>
  `;
}

export const template: ElementViewTemplate<ProgressBar> = progressTemplate({
  indeterminateIndicator1: `<span class="indeterminate-indicator-1" part="indeterminate-indicator-1></span>`,
  indeterminateIndicator2: `<span class="indeterminate-indicator-2" part="indeterminate-indicator-2"></span>`,
});
