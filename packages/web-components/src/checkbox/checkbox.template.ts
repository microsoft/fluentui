import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { checkboxTemplate } from '@microsoft/fast-foundation';

import type { Checkbox } from './checkbox.js';

const checkmark16Filled = html.partial(`
<div class="checked-indicator">
    <svg 
        fill="currentColor" 
        viewBox="0 0 16 16" 
        xmlns="http://www.w3.org/2000/svg">
            <path d="M14.05 3.49c.28.3.27.77-.04 1.06l-7.93 7.47A.85.85 0 0 1 4.9 12L2.22 9.28a.75.75 0 1 1 1.06-1.06l2.24 2.27 7.47-7.04a.75.75 0 0 1 1.06.04Z" 
                fill="currentColor">
            </path>
    </svg>
</div>
`);

const checkboxIndeterminate16Filled = html.partial(`
    <div class="indeterminate-indicator">
    </div>
`);

/**
 * Template for the Checkbox component
 * @public
 */
export const template: ElementViewTemplate<Checkbox> = checkboxTemplate({
  checkedIndicator: checkmark16Filled,
  indeterminateIndicator: checkboxIndeterminate16Filled,
});
