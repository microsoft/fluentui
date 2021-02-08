import { makeStyles, ax } from '@fluentui/react-make-styles';
import { MenuItemState } from './MenuItem.types';

/**
 * Styles for the root slot
 */
export const useRootStyles = makeStyles([
  [
    null,
    theme => ({
      color: theme.alias.color.neutral.neutralForeground1,
      backgroundColor: theme.alias.color.neutral.neutralBackground1,
      paddingRight: '12px',
      paddingLeft: '12px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      fontSize: theme.global.type.fontSizes.base[300],

      ':hover': {
        backgroundColor: theme.alias.color.neutral.neutralBackground1Hover,
      },

      ':focus': {
        backgroundColor: theme.alias.color.neutral.neutralBackground1Hover,
      },
    }),
  ],
]);

/**
 * Styles for the icon slot
 */
export const useIconStyles = makeStyles([
  [
    null,
    () => ({
      width: '20px',
      height: '20px',
      marginRight: '9px',
    }),
  ],
]);

/** Applies style classnames to slots */
export const useMenuItemStyles = (state: MenuItemState) => {
  const rootClassName = useRootStyles({});
  const iconClassName = useIconStyles({});

  state.className = ax(rootClassName, state.className);

  if (state.icon) {
    state.icon.className = ax(iconClassName, state.icon.className);
  }
};
