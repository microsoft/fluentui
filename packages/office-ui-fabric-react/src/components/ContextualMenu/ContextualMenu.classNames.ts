import { memoizeFunction } from '../../Utilities';
import { mergeStyleSets, ITheme } from '../../Styling';
import { IContextualMenuStyles } from './ContextualMenu.Props';

export interface IContextualMenuClassNames {
  title?: string;
}

export const getClassNames = memoizeFunction((
  styles: IContextualMenuStyles,
  theme: ITheme,
): IContextualMenuClassNames => {

  styles = styles || {};

  return mergeStyleSets({
    title: [{
      fontSize: '16px',
      paddingRight: '14px',
      paddingLeft: '14px',
      paddingBottom: '5px',
      paddingTop: '5px',
      backgroundColor: theme.palette.neutralLight
    },
    styles.title
    ]
  });
});
