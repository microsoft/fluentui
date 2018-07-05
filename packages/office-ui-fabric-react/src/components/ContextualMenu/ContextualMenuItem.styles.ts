import { IContextualMenuItemStyleProps, IContextualMenuItemStyles } from './ContextualMenuItem.types';
// import {
//   IStyle,
//   ITheme,
// } from '../../Styling';

export const getStyles = (props: IContextualMenuItemStyleProps): IContextualMenuItemStyles => {
  const {
    className
    // theme,
  } = props;

  // const { palette, semanticColors } = theme;

  return {
    root: [
      'ms-ContextualMenuItem',
      {
        // Insert css properties
      },
      className
    ]

    // Insert className styles
  };
};
