import { memoizeFunction } from '../../../Utilities';
import { getStyles } from './DefaultButton.styles';

import type { IButtonStyles } from '../Button.types';
import { concatStyleSets, ITheme } from '../../../Styling';
import { tokens } from '../../../common/tokens';

export const getTokenStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles, primary?: boolean): IButtonStyles => {
    const buttonStyles = getStyles(theme, customStyles, primary);

    const tokenStyles: IButtonStyles = {
      root: {
        backgroundColor: tokens.colorNeutralBackground1,
        color: tokens.colorNeutralForeground1,
      },
    };

    return concatStyleSets(buttonStyles, tokenStyles);
  },
);
