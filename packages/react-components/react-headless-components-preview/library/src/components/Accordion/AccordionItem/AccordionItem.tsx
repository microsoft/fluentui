'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AccordionItemProps } from './AccordionItem.types';
import { useAccordionItem, useAccordionItemContextValues } from './useAccordionItem';
import { renderAccordionItem } from './renderAccordionItem';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Represents a single collapsible section within an Accordion, containing a header and a panel.
 */
export const AccordionItem: ForwardRefComponent<AccordionItemProps> = /*#__PURE__*/ composeComponent(
  'AccordionItem',
  useAccordionItem,
  renderAccordionItem,
  useAccordionItemContextValues,
);
