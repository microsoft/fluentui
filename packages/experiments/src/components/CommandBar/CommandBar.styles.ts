import { ICommandBarStyleProps, ICommandBarStyles } from './CommandBar.types';
import {
  ITheme,
  getFocusStyle,
  FontSizes
} from 'office-ui-fabric-react';

export const getStyles = (props: ICommandBarStyleProps): ICommandBarStyles => {

  const { className, theme } = props;
  const { semanticColors, palette } = theme;

  return ({
    root: [
      'ms-CommandBar',
      {
        display: 'flex',
        backgroundColor: palette.neutralLighter,
        padding: '0 16px'
      }
    ],
    primarySet: [
      {
        flexGrow: '1',
        display: 'flex',
        alignItems: 'stretch',
      }
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