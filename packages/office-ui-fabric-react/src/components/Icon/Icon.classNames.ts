import {
  mergeStyleSets
} from '../../Styling';
import {
  memoizeFunction
} from '../../Utilities';
import { IIconStyles } from './Icon.types';

export interface IIconClassNames {
  root?: string;
  rootHasPlaceHolder?: string;
  imageContainer?: string;
}

export const getClassNames = memoizeFunction((
  customStyles?: IIconStyles
): IIconClassNames => {

  return mergeStyleSets(
    {
      root: {
        display: 'inline-block'
      },
      rootHasPlaceHolder: {
        width: '1em'
      },
      imageContainer: {
        overflow: 'hidden'
      }
    },
    customStyles
  );
});
