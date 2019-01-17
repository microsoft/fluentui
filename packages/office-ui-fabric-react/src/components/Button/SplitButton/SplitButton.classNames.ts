import { memoizeFunction, IStyleFunctionOrObject } from '../../../Utilities';
import { mergeStyles } from '../../../Styling';
import { IButtonStyleProps, IButtonStyles } from '../Button.types';

export interface ISplitButtonClassNames {
  root?: string;
  icon?: string;
  splitButtonContainer?: string;
  flexContainer?: string;
  divider?: string;
}

export const getClassNames = memoizeFunction(
  (
    styles: IStyleFunctionOrObject<IButtonStyleProps, IButtonStyles>,
    disabled: boolean,
    expanded: boolean,
    checked: boolean
  ): ISplitButtonClassNames => {
    let buttonStyles: IButtonStyles;
    if (typeof styles === 'function') {
      buttonStyles = styles({});
    } else {
      buttonStyles = styles;
    }

    return {
      root: mergeStyles(
        buttonStyles.splitButtonMenuButton,
        expanded && [buttonStyles.splitButtonMenuButtonExpanded],
        disabled && [buttonStyles.splitButtonMenuButtonDisabled],
        checked && !disabled && [buttonStyles.splitButtonMenuButtonChecked]
      ),

      splitButtonContainer: mergeStyles(
        buttonStyles.splitButtonContainer,
        checked &&
          !disabled && [
            buttonStyles.splitButtonContainerChecked,
            {
              selectors: {
                ':hover': buttonStyles.splitButtonContainerCheckedHovered
              }
            }
          ],
        !disabled &&
          !checked && [
            {
              selectors: {
                ':hover': buttonStyles.splitButtonContainerHovered,
                ':focus': buttonStyles.splitButtonContainerFocused
              }
            }
          ],
        disabled && buttonStyles.splitButtonContainerDisabled
      ),

      icon: mergeStyles(buttonStyles.splitButtonMenuIcon, disabled && buttonStyles.splitButtonMenuIconDisabled),

      flexContainer: mergeStyles(buttonStyles.splitButtonFlexContainer),

      divider: mergeStyles(buttonStyles.splitButtonDivider)
    };
  }
);
