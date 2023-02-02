import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Image } from './image.js';

/**
 * Template for the Image component
 * @public
 */
export const template: ElementViewTemplate<Image> = html<Image>`
  <template>
    <img
      alt="${x => x.alt}"
      block="${x => x.block}"
      border="${x => x.border}"
      borderRadius="${x => x.borderRadius}"
      fit="${x => x.fit}"
      margin="${x => x.margin}"
      role="${x => x.role}"
      shadow="${x => x.shadow}"
      shape="${x => x.shape}"
      src="${x => x.src}"
    />
  </template>
`;
