import { memoizeFunction } from '../../../Utilities';
import { mergeStyles } from '../../../Styling';
import { IButtonStyles } from '../Button.Props';

export interface ISplitButtonClassNames {
  root?: string;
  icon?: string;
  splitButtonContainer?: string;
  flexContainer?: string;
  divider?: string;
}

export const getClassNames = memoizeFunction((
  styles: IButtonStyles,
  disabled: boolean,
  expanded: boolean,
  checked: boolean,
): ISplitButtonClassNames => {
  return {

    root: mergeStyles(
      styles.splitButtonMenuButton,
      expanded && [
        styles.splitButtonMenuButtonExpanded
      ],
      disabled && [
        styles.splitButtonMenuButtonDisabled
      ],
      checked && !disabled && [
        styles.splitButtonMenuButtonChecked
      ]
    ),

    splitButtonContainer: mergeStyles(
      styles.splitButtonContainer,
      disabled && styles.splitButtonContainerDisabled
    ),

    icon: mergeStyles(
      styles.splitButtonMenuIcon,
      disabled && styles.splitButtonMenuIconDisabled
    ),

    flexContainer: mergeStyles(styles.splitButtonFlexContainer),

    divider: mergeStyles(styles.splitButtonDivider)

  };
});
