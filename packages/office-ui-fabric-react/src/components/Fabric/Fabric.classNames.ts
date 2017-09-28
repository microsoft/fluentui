
import {
  memoizeFunction
} from '../../Utilities';
import {
  ITheme,
  IStyle,
  mergeStyles
} from '../../Styling';

const inheritFont = { fontFamily: 'inherit' };

export interface IFabricClassNames {
  root: string;
}

export const getClassNames = memoizeFunction((
  theme: ITheme,
  className: string,
  isFocusVisible: boolean
): IFabricClassNames => {
  return {
    root: mergeStyles([
      'ms-Fabric',
      isFocusVisible && 'is-focusVisible',
      className,
      theme.fonts.medium,
      {
        color: theme.palette.neutralPrimary,
        selectors: {
          '& button': inheritFont,
          '& input': inheritFont,
          '& textarea': inheritFont
        }
      }
    ])
  };
});
