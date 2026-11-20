import { type ElementViewTemplate, html, ref, ViewTemplate } from '@microsoft/fast-element';
import type { Link } from './link.js';

/**
 * The template for the Link component.
 * @public
 */
export function anchorTemplate<T extends Link>(): ViewTemplate<T> {
  return html<T>`<template
    @focusin="${(x, c) => x.focusHandler(c.event)}"
    @focusout="${(x, c) => x.focusHandler(c.event)}"
    @pointerdown="${(x, c) => x.focusHandler(c.event)}"
    ><a
      download="${x => x.download}"
      href="${x => x.href}"
      hreflang="${x => x.hreflang}"
      part="control"
      ping="${x => x.ping}"
      referrerpolicy="${x => x.referrerpolicy}"
      rel="${x => x.rel}"
      tabindex="0"
      target="${x => x.target}"
      type="${x => x.type}"
      ${ref('control')}
      ><slot></slot></a
  ></template>`;
}

/**
 * The template for the Link component.
 * @public
 */
export const template: ElementViewTemplate<Link> = anchorTemplate();
