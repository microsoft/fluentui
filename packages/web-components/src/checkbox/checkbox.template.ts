import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { checkboxTemplate } from '@microsoft/fast-foundation/checkbox.js';

import type { Checkbox } from './checkbox.js';

const checkedIndicator = html.partial(`
    <div class="checked-indicator">
        <svg fill="currentColor" 
            aria-hidden="true" 
            width="1em" 
            height="1em" 
            viewBox="0 0 12 12" 
            xmlns="http://www.w3.org/2000/svg">
                <path d="M9.76 3.2c.3.29.32.76.04 1.06l-4.25 4.5a.75.75 0 0 1-1.08.02L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.7 1.7L8.7 3.24a.75.75 0 0 1 1.06-.04Z" fill="currentColor">
                </path>
        </svg>
    </div>
`);

const indeterminateIndicator = html.partial(`
    <div class="indeterminate-indicator"></div>
`);

/**
 * Template for the Checkbox component
 * @public
 */
export const template: ElementViewTemplate<Checkbox> = checkboxTemplate({
  checkedIndicator: checkedIndicator,
  indeterminateIndicator: indeterminateIndicator,
});
