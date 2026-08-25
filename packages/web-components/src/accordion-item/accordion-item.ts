import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
import { StartEnd, type StartEndOptions } from '../patterns/start-end.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { BaseAccordionItem } from './accordion-item.base.js';
import type { AccordionItemMarkerPosition, AccordionItemSize } from './accordion-item.options.js';

/**
 * Accordion Item configuration options
 *
 * @public
 */
export type AccordionItemOptions = StartEndOptions<AccordionItem> & {
  expandedIcon?: StaticallyComposableHTML<AccordionItem>;
  collapsedIcon?: StaticallyComposableHTML<AccordionItem>;
};

/**
 * An Accordion Item Custom HTML Element.
 * Based on BaseAccordionItem and includes style and layout specific attributes
 *
 * @tag fluent-accordion-item
 *
 * @presentational {AccordionItemSize | undefined} size - Defines accordion header font size.
 * @presentational {AccordionItemMarkerPosition | undefined} marker-position - Sets expand and collapsed icon position.
 * @presentational {boolean} block - Sets the width of the focus state.
 *
 * @public
 */
export class AccordionItem extends BaseAccordionItem {}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface AccordionItem extends StartEnd {}
applyMixins(AccordionItem, StartEnd);
