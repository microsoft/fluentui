import {
  mergeStyleSets
} from '../../Styling';
import {
  memoizeFunction
} from '../../Utilities';
import { IIconStyles } from './Icon.Props';

export interface IIconClassNames {
  root?: string;
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

      imageContainer: {
        overflow: 'hidden'
      }
    },
    customStyles
  );
});
