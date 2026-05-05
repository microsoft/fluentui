import { Orientation } from '@microsoft/fast-web-utilities';
import type { ValuesOf } from '../utils/typings.js';
import { FluentDesignSystem } from '../fluent-design-system.js';

/**
 * Radio Group orientation
 * @public
 */
export const RadioGroupOrientation = Orientation;

/**
 * Types of Radio Group orientation
 * @public
 */
export type RadioGroupOrientation = ValuesOf<typeof RadioGroupOrientation>;

/**
 * The tag name for the radio group element.
 *
 * @public
 */
export const tagName = `${FluentDesignSystem.prefix}-radio-group` as const;
