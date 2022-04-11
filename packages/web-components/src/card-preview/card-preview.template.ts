import { html } from '@microsoft/fast-element';
import type { CardPreview } from './card-preview';

/**
 * The template for the Card Preview component.
 * @public
 */
export const cardPreviewTemplate = html<CardPreview>`
  <slot></slot>
  <slot name="logo"></slot>
`;
