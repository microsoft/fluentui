import { ElementViewTemplate } from '@microsoft/fast-element';
import type { ListboxOption } from './option.js';
import { listboxOptionTemplate } from '@microsoft/fast-foundation';

/**
 * The template for the fluent-option component.
 * @public
 */
export const template: ElementViewTemplate<ListboxOption> = listboxOptionTemplate();
