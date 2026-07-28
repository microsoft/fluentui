import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AccordionSlots, AccordionState } from './Accordion.types';

export const accordionClassNames: SlotClassNames<AccordionSlots> = {
  root: 'fui-Accordion',
};

/*
 * Accordion has no styles of its own — the hook only stamps the static `fui-*` class.
 * There is therefore no `Accordion.module.css`; `clsx` replaces `mergeClasses` purely to
 * drop the `@griffel/react` runtime import (Griffel → Tailwind + CSS Modules migration,
 * migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3). Named group marker first, then the
 * static class (conformance contract), consumer className last.
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
  state.root.className = clsx('group/fui-accordion', accordionClassNames.root, state.root.className);

  return state;
};
