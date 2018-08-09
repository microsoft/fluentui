import { getDividerClassNames } from '../Divider/VerticalDivider.classNames';
import { ITheme, mergeStyleSets } from '../../Styling';
import { IVerticalDividerClassNames } from '../Divider/VerticalDivider.types';
import { memoizeFunction } from '../../Utilities';

export const getSplitButtonVerticalDividerClassNames = memoizeFunction(
  (theme: ITheme): IVerticalDividerClassNames => {
    return mergeStyleSets(getDividerClassNames(theme), {
      divider: {
        height: 16,
        width: 1
      }
    });
  }
);
