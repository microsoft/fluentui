'use client';

import type * as React from 'react';
import type { FluentTriggerComponent, JSXElement } from '@fluentui/react-utilities';
import { renderPopoverTrigger, usePopoverTrigger } from '@fluentui/react-headless-components-preview/popover';

import type { PopoverTriggerProps } from './PopoverTrigger.types';
import { usePopoverTriggerStyles } from './usePopoverTriggerStyles';

/**
 * A PopoverTrigger wires the consumer's own element to the popover it opens. Windmod
 * PopoverTrigger: the headless trigger plus the marker pair, so a consumer can compose against
 * the trigger the same way they compose against any windmod component.
 */
export const PopoverTrigger: React.FC<PopoverTriggerProps> = (props: PopoverTriggerProps): JSXElement | null => {
  const state = usePopoverTrigger(props);
  const styled = usePopoverTriggerStyles(state);

  return renderPopoverTrigger(styled);
};

PopoverTrigger.displayName = 'PopoverTrigger';

/** Lets trigger utilities clone props through PopoverTrigger. */
(PopoverTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
