import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Text } from './text-input.js';

/**
 * @internal
 */
export const template: ElementViewTemplate<Text> = html<Text>`<slot></slot>`;
