import { ElementViewTemplate, html } from '@microsoft/fast-element';
// import { FASTDivider } from '@microsoft/fast-foundation';
import type { Divider } from './divider.js';

/**
 * @internal
 */
export const template: ElementViewTemplate<Divider> = html<Divider>`<slot></slot>`;
