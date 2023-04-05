import { ElementViewTemplate } from '@microsoft/fast-element';
import { anchorTemplate } from '@microsoft/fast-foundation';
import type { Link } from './link.js';

/**
 * The template for the Button component.
 * @public
 */
export const template: ElementViewTemplate<Link> = anchorTemplate();
