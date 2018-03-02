import { memoizeFunction } from '../../Utilities';
import { ITheme, mergeStyleSets } from '../../Styling';
import { IContextualMenuStyles, IMenuItemStyles } from './ContextualMenu.types';
import { getStyles as getContextualMenuStyles, getMenuItemStyles } from './ContextualMenu.styles';
import { IVerticalDividerClassNames } from '../Divider/VerticalDivider.types';
import { getDividerClassNames } from '../Divider/VerticalDivider.classNames';

export interface IContextualMenuClassNames {
  container: string;
  root: string;
  list: string;
  header: string;
  title: string;
}

export interface IMenuItemClassNames {
  item: string;
  divider: string;
  root: string;
  linkContent: string;
  icon: string;
  checkmarkIcon: string;
  subMenuIcon: string;
  label: string;
  splitContainer: string;
  splitPrimary: string;
  splitMenu: string;
  linkContentMenu: string;
}

export const getSplitButtonVerticalDividerClassNames = memoizeFunction((theme: ITheme): IVerticalDividerClassNames => {
  const { semanticColors } = theme;
  const ContextualMenuDividerColor = semanticColors.bodyDivider;
  return mergeStyleSets(getDividerClassNames(theme), {
    divider: {
      height: 16,
      width: 1,
    }
  });
});

export const getContextualMenuClassNames = memoizeFunction((
  theme: ITheme,
  className?: string
): IContextualMenuClassNames => {

  const styles = getContextualMenuStyles(theme);

  return mergeStyleSets({
    container: [
      'ms-ContextualMenu-container',
      styles.container,
      className,
      [{
        selectors: {
          ':focus': { outline: 0 }
        }
      }]
    ],
    root: [
      'ms-ContextualMenu is-open',
      styles.root
    ],
    list: [
      'ms-ContextualMenu-list is-open',
      styles.list
    ],
    header: [
      'ms-ContextualMenu-header',
      styles.header
    ],
    title: styles.title
  });
});

export const getItemClassNames = memoizeFunction((
  theme: ITheme,
  disabled: boolean,
  expanded: boolean,
  checked: boolean,
  isAnchorLink: boolean,
  knownIcon: boolean,
  itemClassName?: string,
  dividerClassName?: string,
  iconClassName?: string,
  subMenuClassName?: string,
): IMenuItemClassNames => {

  const { semanticColors } = theme;
  const ContextualMenuIconColor = semanticColors.menuIcon;
  const styles = getMenuItemStyles(theme);

  return mergeStyleSets({
    item: [
      'ms-ContextualMenu-item',
      styles.item,
      itemClassName,
    ],
    divider: [
      'ms-ContextualMenu-divider',
      styles.divider,
      dividerClassName,
    ],
    root: [
      'ms-ContextualMenu-link',
      styles.root,
      checked && [
        'is-checked',
        styles.rootChecked
      ],
      isAnchorLink && styles.anchorLink,
      expanded && [
        'is-expanded',
        styles.rootExpanded
      ],
      disabled && [
        'is-disabled',
        styles.rootDisabled
      ],
      !disabled && !expanded && [{
        selectors: {
          ':hover': styles.rootHovered,
          ':active': styles.rootPressed,
          '.ms-Fabric.is-focusVisible &:focus, .ms-Fabric.is-focusVisible &:focus:hover': styles.rootFocused,
          '.ms-Fabric.is-focusVisible &:hover': { background: 'inherit;' }
        }
      }],
    ],
    splitPrimary: [
      styles.root,
      checked && [
        'is-checked',
        styles.rootChecked
      ],
      disabled && [
        'is-disabled',
        styles.rootDisabled
      ],
      !disabled && !checked && [{
        selectors: {
          ':hover': styles.rootHovered,
          ':active': styles.rootPressed,
          '.ms-Fabric.is-focusVisible &:focus, .ms-Fabric.is-focusVisible &:focus:hover': styles.rootFocused,
          '.ms-Fabric.is-focusVisible &:hover': { background: 'inherit;' }
        }
      }]
    ],
    splitMenu: [
      styles.root,
      {
        width: 32
      },
      expanded && [
        'is-expanded',
        styles.rootExpanded
      ],
      disabled && [
        'is-disabled',
        styles.rootDisabled
      ],
      !disabled && !expanded && [{
        selectors: {
          ':hover': styles.rootHovered,
          ':active': styles.rootPressed,
          '.ms-Fabric.is-focusVisible &:focus, .ms-Fabric.is-focusVisible &:focus:hover': styles.rootFocused,
          '.ms-Fabric.is-focusVisible &:hover': { background: 'inherit;' }
        }
      }]
    ],
    linkContent: [
      'ms-ContextualMenu-linkContent',
      styles.linkContent
    ],
    linkContentMenu: [
      'ms-ContextualMenu-linkContent',
      styles.linkContent,
      {
        justifyContent: 'center',
      }
    ],
    icon: [
      'ms-ContextualMenu-icon',
      knownIcon && 'ms-ContextualMenu-iconColor ' && styles.iconColor,
      styles.icon,
      iconClassName,
      disabled && [
        'is-disabled',
        styles.iconDisabled
      ]
    ],
    checkmarkIcon: [
      'ms-ContextualMenu-checkmarkIcon',
      knownIcon && 'ms-ContextualMenu-checkmarkIcon ' && styles.checkmarkIcon,
      styles.icon,
      iconClassName,
    ],
    subMenuIcon: [
      'ms-ContextualMenu-submenuIcon',
      styles.subMenuIcon,
      subMenuClassName,
    ],
    label: [
      'ms-ContextualMenu-itemText',
      styles.label
    ],
    splitContainer: styles.splitButtonFlexContainer,
  });
});