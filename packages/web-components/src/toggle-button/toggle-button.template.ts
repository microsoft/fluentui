import { ElementViewTemplate } from '@microsoft/fast-element';
import { buttonTemplate } from '../button/button.template.js';
import type { ToggleButton } from './toggle-button.js';

/**
 * The template for the ToggleButton component.
 * @public
 */
export const template: ElementViewTemplate<ToggleButton> = buttonTemplate();
