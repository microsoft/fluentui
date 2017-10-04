import { memoizeFunction } from '../../Utilities';
import { mergeStyles } from '../../Styling';
import { IButtonStyles } from './Button.Props';

export interface IButtonClassNames {
  root?: string;
  flexContainer?: string;
  textContainer?: string;
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
  menuIconClassName: string | undefined,
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
        styles.rootExpanded,
        {
          selectors: {
            ':hover .ms-Button-icon': styles.iconExpandedHovered,
            ':hover .ms-Button-menuIcon': styles.rootExpandedHovered,
            ':hover': styles.rootExpandedHovered
          }
        }
      ],
      disabled && [
        'is-disabled',
        styles.rootDisabled
      ],
      !disabled && !expanded && !checked && {
        selectors: {
          ':hover': styles.rootHovered,
          ':hover .ms-Button-icon': styles.iconHovered,
          ':hover .ms-Button-description': styles.descriptionHovered,
          ':hover .ms-Button-menuIcon': styles.rootHovered,
          ':focus': styles.rootFocused,
          ':active': styles.rootPressed,
          ':active .ms-Button-icon': styles.iconPressed,
          ':active .ms-Button-description': styles.descriptionPressed,
          ':active .ms-Button-menuIcon': styles.rootPressed
        }
      },
      disabled && checked && [
        styles.rootCheckedDisabled
      ],
      !disabled && checked && {
        selectors: {
          ':hover': styles.rootCheckedHovered,
          ':active': styles.rootCheckedPressed
        }
      }
    ),

    flexContainer: mergeStyles(
      'ms-Button-flexContainer',
      styles.flexContainer
    ),

    textContainer: mergeStyles(
      'ms-Button-textContainer',
      styles.textContainer
    ),

    icon: mergeStyles(
      'ms-Button-icon',
      iconClassName,
      styles.icon,
      expanded && styles.iconExpanded,
      checked && styles.iconChecked,
      disabled && styles.iconDisabled,
    ),

    label: mergeStyles(
      'ms-Button-label',
      styles.label,
      checked && styles.labelChecked,
      disabled && styles.labelDisabled,
    ),

    menuIcon: mergeStyles(
      'ms-Button-menuIcon',
      menuIconClassName,
      styles.menuIcon,
      checked && styles.menuIconChecked,
      disabled && styles.menuIconDisabled,
      !disabled &&
      !expanded &&
      !checked && {
        selectors: {
          ':hover': styles.menuIconHovered,
          ':active': styles.menuIconPressed,
        },
      },
      expanded && [
        'is-expanded',
        styles.menuIconExpanded,
        {
          selectors: {
            ':hover': styles.menuIconExpandedHovered,
          },
        },
      ]
    ),

    description: mergeStyles(
      'ms-Button-description',
      styles.description,
      checked && styles.descriptionChecked,
      disabled && styles.descriptionDisabled
    ),

    screenReaderText: mergeStyles(
      'ms-Button-screenReaderText',
      styles.screenReaderText
    )
  };
});