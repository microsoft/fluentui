import { memoizeFunction } from '../../Utilities';
import { mergeStyleSets, IStyle } from '../../Styling';

export interface ICardStyles {
  /**
  * Style for the root element in the default enabled/unchecked state.
  */
  root?: IStyle;
}

export interface ICardNames {
  /**
   * Root html container for this component.
   */
  root?: string;
}

export const getClassNames = memoizeFunction((): ICardNames => {
  return mergeStyleSets({
    root: []
  });
});
