import { memoizeFunction } from '../../Utilities';
import { mergeStyleSets, IStyle } from '../../Styling';

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
    root: [{
      position: 'absolute',
      backgroundColor: '#ffffff',
      boxShadow: 'inherit',
      border: 'inherit',
      boxSizing: 'border-box',
      transform: 'rotate(45deg)'
    }]
  });
});
