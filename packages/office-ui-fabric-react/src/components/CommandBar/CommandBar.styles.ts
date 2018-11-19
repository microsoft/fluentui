import { ICommandBarStyleProps, ICommandBarStyles } from './CommandBar.types';

export const getStyles = (props: ICommandBarStyleProps): ICommandBarStyles => {
  const { className, theme } = props;
  const { palette } = theme;

  return {
    root: [
      theme.fonts.medium,
      'ms-CommandBar',
      {
        display: 'flex',
        backgroundColor: palette.neutralLighter,
        padding: '0 16px',
        height: '40px'
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
