import { IButtonBaseStyleProps, IButtonBaseStyles } from '../_base/Button.base.types';

export const getStyles = (props: IButtonBaseStyleProps): IButtonBaseStyles => {
  const { theme, checked, disabled, expanded } = props;
  // const { palette, fonts } = theme;

  return ({
    root: [
      {
        display: 'inline-flex',
        color: theme.palette.white,
        backgroundColor: 'blue',
        selectors: {
          ':hover': {
            backgroundColor: theme.palette.neutralLight
          }
        },
      },
      disabled && {
        backgroundColor: theme.palette.neutralLighter,
        selectors: {
          ':hover': {
            backgroundColor: theme.palette.neutralLighter,
          }
        }
      },
      checked && {
        backgroundColor: theme.palette.themePrimary,
      },
      expanded && {
        backgroundColor: theme.palette.neutralLight,
      }
    ],
    button: [
      {
        display: 'flex',
        background: 'transparent',
      }
    ]
  });
};