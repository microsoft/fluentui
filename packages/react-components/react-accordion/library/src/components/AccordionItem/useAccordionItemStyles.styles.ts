import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AccordionItemSlots, AccordionItemState } from './AccordionItem.types';

export const accordionItemClassNames: SlotClassNames<AccordionItemSlots> = {
  root: 'fui-AccordionItem',
};

/*
 * AccordionItem has no styles of its own — the hook only stamps the static `fui-*` class.
 * There is therefore no `AccordionItem.module.css`; `clsx` replaces `mergeClasses` purely
 * to drop the `@griffel/react` runtime import (Griffel → Tailwind + CSS Modules migration,
 * migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3). Static class first (conformance
 * contract), then the named group marker, consumer className last — the marker must never
 * be `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
 * D15.1).
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
  state.root.className = clsx(accordionItemClassNames.root, 'group/fui-accordion-item', state.root.className);

  return state;
};
