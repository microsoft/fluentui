import * as React from 'react';
import { useAccordionHeader_unstable } from './useAccordionHeader';
import { renderAccordionHeader_unstable } from './renderAccordionHeader';
import { useAccordionHeaderStyles_unstable } from './useAccordionHeaderStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useAccordionHeaderContextValues_unstable } from './useAccordionHeaderContextValues';
import type { AccordionHeaderProps } from './AccordionHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled AccordionHeader, using the `useAccordionHeader_unstable` and `useAccordionHeaderStyles_unstable`
 * hooks.
 */
export const AccordionHeader: ForwardRefComponent<AccordionHeaderProps> = React.forwardRef((props, ref) => {
  const state = useAccordionHeader_unstable(props, ref);
  const contextValues = useAccordionHeaderContextValues_unstable(state);

  useAccordionHeaderStyles_unstable(state);

  useCustomStyleHook_unstable('useAccordionHeaderStyles_unstable')(state);

  return renderAccordionHeader_unstable(state, contextValues);
});

AccordionHeader.displayName = 'AccordionHeader';
