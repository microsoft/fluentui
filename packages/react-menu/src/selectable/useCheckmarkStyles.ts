import { makeStyles, ax } from '@fluentui/react-make-styles';
import { ObjectShorthandProps } from '@fluentui/react-utils';
import { MenuItemSelectableState } from './types';

/**
 * Style hook for checkmark icons
 */
const useStyles = makeStyles<MenuItemSelectableState>([
  [
    null,
    () => ({
      width: '16px',
      height: '16px',
      marginRight: '9px',
      visibility: 'hidden',
    }),
  ],
  [
    state => state.checked,
    () => ({
      visibility: 'visible',
    }),
  ],
]);

/**
 * Applies styles to a checkmark slot for selectable menu items
 *
 * @param state should contain a `checkmark` slot
 */
export const useCheckmarkStyles = (
  state: MenuItemSelectableState & { checkmark: ObjectShorthandProps<HTMLElement> },
) => {
  const checkmarkClassName = useStyles(state);
  if (state.checkmark) {
    state.checkmark.className = ax(checkmarkClassName, state.checkmark.className);
  }
};
