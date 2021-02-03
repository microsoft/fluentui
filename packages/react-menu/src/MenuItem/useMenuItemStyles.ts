import { makeStyles } from '@fluentui/react-make-styles';
import { MenuItemState } from './MenuItem.types';

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

      ':hover': {
        backgroundColor: theme.neutralColorTokens.neutralBackground1Hover,
      },

      ':focus': {
        backgroundColor: theme.neutralColorTokens.neutralBackground1Hover,
      },
    }),
  ],
]);

export const useIconStyles = makeStyles([
  [
    null,
    () => ({
      width: '20px',
      height: '20px',
    }),
  ],
]);

export const useCheckmarkStyles = makeStyles([
  [
    null,
    () => ({
      width: '16px',
      height: '16px',
    }),
  ],
]);

export const useMenuItemStyles = (state: MenuItemState) => {
  const rootClassName = useRootStyles({});
  const iconClassName = useIconStyles({});

  state.className = rootClassName;

  if (state.icon) {
    state.icon.className = iconClassName;
  }
};
