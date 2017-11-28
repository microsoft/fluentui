import { memoizeFunction } from '../../Utilities';
import { mergeStyleSets} from '../../Styling';

export interface IbeakStyles {
   /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;
}

export interface IbeakNames {
	/**
	* Root html container for this component.
	*/
	root?: string;
}

export const getClassNames = memoizeFunction((): IbeakNames => {
	return mergeStyleSets({
		root: []
	});
});
