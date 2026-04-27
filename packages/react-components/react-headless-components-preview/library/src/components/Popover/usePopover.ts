'use client';

import * as React from 'react';
import { useOnClickOutside, useOnScrollOutside, elementContains } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { PopoverProps, PopoverState } from './Popover.types';
import { usePopoverBase, ensureNativePopoverShown } from './usePopoverBase';

export { usePopoverContextValues } from './usePopoverBase';

/**
 * Returns the state for a Popover component.
 */
export const usePopover = (props: PopoverProps): PopoverState => {
  const base = usePopoverBase(props);
  const { open, setOpen, triggerRef, contentRef, inline, openOnContext, closeOnScroll, closeOnIframeFocus } = base;

  const { targetDocument } = useFluent();

  useOnClickOutside({
    contains: elementContains,
    element: targetDocument,
    callback: ev => setOpen(ev, false),
    refs: [triggerRef, contentRef],
    disabled: !open,
    disabledFocusOnIframe: !closeOnIframeFocus,
  });

  useOnScrollOutside({
    contains: elementContains,
    element: targetDocument,
    callback: ev => setOpen(ev, false),
    refs: [triggerRef, contentRef],
    disabled: !open || !(openOnContext || closeOnScroll),
  });

  React.useEffect(() => {
    const surface = contentRef.current;

    if (!surface || inline || !open) {
      return;
    }

    ensureNativePopoverShown(surface, 'manual');
  }, [open, inline, contentRef]);

  return { ...base, popoverType: 'manual' };
};
