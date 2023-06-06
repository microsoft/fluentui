import { ElementViewTemplate } from '@microsoft/fast-element';
import { textFieldTemplate } from '@microsoft/fast-foundation';
import type { TextInput } from './text-input.js';

/**
 * @internal
 */
export const template: ElementViewTemplate<TextInput> = textFieldTemplate();
