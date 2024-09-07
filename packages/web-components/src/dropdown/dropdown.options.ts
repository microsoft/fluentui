import type { InlineTemplateDirective } from '@microsoft/fast-element';
import type { ValuesOf } from '../utils/typings.js';

export interface DropdownOptions {
  triggerIndicator?: InlineTemplateDirective;
}

/**
 * Values for the `size` attribute on Dropdown elements.
 *
 * @public
 */
export const DropdownSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export type DropdownSize = ValuesOf<typeof DropdownSize>;

/**
 * Values for the `appearance` attribute on Dropdown elements.
 *
 * @public
 */
export const DropdownAppearance = {
  outline: 'outline',
  filledLighter: 'filled-lighter',
  filledDarker: 'filled-darker',
  transparent: 'transparent',
} as const;

export type DropdownAppearance = ValuesOf<typeof DropdownAppearance>;
