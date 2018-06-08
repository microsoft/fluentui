import { ICollapsibleSectionTitleProps, ICollapsibleSectionTitleStyles } from './CollapsibleSectionTitle.types';
import { ITheme, getFocusStyle } from 'office-ui-fabric-react';

export const getStyles = (props: ICollapsibleSectionTitleProps & { theme: ITheme }): ICollapsibleSectionTitleStyles => {
  const { theme } = props;

  return {
    root: [
      getFocusStyle(theme),
      {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        height: 24,
        margin: 0,
        selectors: {
          ':hover': {
            background: theme.palette.neutralLight
          }
        }
      }
    ],
    icon: [
      {
        flexShrink: 0,
        padding: 0,
        marginRight: 8,
        transition: 'transform .1s linear'
      },
      props.collapsed && {
        transform: 'rotate(-90deg)'
      }
    ],
    text: theme.fonts.small
  };
};
