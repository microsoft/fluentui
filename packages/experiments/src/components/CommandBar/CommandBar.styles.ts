import { ICommandBarStyleProps, ICommandBarStyles } from './CommandBar.types';

export const getStyles = (props: ICommandBarStyleProps): ICommandBarStyles => {

  const { className, theme, endAligned } = props;
  const { palette } = theme;

  return ({
    root: [
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
      {
        flexGrow: '1',
        display: 'flex',
        alignItems: 'stretch',
      },
      endAligned && { justifyContent: 'flex-end' }
    ],
    secondarySet: [
      {
        flexShrink: '0',
        display: 'flex',
        alignItems: 'stretch',
      }
    ]
  });
};