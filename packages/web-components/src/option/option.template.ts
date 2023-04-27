import { ElementViewTemplate } from '@microsoft/fast-element';
import { listboxOptionTemplate } from '@microsoft/fast-foundation';
import type { ListboxOption } from './option.js';

const startContent = `
<span class="before-content" part="before-content">
    <span class="checkmark">
        <span class="single-select">
            <svg fill="currentColor" aria-hidden="true" width="1em" height="1em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.05 3.49c.28.3.27.77-.04 1.06l-7.93 7.47A.85.85 0 0 1 4.9 12L2.22 9.28a.75.75 0 1 1 1.06-1.06l2.24 2.27 7.47-7.04a.75.75 0 0 1 1.06.04Z" fill="currentColor">
                </path>
            </svg>
        </span>
        <span class="multi-select">
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
        </span>
    </span>
    <slot name="icon"></slot>
</span>`;

/**
 * The template for the fluent-option component.
 * @public
 */
export const template: ElementViewTemplate<ListboxOption> = listboxOptionTemplate({
  start: startContent,
});
