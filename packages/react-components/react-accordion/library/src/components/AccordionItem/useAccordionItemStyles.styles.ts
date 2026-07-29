import { clsx } from 'clsx';
import type { AccordionItemState } from './AccordionItem.types';

import styles from './AccordionItem.module.css';

/**
 * AccordionItem's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. See `accordionClassNames` in
 * `../Accordion/useAccordionStyles.styles.ts` for the full rationale, including why this is
 * not tagged `@deprecated`. In short: the `fui-AccordionItem` BEM static is gone (D16.1), the
 * type narrowed to `{ root: string }` so per-slot reads are compile errors, and the value is a
 * class TOKEN — use `fuiSelector(accordionItemClassNames.root)` from
 * `@fluentui/react-utilities` to build a selector from it.
 */
export const accordionItemClassNames: { root: string } = {
  root: 'group/fui-accordion-item',
};

/*
 * AccordionItem has no styles of its own — `clsx` replaced `mergeClasses` here purely to drop
 * the `@griffel/react` runtime import (Griffel → Tailwind + CSS Modules migration,
 * migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3). `AccordionItem.module.css`
 * accordingly declares no styling at all: it exists for the single identity-only `.root`
 * local imported above, and its header explains both why that local is needed and why it
 * cannot be spelled as an empty rule.
 *
 * ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). Order
 * carries no cascade meaning (the `@layer fui.*` order decides every tie, DECISIONS.md D2),
 * so the only thing position buys is the D15.1 invariant: the marker must never be
 * `classList[0]`, because nwsapi's `:scope` polyfill builds its anchor from
 * `escape(element.classList[0])` and the `/` in `group/fui-accordion-item` survives that
 * escaping into an invalid selector, throwing a render-time `AggregateError` under jsdom.
 *
 * AccordionItem's root is one of the six "Class B" slots (D16.2): it carries the marker but
 * has NO unconditional module class of its own, so before D16 the `fui-AccordionItem` static
 * was the only thing holding index 0. `styles.root` — the identity-only local minted for
 * exactly this purpose — is what keeps the invariant satisfied now that the static is gone.
 * Do not reorder, and do not delete that local because it looks empty.
 *
 * The `group/fui-accordion-item` marker is a literal, unhashed, GLOBAL token
 * (DECISIONS.md D15), written literally here rather than read back out of
 * `accordionItemClassNames` — the handle by which AccordionHeader's or AccordionPanel's
 * module can style itself from the item it sits in, which `styles.root` (hashed, per-module)
 * can never be. No `data-open` mirror is added here: mirroring is out of scope for this
 * rollout and widens invalidation, so it is added only when a child genuinely needs it.
 */
export const useAccordionItemStyles_unstable = (state: AccordionItemState): AccordionItemState => {
  state.root.className = clsx(styles.root, 'group/fui-accordion-item', state.root.className);

  return state;
};
