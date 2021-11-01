import { concatStyleSets, getFocusStyle } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import type { IButtonStyles } from '../Button.types';
import type { ITheme } from '../../../Styling';

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles): IButtonStyles =>
    concatStyleSets(
      {
        root: [
          getFocusStyle(theme, {
            inset: 1,
            highContrastStyle: {
              outlineOffset: '-4px',
              outline: '1px solid Window',
            },
            borderColor: 'transparent',
          }),
          {
            height: 24,
          },
        ],
      },
      customStyles,
    ),
);
