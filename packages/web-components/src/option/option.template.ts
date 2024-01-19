import { ElementViewTemplate } from '@microsoft/fast-element';
import { listboxOptionTemplate } from '../listbox-option/listbox-option.template.js';
import type { ListboxOption } from './option.js';

const startContent = `
<span class="before-content" part="before-content">
    <span class="checkmark">
        <span class="select-indicator">
            <svg fill="currentColor"
                aria-hidden="true"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.05 3.49c.28.3.27.77-.04 1.06l-7.93 7.47A.85.85 0 0 1 4.9 12L2.22 9.28a.75.75 0 1 1 1.06-1.06l2.24 2.27 7.47-7.04a.75.75 0 0 1 1.06.04Z" fill="currentColor">
                    </path>
            </svg>
        </span>
    </span>
    <span class="icon">
        <slot name="icon"></slot>
    </span>
</span>`;

/**
 * The template for the fluent-option component.
 * @public
 */
export const template: ElementViewTemplate<ListboxOption> = listboxOptionTemplate({
  start: startContent,
});
