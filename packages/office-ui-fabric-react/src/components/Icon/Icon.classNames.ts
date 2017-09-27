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
  let iconStyles: IIconStyles = {
    root: {
      display: 'inline-block'
    },

    imageContainer: {
      overflow: 'hidden'
    }
  };

  return mergeStyleSets(
    iconStyles,
    customStyles
  );
});
