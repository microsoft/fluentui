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
  overlay?: string;
}

export const getClassNames = memoizeFunction((
  customStyles?: IIconStyles,
  hasOverlay?: boolean
): IIconClassNames => {

  return mergeStyleSets(
    {
      root: [
        {
          display: 'inline-block'
        },
        hasOverlay && {
          position: 'relative'
        }
      ],
      rootHasPlaceHolder: {
        width: '1em'
      },
      imageContainer: {
        overflow: 'hidden'
      },
      overlay: {
        position: 'absolute',
        bottom: '0px',
        right: '0px',
        height: '45%',
        width: '45%',
        selectors: {
          '&>img': {
            display: 'block'
          }
        }
      }
    },
    customStyles
  );
});
