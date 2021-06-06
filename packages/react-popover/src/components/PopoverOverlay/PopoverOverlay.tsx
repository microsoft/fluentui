import * as React from 'react';
import { usePopoverOverlay } from './usePopoverOverlay';
import { PopoverOverlayProps } from './PopoverOverlay.types';
import { renderPopoverOverlay } from './renderPopoverOverlay';
import { usePopoverOverlayStyles } from './usePopoverOverlayStyles';

/**
 * PopoverOverlay component renders react children in a positioned box
 */
export const PopoverOverlay = React.forwardRef<HTMLElement, PopoverOverlayProps>((props, ref) => {
  const state = usePopoverOverlay(props, ref);

  usePopoverOverlayStyles(state);
  return renderPopoverOverlay(state);
});

PopoverOverlay.displayName = 'PopoverOverlay';
