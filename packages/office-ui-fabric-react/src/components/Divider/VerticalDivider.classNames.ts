import { memoizeFunction } from '../../Utilities';
import { mergeStyleSets } from '../../Styling';

export interface IVerticalDividerClassNames {
  wrapper: string;
  divider: string;
}

export const getDividerClassNames = memoizeFunction((): IVerticalDividerClassNames => {
  return mergeStyleSets({
    wrapper: {
      display: 'inline-flex',
      height: '100%',
      alignItems: 'center'
    },
    divider: {
      width: 1,
      height: '100%',
      backgroundColor: '#C8C8C8'
    }
  });
});