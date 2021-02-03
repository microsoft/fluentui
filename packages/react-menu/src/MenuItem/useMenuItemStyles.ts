import { makeStyles } from '@fluentui/react-make-styles';
import { MenuItemState } from './MenuItem.types';

/** Styles for the root slot */
export const useRootStyles = makeStyles([
  [
    null,
    theme => ({
      color: theme.neutralColorTokens.neutralForeground1,
      backgroundColor: theme.neutralColorTokens.neutralBackground1,
      paddingRight: '12px',
      paddingLeft: '12px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      fontSize: theme.fontSizes.base[300],

      ':hover': {
        backgroundColor: theme.neutralColorTokens.neutralBackground1Hover,
      },

      ':focus': {
        backgroundColor: theme.neutralColorTokens.neutralBackground1Hover,
      },
    }),
  ],
]);

/** Styles for the icon slot */
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

  state.className = rootClassName;

  if (state.icon) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // TODO figure out typings
    state.icon.className = iconClassName;
  }
};
