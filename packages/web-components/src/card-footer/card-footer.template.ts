import { html } from '@microsoft/fast-element';
import type { CardFooter } from './card-footer';

/**
 * The template for the Card Footer component.
 * @public
 */
export const cardFooterTemplate = html<CardFooter>`
  <slot></slot>
  <slot name="action"></slot>
`;
