import { memoizeFunction } from '../../../Utilities';
import { mergeStyles } from '../../../Styling';
import { ISplitButtonStyles } from './SplitButton.Props';

export interface ISplitButtonClassNames {
  root?: string;
  icon?: string;
  flexContainer?: string;
}

export const getClassNames = memoizeFunction((
  styles: ISplitButtonStyles,
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
      checked && [
        styles.splitButtonMenuButtonChecked
      ]
    ) as string,
    icon: (disabled ? mergeStyles(styles.splitButtonMenuIcon, styles.splitButtonMenuIconDisabled) : styles.splitButtonMenuIcon) as string,
    flexContainer: styles.splitButtonFlexContainer as string
  };
});
