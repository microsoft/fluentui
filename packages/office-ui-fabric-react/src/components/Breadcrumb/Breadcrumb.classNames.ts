import {
  FontSizes,
  HighContrastSelector,
  IStyle,
  ITheme,
  ScreenWidthMaxMedium,
  ScreenWidthMaxSmall,
  mergeStyleSets
} from '../../Styling';
import { memoizeFunction } from '../../Utilities';

const MediumMediaQuery = `@media screen and (max-width: ${ScreenWidthMaxMedium}px)`;
const SmallMediaQuery = `@media screen and (max-width: ${ScreenWidthMaxSmall}px)`;

export interface IBreadcrumbClassNames {
  /**
   * The root element class name.
   */
  root: string;
}

export const getClassNames = memoizeFunction((
  theme: ITheme,
  className?: string
): IBreadcrumbClassNames => {

  return mergeStyleSets({

    root: [
      'ms-Breadcrumb',
      {
        margin: '0 -4px',
        padding: 0,
        display: 'flex',
        alignItems: 'stretch',
      },
      className
    ]

  });
});