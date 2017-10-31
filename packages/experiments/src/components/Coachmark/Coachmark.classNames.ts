import { memoizeFunction } from '../../Utilities';
import { mergeStyleSets } from '../../Styling';
import { IStyle } from '../../Styling';

export interface ICoachmarkStyles {
  /**
  * Style for the root element in the default enabled/unchecked state.
  */
  root?: IStyle;
}

export interface ICoachmarkNames {
	/**
	* Root html container for this component.
	*/
  root?: string;
}

export const getClassNames = memoizeFunction((): ICoachmarkNames => {
  return mergeStyleSets({
    root: []
  });
});
