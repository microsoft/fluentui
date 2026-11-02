'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AccordionPanelProps } from './AccordionPanel.types';
import { useAccordionPanel } from './useAccordionPanel';
import { renderAccordionPanel } from './renderAccordionPanel';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Represents the content area of an accordion item, revealed when the associated header is toggled open.
 */
export const AccordionPanel: ForwardRefComponent<AccordionPanelProps> = /*#__PURE__*/ composeComponent(
  'AccordionPanel',
  useAccordionPanel,
  renderAccordionPanel,
);
