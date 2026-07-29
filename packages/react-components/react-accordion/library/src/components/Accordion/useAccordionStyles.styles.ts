import { clsx } from 'clsx';
import type { AccordionState } from './Accordion.types';

import styles from './Accordion.module.css';

/**
 * Accordion's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-Accordion` BEM static is gone (D16.1), and the type has narrowed from
 * `SlotClassNames<AccordionSlots>` to `{ root: string }` so that any read of a per-slot key
 * is a compile error on the exact line that would otherwise have silently stopped matching.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + accordionClassNames.root` is invalid CSS. Use
 * `fuiSelector(accordionClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's four, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const accordionClassNames: { root: string } = {
  root: 'group/fui-accordion',
};

/*
 * Accordion has no styles of its own — `clsx` replaced `mergeClasses` here purely to drop the
 * `@griffel/react` runtime import (Griffel → Tailwind + CSS Modules migration,
 * migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3). `Accordion.module.css` accordingly
 * declares no styling at all: it exists for the single identity-only `.root` local imported
 * above, and its header explains both why that local is needed and why it cannot be spelled
 * as an empty rule.
 *
 * ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). Order
 * carries no cascade meaning (the `@layer fui.*` order decides every tie, DECISIONS.md D2),
 * so the only thing position buys is the D15.1 invariant: the marker must never be
 * `classList[0]`, because nwsapi's `:scope` polyfill builds its anchor from
 * `escape(element.classList[0])` and the `/` in `group/fui-accordion` survives that escaping
 * into an invalid selector, throwing a render-time `AggregateError` under jsdom.
 *
 * Accordion's root is one of the six "Class B" slots (D16.2): it carries the marker but has
 * NO unconditional module class of its own, so before D16 the `fui-Accordion` static was the
 * only thing holding index 0. `styles.root` — the identity-only local minted for exactly this
 * purpose — is what keeps the invariant satisfied now that the static is gone. Do not reorder,
 * and do not delete that local because it looks empty.
 *
 * The `group/fui-accordion` marker is a literal, unhashed, GLOBAL token (DECISIONS.md D15) and
 * is written literally here rather than read back out of `accordionClassNames`. Accordion owns
 * the outermost element of the Accordion > AccordionItem > AccordionHeader / AccordionPanel
 * nest, so this is the marker a descendant module reads as
 * `@variant group-…/fui-accordion { … }`. It is inert until some module references it.
 */
export const useAccordionStyles_unstable = (state: AccordionState): AccordionState => {
  state.root.className = clsx(styles.root, 'group/fui-accordion', state.root.className);

  return state;
};
