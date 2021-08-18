import { memoizeFunction } from '../../Utilities';
import { mergeStyleSets } from '../../Styling';
import type { ITheme } from '../../Styling';
import type { IVerticalDividerClassNames } from './VerticalDivider.types';

/**
 * @deprecated use getStyles exported from VerticalDivider.styles.ts
 */
export const getDividerClassNames = memoizeFunction(
  // eslint-disable-next-line deprecation/deprecation
  (theme: ITheme): IVerticalDividerClassNames => {
    return mergeStyleSets({
      wrapper: {
        display: 'inline-flex',
        height: '100%',
        alignItems: 'center',
      },
      divider: {
        width: 1,
        height: '100%',
        backgroundColor: theme.palette.neutralTertiaryAlt,
      },
    });
  },
);
