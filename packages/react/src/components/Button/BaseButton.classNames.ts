import { memoizeFunction } from '../../Utilities';
import { getGlobalClassNames, mergeStyleSets } from '../../Styling';
import type { ITheme } from '../../Styling';
import type { IButtonStyles } from './Button.types';

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

export const ButtonGlobalClassNames = {
  msButton: 'ms-Button',
  msButtonHasMenu: 'ms-Button--hasMenu',
  msButtonIcon: 'ms-Button-icon',
  msButtonMenuIcon: 'ms-Button-menuIcon',
  msButtonLabel: 'ms-Button-label',
  msButtonDescription: 'ms-Button-description',
  msButtonScreenReaderText: 'ms-Button-screenReaderText',
  msButtonFlexContainer: 'ms-Button-flexContainer',
  msButtonTextContainer: 'ms-Button-textContainer',
};

export const getBaseButtonClassNames = memoizeFunction(
  (
    theme: ITheme,
    styles: IButtonStyles,
    className: string,
    variantClassName: string,
    iconClassName: string | undefined,
    menuIconClassName: string | undefined,
    disabled: boolean,
    hasMenu: boolean,
    checked: boolean,
    expanded: boolean,
    isSplit: boolean | undefined,
  ): IButtonClassNames => {
    const classNames = getGlobalClassNames(ButtonGlobalClassNames, theme || {});

    const isExpanded = expanded && !isSplit;
    return mergeStyleSets(styles.__shadowConfig__, {
      root: [
        classNames.msButton,
        styles.root,
        variantClassName,
        checked && ['is-checked', styles.rootChecked],
        isExpanded && [
          'is-expanded',
          styles.rootExpanded,
          {
            [`:hover .${classNames.msButtonIcon}`]: styles.iconExpandedHovered,
            // menuIcon falls back to rootExpandedHovered to support original behavior
            [`:hover .${classNames.msButtonMenuIcon}`]: styles.menuIconExpandedHovered || styles.rootExpandedHovered,
            ':hover': styles.rootExpandedHovered,
          },
        ],
        hasMenu && [ButtonGlobalClassNames.msButtonHasMenu, styles.rootHasMenu],
        disabled && ['is-disabled', styles.rootDisabled],
        !disabled &&
          !isExpanded &&
          !checked && {
            ':hover': styles.rootHovered,
            [`:hover .${classNames.msButtonLabel}`]: styles.labelHovered,
            [`:hover .${classNames.msButtonIcon}`]: styles.iconHovered,
            [`:hover .${classNames.msButtonDescription}`]: styles.descriptionHovered,
            [`:hover .${classNames.msButtonMenuIcon}`]: styles.menuIconHovered,
            ':focus': styles.rootFocused,
            ':active': styles.rootPressed,
            [`:active .${classNames.msButtonIcon}`]: styles.iconPressed,
            [`:active .${classNames.msButtonDescription}`]: styles.descriptionPressed,
            [`:active .${classNames.msButtonMenuIcon}`]: styles.menuIconPressed,
          },
        disabled && checked && [styles.rootCheckedDisabled],
        !disabled &&
          checked && {
            ':hover': styles.rootCheckedHovered,
            ':active': styles.rootCheckedPressed,
          },
        className,
      ],
      flexContainer: [classNames.msButtonFlexContainer, styles.flexContainer],
      textContainer: [classNames.msButtonTextContainer, styles.textContainer],
      icon: [
        classNames.msButtonIcon,
        iconClassName,
        styles.icon,
        isExpanded && styles.iconExpanded,
        checked && styles.iconChecked,
        disabled && styles.iconDisabled,
      ],
      label: [classNames.msButtonLabel, styles.label, checked && styles.labelChecked, disabled && styles.labelDisabled],
      menuIcon: [
        classNames.msButtonMenuIcon,
        menuIconClassName,
        styles.menuIcon,
        checked && styles.menuIconChecked,
        disabled && !isSplit && styles.menuIconDisabled,
        !disabled &&
          !isExpanded &&
          !checked && {
            ':hover': styles.menuIconHovered,
            ':active': styles.menuIconPressed,
          },
        isExpanded && ['is-expanded', styles.menuIconExpanded],
      ],
      description: [
        classNames.msButtonDescription,
        styles.description,
        checked && styles.descriptionChecked,
        disabled && styles.descriptionDisabled,
      ],
      screenReaderText: [classNames.msButtonScreenReaderText, styles.screenReaderText],
    });
  },
);
