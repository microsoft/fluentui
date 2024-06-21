import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Avatar } from './avatar.js';

const defaultIconTemplate = html`<svg
  width="1em"
  height="1em"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
  class="default-icon"
  fill="currentcolor"
  aria-hidden="true"
>
  <path
    d="M10 2a4 4 0 100 8 4 4 0 000-8zM7 6a3 3 0 116 0 3 3 0 01-6 0zm-2 5a2 2 0 00-2 2c0 1.7.83 2.97 2.13 3.8A9.14 9.14 0 0010 18c1.85 0 3.58-.39 4.87-1.2A4.35 4.35 0 0017 13a2 2 0 00-2-2H5zm-1 2a1 1 0 011-1h10a1 1 0 011 1c0 1.3-.62 2.28-1.67 2.95A8.16 8.16 0 0110 17a8.16 8.16 0 01-4.33-1.05A3.36 3.36 0 014 13z"
  ></path>
</svg>`;

/**
 * The template for the Avatar component.
 * @public
 */
export function avatarTemplate<T extends Avatar>(): ElementViewTemplate<T> {
  return html<T>`
    <slot>${x => (x.name || x.initials ? x.generateInitials() : defaultIconTemplate)}</slot>
    <slot name="badge"></slot>
  `;
}

export const template: ElementViewTemplate<Avatar> = avatarTemplate();
