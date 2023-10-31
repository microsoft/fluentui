import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ListItemButtonProps, ListItemButtonState } from './ListItemButton.types';
import { Button } from '@fluentui/react-button';

/**
 * Create the state required to render ListItemButton.
 *
 * The returned state can be modified with hooks such as useListItemButtonStyles_unstable,
 * before being passed to renderListItemButton_unstable.
 *
 * @param props - props from this instance of ListItemButton
 * @param ref - reference to root HTMLElement of ListItemButton
 */
export const useListItemButton_unstable = (
  props: ListItemButtonProps,
  ref: React.Ref<HTMLElement>,
): ListItemButtonState => {
  return {
    components: {
      root: Button,
    },
    root: slot.always(props, { elementType: Button, defaultProps: { appearance: 'transparent' } }),
  };
};
