import * as React from 'react';
import { usePopoverContent } from './usePopoverContent';
import { PopoverContentProps } from './PopoverContent.types';
import { renderPopoverContent } from './renderPopoverContent';
import { usePopoverContentStyles } from './usePopoverContentStyles';

/**
 * PopoverContent component renders react children in a positioned box
 */
export const PopoverContent = React.forwardRef<HTMLElement, PopoverContentProps>((props, ref) => {
  const state = usePopoverContent(props, ref);

  usePopoverContentStyles(state);
  return renderPopoverContent(state);
});

PopoverContent.displayName = 'PopoverContent';
