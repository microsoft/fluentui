import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Text } from './text.js';

/**
 * @internal
 */
export const template: ElementViewTemplate<Text> = html<Text>`<slot></slot>`;
