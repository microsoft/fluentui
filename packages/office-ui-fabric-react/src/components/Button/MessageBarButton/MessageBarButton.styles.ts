import { IButtonStyles } from '../Button.types';
import { ITheme, concatStyleSets, getFocusStyle } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';

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
