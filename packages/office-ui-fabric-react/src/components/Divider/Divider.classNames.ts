import { memoizeFunction } from '../../Utilities';
import { mergeStyleSets } from '../../Styling';

export interface IDividerClassNames {
  wrapper: string;
  divider: string;
}

export const getDividerClassNames = memoizeFunction((dividerHeight: number, dividerColor: string, dividerHorizontalMargin: number): IDividerClassNames => {
  return mergeStyleSets({
    wrapper: {
      display: 'inline-flex',
      height: '100%',
      alignItems: 'center',
      margin: `0 ${dividerHorizontalMargin}px`
    },
    divider: {
      width: 1,
      height: dividerHeight,
      backgroundColor: dividerColor
    }
  });
});