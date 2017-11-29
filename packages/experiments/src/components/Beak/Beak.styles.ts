import { memoizeFunction } from '../../Utilities';
import { mergeStyleSets} from '../../Styling';

export interface IBeakStyles {
   /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;
}

export interface IBeakNames {
	/**
	* Root html container for this component.
	*/
	root?: string;
}

export const getClassNames = memoizeFunction((): IBeakNames => {
	return mergeStyleSets({
		root: []
	});
});
