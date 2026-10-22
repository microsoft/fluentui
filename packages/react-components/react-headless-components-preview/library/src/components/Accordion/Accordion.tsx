'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AccordionProps } from './Accordion.types';
import { useAccordion, useAccordionContextValues } from './useAccordion';
import { renderAccordion } from './renderAccordion';
import { composeComponent } from '../../utils/composeComponent';

/**
 * Represents a set of collapsible panels with headings.
 */
export const Accordion: ForwardRefComponent<AccordionProps> = /*#__PURE__*/ composeComponent(
  'Accordion',
  useAccordion,
  renderAccordion,
  useAccordionContextValues,
);
