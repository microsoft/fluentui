import { css, ITheme } from '@uifabric/styling';
import { IIconClassNames } from './Icon.Props';

export function getStyles(
  theme?: ITheme,
  classNames?: IIconClassNames
): IIconClassNames {
  return {
    imageContainer: css({
      overflow: 'hidden'
    })
  };
}
