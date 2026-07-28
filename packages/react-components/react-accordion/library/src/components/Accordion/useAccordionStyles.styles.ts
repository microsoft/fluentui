import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AccordionSlots, AccordionState } from './Accordion.types';

export const accordionClassNames: SlotClassNames<AccordionSlots> = {
  root: 'fui-Accordion',
};

/*
 * Accordion has no styles of its own — the hook only stamps the static `fui-*` class. There
 * is therefore no `Accordion.module.css`; `clsx` replaces `mergeClasses` purely to drop the
 * `@griffel/react` runtime import (Griffel → Tailwind + CSS Modules migration,
 * migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3). Static class first (conformance
 * contract), then the named group marker, consumer className last — the marker must never
 * be `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
 * D15.1).
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
  state.root.className = clsx(accordionClassNames.root, 'group/fui-accordion', state.root.className);

  return state;
};
