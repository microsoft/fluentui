import { memoizeFunction, IStyleFunctionOrObject } from '../../Utilities';
import { ITheme, mergeStyleSets } from '../../Styling';
import { IButtonStyleProps, IButtonStyles } from './Button.types';
import { getGlobalClassNames } from '../../Styling';

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

const GlobalClassNames = {
  msButton: 'ms-Button',
  msButtonIcon: 'ms-Button-icon',
  msButtonMenuIcon: 'ms-Button-menuIcon',
  msButtonLabel: 'ms-Button-label',
  msButtonDescription: 'ms-Button-description',
  msButtonScreenReaderText: 'ms-Button-screenReaderText',
  msButtonFlexContainer: 'ms-Button-flexContainer',
  msButtonTextContainer: 'ms-Button-textContainer'
};

export const getBaseButtonClassNames = memoizeFunction(
  (
    theme: ITheme,
    styles: IStyleFunctionOrObject<IButtonStyleProps, IButtonStyles>,
    className: string,
    variantClassName: string,
    iconClassName: string | undefined,
    menuIconClassName: string | undefined,
    disabled: boolean,
    checked: boolean,
    expanded: boolean,
    isSplit: boolean | undefined
  ): IButtonClassNames => {
    let buttonStyles: IButtonStyles;
    if (typeof styles === 'function') {
      buttonStyles = styles({ theme, className });
    } else {
      buttonStyles = styles;
    }

    const classNames = getGlobalClassNames(GlobalClassNames, theme || {});

    const isExpanded = expanded && !isSplit;
    return mergeStyleSets({
      root: [
        classNames.msButton,
        buttonStyles.root,
        variantClassName,
        checked && ['is-checked', buttonStyles.rootChecked],
        isExpanded && [
          'is-expanded',
          buttonStyles.rootExpanded,
          {
            selectors: {
              [`:hover .${classNames.msButtonIcon}`]: buttonStyles.iconExpandedHovered,
              // menuIcon falls back to rootExpandedHovered to support original behavior
              [`:hover .${classNames.msButtonMenuIcon}`]: buttonStyles.menuIconExpandedHovered || buttonStyles.rootExpandedHovered,
              ':hover': buttonStyles.rootExpandedHovered
            }
          }
        ],
        disabled && ['is-disabled', buttonStyles.rootDisabled],
        !disabled &&
          !isExpanded &&
          !checked && {
            selectors: {
              ':hover': buttonStyles.rootHovered,
              [`:hover .${classNames.msButtonLabel}`]: buttonStyles.labelHovered,
              [`:hover .${classNames.msButtonIcon}`]: buttonStyles.iconHovered,
              [`:hover .${classNames.msButtonDescription}`]: buttonStyles.descriptionHovered,
              [`:hover .${classNames.msButtonMenuIcon}`]: buttonStyles.menuIconHovered,
              ':focus': buttonStyles.rootFocused,
              ':active': buttonStyles.rootPressed,
              [`:active .${classNames.msButtonIcon}`]: buttonStyles.iconPressed,
              [`:active .${classNames.msButtonDescription}`]: buttonStyles.descriptionPressed,
              [`:active .${classNames.msButtonMenuIcon}`]: buttonStyles.menuIconPressed
            }
          },
        disabled && checked && [buttonStyles.rootCheckedDisabled],
        !disabled &&
          checked && {
            selectors: {
              ':hover': buttonStyles.rootCheckedHovered,
              ':active': buttonStyles.rootCheckedPressed
            }
          },
        className
      ],
      flexContainer: [classNames.msButtonFlexContainer, buttonStyles.flexContainer],
      textContainer: [classNames.msButtonTextContainer, buttonStyles.textContainer],
      icon: [
        classNames.msButtonIcon,
        iconClassName,
        buttonStyles.icon,
        isExpanded && buttonStyles.iconExpanded,
        checked && buttonStyles.iconChecked,
        disabled && buttonStyles.iconDisabled
      ],
      label: [classNames.msButtonLabel, buttonStyles.label, checked && buttonStyles.labelChecked, disabled && buttonStyles.labelDisabled],
      menuIcon: [
        classNames.msButtonMenuIcon,
        menuIconClassName,
        buttonStyles.menuIcon,
        checked && buttonStyles.menuIconChecked,
        disabled && buttonStyles.menuIconDisabled,
        !disabled &&
          !isExpanded &&
          !checked && {
            selectors: {
              ':hover': buttonStyles.menuIconHovered,
              ':active': buttonStyles.menuIconPressed
            }
          },
        isExpanded && ['is-expanded', buttonStyles.menuIconExpanded]
      ],
      description: [
        classNames.msButtonDescription,
        buttonStyles.description,
        checked && buttonStyles.descriptionChecked,
        disabled && buttonStyles.descriptionDisabled
      ],
      screenReaderText: [classNames.msButtonScreenReaderText, buttonStyles.screenReaderText]
    });
  }
);
