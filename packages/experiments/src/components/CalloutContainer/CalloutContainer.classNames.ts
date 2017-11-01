import { memoizeFunction } from '../../Utilities';
import { mergeStyleSets} from '../../Styling';

export interface ICalloutContainerStyles {
   /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;
}

export interface ICalloutContainerNames {
	/**
	* Root html container for this component.
	*/
	root?: string;
}

export const getClassNames = memoizeFunction((): ICalloutContainerNames => {
	return mergeStyleSets({
		root: []
	});
});
