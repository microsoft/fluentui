import {
  ICollapsibleSectionTitleComponent,
  ICollapsibleSectionTitleStylesReturnType,
} from './CollapsibleSectionTitle.types';
import { getFocusStyle } from 'office-ui-fabric-react';

export const getStyles: ICollapsibleSectionTitleComponent['styles'] = (
  props,
  theme,
): ICollapsibleSectionTitleStylesReturnType => ({
  root: [
    getFocusStyle(theme),
    theme.fonts.medium,
    {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      background: 'none',
      border: 'none',
      color: 'inherit',
      height: 24,
      margin: 0,
      paddingLeft: 4 + (props.indent || 0) * 18,

      selectors: {
        ':hover': {
          background: theme.palette.neutralLight,
        },
      },
    },
  ],
  chevron: [
    {
      flexShrink: 0,
      padding: 0,
      marginRight: 8,
      transition: 'transform .1s linear',
    },
    props.collapsed && {
      transform: 'rotate(-90deg)',
    },
  ],
  text: theme.fonts.small,
});
