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
    <svg 
        fill="currentColor" 
        viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7Zm-1 2.5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7Zm2 .5a.5.5 0 0 0-.5.5v5c0 .28.22.5.5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5Z" 
            fill="currentColor">
        </path>
    </svg>
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
