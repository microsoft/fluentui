import { IContextualMenuStyleProps, IContextualMenuStyles } from './ContextualMenu.types';
// import {
//   IStyle,
//   ITheme,
// } from '../../Styling';

export const getStyles = (props: IContextualMenuStyleProps): IContextualMenuStyles => {
  const {
    className
    // theme,
  } = props;

  // const { palette, semanticColors } = theme;

  return {
    root: [
      'ms-ContextualMenu',
      {
        // Insert css properties
      },
      className
    ],
    title: {},
    container: {},
    header: {},
    list: {}
  };
};
