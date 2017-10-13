import { memoizeFunction } from '../../Utilities';
import { mergeStyleSets } from '../../Styling';

export interface IDividerClassNames {
  wrapper: string;
  divider: string;
}

export const getDividerClassNames = memoizeFunction((): IDividerClassNames => {
  return mergeStyleSets({
    wrapper: {
    },
    divider: {
      width: 1,
      height: 20
    }
  });
});