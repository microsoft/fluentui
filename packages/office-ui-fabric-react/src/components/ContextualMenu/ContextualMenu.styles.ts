import { IButtonStyles } from '../../Button';
import { memoizeFunction } from '../../Utilities';
import { IContextualMenuStyles } from './ContextualMenu.Props';

import {
  ITheme,
  IStyle,
  mergeStyleSets,
} from '../../Styling';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: Partial<IContextualMenuStyles>
): IContextualMenuStyles => {
  const defaultStyles: IContextualMenuStyles = {
    title: {
      fontSize: '16px',
      paddingRight: '14px',
      paddingLeft: '14px',
      paddingBottom: '5px',
      paddingTop: '5px',
      backgroundColor: theme.palette.neutralLight
    }
  };
  return mergeStyleSets(defaultStyles, customStyles) as IContextualMenuStyles;
});