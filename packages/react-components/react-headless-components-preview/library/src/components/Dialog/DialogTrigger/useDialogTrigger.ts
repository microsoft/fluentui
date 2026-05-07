'use client';

import {
  applyTriggerPropsToChildren,
  getTriggerChild,
  getReactElementRef,
  useEventCallback,
} from '@fluentui/react-utilities';
import type * as React from 'react';
import { useDialogContext, useDialogSurfaceContext } from '../dialogContext';
import type { DialogTriggerProps, DialogTriggerState } from './DialogTrigger.types';

/**
 * Create the state required to render DialogTrigger.
 * Clones the single child component and adds click handling to open or close the dialog.
 *
 * @param props - props from this instance of DialogTrigger
 */
export const useDialogTrigger = (props: DialogTriggerProps): DialogTriggerState => {
  const isInsideSurface = useDialogSurfaceContext();
  const { children, action = isInsideSurface ? 'close' : 'open' } = props;

  const child = getTriggerChild(children);
  const requestOpenChange = useDialogContext().requestOpenChange;

  const handleClick = useEventCallback((event: React.MouseEvent) => {
    (child?.props as { onClick?: React.MouseEventHandler })?.onClick?.(event);
    if (!event.isDefaultPrevented()) {
      requestOpenChange({
        event,
        type: 'triggerClick',
        open: action === 'open',
      });
    }
  });

  return {
    children: applyTriggerPropsToChildren(children, {
      ...child?.props,
      ref: getReactElementRef(child),
      onClick: handleClick,
      'aria-haspopup': action === 'open' ? 'dialog' : undefined,
    }),
  };
};
