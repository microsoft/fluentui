import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Divider } from './divider.js';

/**
 * @internal
 */
export const template: ElementViewTemplate<Divider> = html<Divider>`<slot></slot>`;
