import { Orientation } from '@microsoft/fast-web-utilities';
import type { ValuesOf } from '../utils/index.js';

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
