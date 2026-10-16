'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AccordionHeaderProps } from './AccordionHeader.types';
import { useAccordionHeader, useAccordionHeaderContextValues } from './useAccordionHeader';
import { renderAccordionHeader } from './renderAccordionHeader';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Represents the heading of an accordion item, containing a button that toggles the panel open or closed.
 */
export const AccordionHeader: ForwardRefComponent<AccordionHeaderProps> = /*#__PURE__*/ composeComponent(
  'AccordionHeader',
  useAccordionHeader,
  renderAccordionHeader,
  useAccordionHeaderContextValues,
);
