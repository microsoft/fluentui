import { memoizeFunction } from '../../../Utilities';
import { mergeStyles } from '../../../Styling';
import type { IButtonStyles } from '../Button.types';

export interface ISplitButtonClassNames {
  root?: string;
  icon?: string;
  splitButtonContainer?: string;
  flexContainer?: string;
  divider?: string;
}

export const SplitButtonGlobalClassNames = {
  msSplitButtonDivider: 'ms-SplitButton-divider',
};

export const getSplitButtonClassNames = memoizeFunction(
  (
    styles: IButtonStyles,
    disabled: boolean,
    expanded: boolean,
    checked: boolean,
    primaryDisabled?: boolean,
  ): ISplitButtonClassNames => {
    return {
      root: mergeStyles(
        styles.splitButtonMenuButton,
        expanded && [styles.splitButtonMenuButtonExpanded],
        disabled && [styles.splitButtonMenuButtonDisabled],
        checked && !disabled && [styles.splitButtonMenuButtonChecked],
        primaryDisabled &&
          !disabled && [
            {
              ':focus': styles.splitButtonMenuFocused,
            },
          ],
      ),

      splitButtonContainer: mergeStyles(
        styles.splitButtonContainer,
        !disabled &&
          checked && [
            styles.splitButtonContainerChecked,
            {
              ':hover': styles.splitButtonContainerCheckedHovered,
            },
          ],
        !disabled &&
          !checked && [
            {
              ':hover': styles.splitButtonContainerHovered,
              ':focus': styles.splitButtonContainerFocused,
            },
          ],
        disabled && styles.splitButtonContainerDisabled,
      ),

      icon: mergeStyles(
        styles.splitButtonMenuIcon,
        disabled && styles.splitButtonMenuIconDisabled,
        !disabled && primaryDisabled && styles.splitButtonMenuIcon,
      ),

      flexContainer: mergeStyles(styles.splitButtonFlexContainer),

      divider: mergeStyles(
        SplitButtonGlobalClassNames.msSplitButtonDivider,
        styles.splitButtonDivider,
        (primaryDisabled || disabled) && styles.splitButtonDividerDisabled,
      ),
    };
  },
);
