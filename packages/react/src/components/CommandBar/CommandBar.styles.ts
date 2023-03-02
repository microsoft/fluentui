import { memoizeFunction } from '../../Utilities';
import type { ICommandBarStyleProps, ICommandBarStyles } from './CommandBar.types';
import type { IButtonStyles } from '../../Button';
import type { IStyle } from '../../Styling';

const COMMAND_BAR_HEIGHT = 44;

export const getStyles = (props: ICommandBarStyleProps): ICommandBarStyles => {
  const { className, theme } = props;
  const { semanticColors } = theme;

  return {
    root: [
      theme.fonts.medium,
      'ms-CommandBar',
      {
        display: 'flex',
        backgroundColor: semanticColors.bodyBackground,
        padding: '0 14px 0 24px',
        height: COMMAND_BAR_HEIGHT,
      },
      className,
    ],
    primarySet: [
      'ms-CommandBar-primaryCommand',
      {
        flexGrow: '1',
        display: 'flex',
        alignItems: 'stretch',
      },
    ],
    secondarySet: [
      'ms-CommandBar-secondaryCommand',
      {
        flexShrink: '0',
        display: 'flex',
        alignItems: 'stretch',
      },
    ],
  };
};

export const getCommandButtonStyles = memoizeFunction((customStyles: IButtonStyles | undefined): IButtonStyles => {
  const rootStyles: IStyle = {
    height: '100%',
  };
  const labelStyles: IStyle = {
    whiteSpace: 'nowrap',
  };

  const { root, label, ...restCustomStyles } = customStyles || {};

  return {
    ...restCustomStyles,
    root: root ? [rootStyles, root] : rootStyles,
    label: label ? [labelStyles, label] : labelStyles,
  };
});
