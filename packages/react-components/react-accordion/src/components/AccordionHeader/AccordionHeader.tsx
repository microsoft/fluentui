import * as React from 'react';
import { useAccordionHeader_unstable } from './useAccordionHeader';
import { renderAccordionHeader_unstable } from './renderAccordionHeader';
import { useAccordionHeaderStyles_unstable } from './useAccordionHeaderStyles';
import { useAccordionHeaderContextValues_unstable } from './useAccordionHeaderContextValues';
import type { AccordionHeaderProps } from './AccordionHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * Define a styled AccordionHeader, using the `useAccordionHeader_unstable` and `useAccordionHeaderStyles_unstable`
 * hooks.
 */
export const AccordionHeader: ForwardRefComponent<AccordionHeaderProps> = React.forwardRef((props, ref) => {
  const state = useAccordionHeader_unstable(props, ref);
  const contextValues = useAccordionHeaderContextValues_unstable(state);

  useAccordionHeaderStyles_unstable(state);

  const { useAccordionHeaderStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderAccordionHeader_unstable(state, contextValues);
});

AccordionHeader.displayName = 'AccordionHeader';
