import { IAccordionTitleProps, IAccordionTitleStyles } from './AccordionTitle.types';
import { ITheme, getFocusStyle } from 'office-ui-fabric-react';

export const getStyles = (props: IAccordionTitleProps & { theme: ITheme }): IAccordionTitleStyles => {
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
        height: 36,
        margin: 0,
        padding: 8,
        paddingLeft: 8 + (props.indent || 0) * 22,
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
