import { getDividerClassNames } from '../Divider/VerticalDivider.classNames';
import { getMenuItemStyles, getStyles as getContextualMenuStyles } from './ContextualMenu.cnstyles';
import { ITheme, mergeStyleSets, getGlobalClassNames } from '../../Styling';
import { IVerticalDividerClassNames } from '../Divider/VerticalDivider.types';
import { memoizeFunction } from '../../Utilities';
import { IContextualMenuItemStyles, IContextualMenuItemStyleProps } from './ContextualMenuItem.types';

/**
 * @deprecated in favor of mergeStyles API.
 */
export interface IContextualMenuClassNames {
  container: string;
  root: string;
  list: string;
  header: string;
  title: string;
}

/**
 * @deprecated in favor of mergeStyles API.
 */
export interface IMenuItemClassNames {
  item: string;
  divider: string;
  root: string;
  linkContent: string;
  icon: string;
  checkmarkIcon: string;
  subMenuIcon: string;
  label: string;
  secondaryText: string;
  splitContainer: string;
  splitPrimary: string;
  splitMenu: string;
  linkContentMenu: string;
}

export const getSplitButtonVerticalDividerClassNames = memoizeFunction(
  (theme: ITheme): IVerticalDividerClassNames => {
    return mergeStyleSets(getDividerClassNames(theme), {
      divider: {
        height: 16,
        width: 1
      }
    });
  }
);

export const getContextualMenuClassNames = memoizeFunction(
  (theme: ITheme, className?: string): IContextualMenuClassNames => {
    const styles = getContextualMenuStyles(theme);

    return mergeStyleSets({
      container: [
        'ms-ContextualMenu-container',
        styles.container,
        className,
        [
          {
            selectors: {
              ':focus': { outline: 0 }
            }
          }
        ]
      ],
      root: ['ms-ContextualMenu is-open', styles.root],
      list: ['ms-ContextualMenu-list is-open', styles.list],
      header: ['ms-ContextualMenu-header', styles.header],
      title: styles.title
    });
  }
);

const GlobalClassNames = {
  item: 'ms-ContextualMenu-item',
  divider: 'ms-ContextualMenu-divider',
  root: 'ms-ContextualMenu-link',
  isChecked: 'is-checked',
  isExpanded: 'is-expanded',
  isDisabled: 'is-disabled',
  linkContent: 'ms-ContextualMenu-linkContent',
  linkContentMenu: 'ms-ContextualMenu-linkContent',
  icon: 'ms-ContextualMenu-icon',
  checkmarkIcon: 'ms-ContextualMenu-checkmarkIcon',
  subMenuIcon: 'ms-ContextualMenu-submenuIcon',
  label: 'ms-ContextualMenu-itemText',
  secondaryText: 'ms-ContextualMenu-secondaryText'
};

export const getItemClassNames = memoizeFunction(
  (props: IContextualMenuItemStyleProps): IContextualMenuItemStyles => {
    const {
      theme,
      disabled,
      expanded,
      checked,
      isAnchorLink,
      knownIcon,
      itemClassName,
      dividerClassName,
      iconClassName,
      subMenuClassName,
      primaryDisabled,
      className
    } = props;
    const styles = getMenuItemStyles(theme);
    const classNames = getGlobalClassNames(GlobalClassNames, theme);

    return mergeStyleSets({
      item: [classNames.item, styles.item, itemClassName],
      divider: [classNames.divider, styles.divider, dividerClassName],
      root: [
        classNames.root,
        styles.root,
        checked && [classNames.isChecked, styles.rootChecked],
        isAnchorLink && styles.anchorLink,
        expanded && [classNames.isExpanded, styles.rootExpanded],
        disabled && [classNames.isDisabled, styles.rootDisabled],
        !disabled &&
          !expanded && [
            {
              selectors: {
                ':hover': styles.rootHovered,
                ':active': styles.rootPressed,
                '.ms-Fabric--isFocusVisible &:focus, .ms-Fabric--isFocusVisible &:focus:hover': styles.rootFocused,
                '.ms-Fabric--isFocusVisible &:hover': { background: 'inherit;' }
              }
            }
          ],
        className
      ],
      splitPrimary: [
        styles.root,
        checked && ['is-checked', styles.rootChecked],
        (disabled || primaryDisabled) && ['is-disabled', styles.rootDisabled],
        !(disabled || primaryDisabled) &&
          !checked && [
            {
              selectors: {
                ':hover': styles.rootHovered,
                ':active': styles.rootPressed,
                '.ms-Fabric--isFocusVisible &:focus, .ms-Fabric--isFocusVisible &:focus:hover': styles.rootFocused,
                '.ms-Fabric--isFocusVisible &:hover': { background: 'inherit;' }
              }
            }
          ]
      ],
      splitMenu: [
        styles.root,
        {
          width: 32
        },
        expanded && ['is-expanded', styles.rootExpanded],
        disabled && ['is-disabled', styles.rootDisabled],
        !disabled &&
          !expanded && [
            {
              selectors: {
                ':hover': styles.rootHovered,
                ':active': styles.rootPressed,
                '.ms-Fabric--isFocusVisible &:focus, .ms-Fabric--isFocusVisible &:focus:hover': styles.rootFocused,
                '.ms-Fabric--isFocusVisible &:hover': { background: 'inherit;' }
              }
            }
          ]
      ],
      anchorLink: styles.anchorLink,
      linkContent: [classNames.linkContent, styles.linkContent],
      linkContentMenu: [
        classNames.linkContentMenu,
        styles.linkContent,
        {
          justifyContent: 'center'
        }
      ],
      icon: [
        classNames.icon,
        knownIcon && 'ms-ContextualMenu-iconColor ' && styles.iconColor,
        styles.icon,
        iconClassName,
        disabled && [classNames.isDisabled, styles.iconDisabled]
      ],
      iconColor: styles.iconColor,
      checkmarkIcon: [
        classNames.checkmarkIcon,
        knownIcon && 'ms-ContextualMenu-checkmarkIcon ' && styles.checkmarkIcon,
        styles.icon,
        iconClassName
      ],
      subMenuIcon: [classNames.subMenuIcon, styles.subMenuIcon, subMenuClassName],
      label: [classNames.label, styles.label],
      secondaryText: [classNames.secondaryText, styles.secondaryText],
      splitContainer: [
        styles.splitButtonFlexContainer,
        !disabled &&
          !checked && [
            {
              selectors: {
                '.ms-Fabric--isFocusVisible &:focus, .ms-Fabric--isFocusVisible &:focus:hover': styles.rootFocused
              }
            }
          ]
      ]
    });
  }
);
