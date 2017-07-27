import { memoizeFunction } from '../../Utilities';
import { mergeStyles } from '../../Styling';
import { IButtonStyles } from './Button.Props';

export interface IButtonClassNames {
  root?: string;
  flexContainer?: string;
  icon?: string;
  label?: string;
  menuIcon?: string;
  description?: string;
  screenReaderText?: string;
}

export const getClassNames = memoizeFunction((
  styles: IButtonStyles,
  className: string,
  variantClassName: string,
  iconClassName: string | undefined,
  disabled: boolean,
  checked: boolean,
  expanded: boolean
): IButtonClassNames => {
  return {
    root: mergeStyles(
      className,
      'ms-Button',
      variantClassName,
      styles.root,
      checked && [
        'is-checked',
        styles.rootChecked
      ],
      expanded && [
        'is-expanded',
        styles.rootExpanded
      ],
      disabled && [
        'is-disabled',
        styles.rootDisabled
      ],
      !disabled && !expanded && {
        ':hover': styles.rootHovered,
        ':hover .ms-Button-description': styles.descriptionHovered,
        ':active': styles.rootPressed,
        ':active .ms-Button-description': styles.descriptionPressed
      },
      disabled && checked && [
        styles.rootCheckedDisabled
      ],
      !disabled && checked && {
        ':hover': styles.rootCheckedHovered,
        ':active': styles.rootCheckedPressed
      }
    ) as string,

    flexContainer: mergeStyles(
      'ms-Button-flexContainer',
      styles.flexContainer
    ) as string,

    icon: mergeStyles(
      'ms-Button-icon',
      iconClassName,
      styles.icon,
      checked && styles.iconChecked,
      disabled && styles.iconDisabled,
    ) as string,

    label: mergeStyles(
      'ms-Button-label',
      styles.label,
      checked && styles.labelChecked,
      disabled && styles.labelDisabled,
    ) as string,

    menuIcon: mergeStyles(
      'ms-Button-menuIcon',
      styles.menuIcon,
      checked && styles.menuIconChecked,
      disabled && styles.menuIconDisabled
    ) as string,

    description: mergeStyles(
      'ms-Button-description',
      styles.description,
      checked && styles.descriptionChecked,
      disabled && styles.descriptionDisabled
    ) as string,

    screenReaderText: mergeStyles(
      'ms-Button-screenReaderText',
      styles.screenReaderText
    ) as string
  };
});