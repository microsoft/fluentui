import { html, when } from '@microsoft/fast-element';
import type { ElementViewTemplate } from '@microsoft/fast-element';
import { ProgressRingOptions } from '../progress-ring/progress-ring.options.js';
import { staticallyCompose } from '../utils/index.js';
import { Spinner } from './spinner.js';

const progressSegments: number = 44;

export function progressRingTemplate<T extends Spinner>(options: ProgressRingOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      role="progressbar"
      aria-valuenow="${x => x.value}"
      aria-valuemin="${x => x.min}"
      aria-valuemax="${x => x.max}"
    >
      ${when(
        x => typeof x.value === 'number',
        html<T>`
          <svg class="progress" part="progress" viewBox="0 0 16 16" slot="determinate">
            <circle class="background" part="background" cx="8px" cy="8px" r="7px"></circle>
            <circle
              class="determinate"
              part="determinate"
              style="stroke-dasharray: ${x => (progressSegments * x.percentComplete) / 100}px ${progressSegments}px"
              cx="8px"
              cy="8px"
              r="7px"
            ></circle>
          </svg>
        `,
        html<T>` <slot name="indeterminate"> ${staticallyCompose(options.indeterminateIndicator)} </slot> `,
      )}
    </template>
  `;
}

export const template: ElementViewTemplate<Spinner> = progressRingTemplate({
  indeterminateIndicator: `
    <svg class="progress" part="progress" viewBox="0 0 16 16">
        <circle
            class="background"
            part="background"
            cx="8px"
            cy="8px"
            r="7px"
        ></circle>
        <circle
            class="indeterminate-indicator-1"
            part="indeterminate-indicator-1"
            cx="8px"
            cy="8px"
            r="7px"
        ></circle>
    </svg>
  `,
});
