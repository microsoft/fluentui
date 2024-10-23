import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Image } from './image.js';

/**
 * Template for the Image component
 * @public
 */
export const template: ElementViewTemplate<Image> = html<Image>`<slot></slot>`;
