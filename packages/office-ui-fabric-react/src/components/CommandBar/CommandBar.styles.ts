import { ICommandBarStyleProps, ICommandBarStyles } from './CommandBar.types';

const COMMAND_BAR_HEIGHT = 44;

export const getStyles = (props: ICommandBarStyleProps): ICommandBarStyles => {
  const { className, theme } = props;
  const { palette } = theme;

  return {
    root: [
      theme.fonts.medium,
      'ms-CommandBar',
      {
        display: 'flex',
        backgroundColor: palette.white,
        padding: '0 14px 0 24px',
        height: COMMAND_BAR_HEIGHT
      },
      className
    ],
    primarySet: [
      'ms-CommandBar-primaryCommand',
      {
        flexGrow: '1',
        display: 'flex',
        alignItems: 'stretch'
      }
    ],
    secondarySet: [
      'ms-CommandBar-secondaryCommand',
      {
        flexShrink: '0',
        display: 'flex',
        alignItems: 'stretch'
      }
    ]
  };
};
