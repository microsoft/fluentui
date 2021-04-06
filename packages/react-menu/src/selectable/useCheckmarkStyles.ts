import * as React from 'react';
import { makeStyles, useAx } from '@fluentui/react-make-styles';
import { ObjectShorthandProps } from '@fluentui/react-utilities';
import { MenuItemSelectableState } from './types';

const useStyles = makeStyles({
  root: {
    width: '16px',
    height: '16px',
    marginRight: '8px',
    visibility: 'hidden',
  },
  rootChecked: {
    visibility: 'visible',
  },
});

/**
 * Applies styles to a checkmark slot for selectable menu items
 *
 * @param state - should contain a `checkmark` slot
 */
export const useCheckmarkStyles = (
  state: MenuItemSelectableState & { checkmark: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>> },
) => {
  const styles = useStyles();
  if (state.checkmark) {
    state.checkmark.className = useAx(styles.root, state.checked && styles.rootChecked, state.checkmark.className);
  }
};
