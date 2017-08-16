import { memoizeFunction } from '../../Utilities';
import { mergeStyles, IStyle } from '../../Styling';
import { IContextualMenuStyles } from './ContextualMenu.Props';

export interface IContextualMenuClassNames {
  title: string;
}

export const getClassNames = memoizeFunction((
  styles: IContextualMenuStyles
): IContextualMenuClassNames => {
  return {
    title: mergeStyles(
      styles.title
    ) as string
  };
});