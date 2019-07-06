import { memoizeFunction } from '../../Utilities';
import { mergeStyleSets, ITheme } from '../../Styling';
import { IVerticalDividerClassNames } from './VerticalDivider.types';

/**
 * @deprecated use getStyles exported from VerticalDivider.styles.ts
 */
export const getDividerClassNames = memoizeFunction(
  (theme: ITheme): IVerticalDividerClassNames => {
    return mergeStyleSets({
      wrapper: {
        display: 'inline-flex',
        height: '100%',
        alignItems: 'center'
      },
      divider: {
        width: 1,
        height: '100%',
        backgroundColor: theme.palette.neutralTertiaryAlt
      }
    });
  }
);
