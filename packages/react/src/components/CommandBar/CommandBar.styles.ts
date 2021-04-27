import { ICommandBarStyleProps, ICommandBarStyles } from './CommandBar.types';
import { IButtonStyles } from '../../Button';
import { memoizeFunction } from '../../Utilities';
import { IStyle } from '../../Styling';

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
        flexBasis: '350px',
      },
    ],
    middleSet: [
      'ms-CommandBar-middleCommand',
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
      },
    ],
    secondarySet: [
      'ms-CommandBar-secondaryCommand',
      {
        display: 'flex',
        alignItems: 'stretch',
        flexShrink: '1',
        justifyContent: 'flex-end',
        flexBasis: '350px',
      },
    ],
  };
};

export const getCommandButtonStyles = memoizeFunction(
  (customStyles: IButtonStyles | undefined): IButtonStyles => {
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
  },
);
