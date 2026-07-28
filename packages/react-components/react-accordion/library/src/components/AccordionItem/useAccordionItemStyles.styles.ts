import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AccordionItemSlots, AccordionItemState } from './AccordionItem.types';

import styles from './AccordionItem.module.css';

export const accordionItemClassNames: SlotClassNames<AccordionItemSlots> = {
  root: 'fui-AccordionItem',
};

/*
 * AccordionItem has no styles of its own — `clsx` replaced `mergeClasses` here purely to drop
 * the `@griffel/react` runtime import (Griffel → Tailwind + CSS Modules migration,
 * migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3). `AccordionItem.module.css`
 * accordingly declares no styling at all: it exists for the single identity-only `.root`
 * local imported above, and its header explains both why that local is needed and why it
 * cannot be spelled as an empty rule.
 *
 * ARGUMENT ORDER — `styles.root`, static, marker, consumer className. Order carries no
 * cascade meaning (the `@layer fui.*` order decides every tie, DECISIONS.md D2), so the only
 * thing position buys is the D15.1 invariant: the marker must never be `classList[0]`,
 * because nwsapi's `:scope` polyfill builds its anchor from `escape(element.classList[0])`
 * and the `/` in `group/fui-accordion-item` survives that escaping into an invalid selector,
 * throwing a render-time `AggregateError` under jsdom.
 *
 * AccordionItem's root is a "Class B" slot in the statics-removal design (§4b): it carries
 * the marker but had NO unconditional module class, so `fui-AccordionItem` was the only thing
 * holding index 0 — and that static is scheduled for removal. `styles.root` is the token that
 * keeps the invariant satisfied afterwards, and leading with it NOW (statics still present,
 * so this change is inert) makes that removal a pure deletion of one argument. Do not
 * reorder.
 *
 * The `group/fui-accordion-item` marker is a literal, unhashed, GLOBAL token
 * (DECISIONS.md D15) — the handle by which AccordionHeader's or AccordionPanel's module can
 * style itself from the item it sits in, which `styles.root` (hashed, per-module) can never
 * be. No `data-open` mirror is added here: mirroring is out of scope for this rollout and
 * widens invalidation, so it is added only when a child genuinely needs it.
 *
 * Deliberately NOT a TSDoc comment: api-extractor would flip this export from
 * `@public (undocumented)` to `@public` in etc/react-accordion.api.md, i.e. an API-report
 * diff on a pure styling change.
 */
export const useAccordionItemStyles_unstable = (state: AccordionItemState): AccordionItemState => {
  state.root.className = clsx(
    styles.root,
    accordionItemClassNames.root,
    'group/fui-accordion-item',
    state.root.className,
  );

  return state;
};
