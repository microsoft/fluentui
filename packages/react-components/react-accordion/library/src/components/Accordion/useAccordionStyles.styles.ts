import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AccordionSlots, AccordionState } from './Accordion.types';

import styles from './Accordion.module.css';

export const accordionClassNames: SlotClassNames<AccordionSlots> = {
  root: 'fui-Accordion',
};

/*
 * Accordion has no styles of its own — `clsx` replaced `mergeClasses` here purely to drop the
 * `@griffel/react` runtime import (Griffel → Tailwind + CSS Modules migration,
 * migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3). `Accordion.module.css` accordingly
 * declares no styling at all: it exists for the single identity-only `.root` local imported
 * above, and its header explains both why that local is needed and why it cannot be spelled
 * as an empty rule.
 *
 * ARGUMENT ORDER — `styles.root`, static, marker, consumer className. Order carries no
 * cascade meaning (the `@layer fui.*` order decides every tie, DECISIONS.md D2), so the only
 * thing position buys is the D15.1 invariant: the marker must never be `classList[0]`,
 * because nwsapi's `:scope` polyfill builds its anchor from `escape(element.classList[0])`
 * and the `/` in `group/fui-accordion` survives that escaping into an invalid selector,
 * throwing a render-time `AggregateError` under jsdom.
 *
 * Accordion's root is a "Class B" slot in the statics-removal design (§4b): it carries the
 * marker but had NO unconditional module class, so `fui-Accordion` was the only thing holding
 * index 0 — and that static is scheduled for removal. `styles.root` is the token that keeps
 * the invariant satisfied afterwards, and leading with it NOW (statics still present, so this
 * change is inert) makes that removal a pure deletion of one argument. Do not reorder.
 *
 * The `group/fui-accordion` marker is a literal, unhashed, GLOBAL token (DECISIONS.md D15).
 * Accordion owns the outermost element of the Accordion > AccordionItem > AccordionHeader /
 * AccordionPanel nest, so this is the marker a descendant module reads as
 * `@variant group-…/fui-accordion { … }`. It is inert until some module references it.
 *
 * Deliberately NOT a TSDoc comment: api-extractor would flip this export from
 * `@public (undocumented)` to `@public` in etc/react-accordion.api.md, i.e. an API-report
 * diff on a pure styling change.
 */
export const useAccordionStyles_unstable = (state: AccordionState): AccordionState => {
  state.root.className = clsx(styles.root, accordionClassNames.root, 'group/fui-accordion', state.root.className);

  return state;
};
