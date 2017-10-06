import { memoizeFunction } from '../../Utilities';
import { ITheme, mergeStyleSets } from '../../Styling';
import { IContextualMenuStyles, IMenuItemStyles } from './ContextualMenu.Props';
import { getStyles as getContextualMenuStyles, getMenuItemStyles } from './ContextualMenu.styles';
export interface IContextualMenuClassNames {
  container?: string;
  root: string;
  list: string;
  divider: string;
  header: string;
  title: string;
}

export interface IMenuItemClassNames {
  item: string;
  root: string;
  linkContent: string;
  icon: string;
  subMenuIcon: string;
  label: string;
}

export const getContextualMenuClassNames = memoizeFunction((
  theme: ITheme,
  className: string
): IContextualMenuClassNames => {

  const styles = getContextualMenuStyles(theme);

  return mergeStyleSets({
    container: [
      'ms-ContextualMenu-container',
      className,
      styles.container
    ],
    root: [
      'ms-ContextualMenu is-open',
      styles.root
    ],
    list: [
      'ms-ContextualMenu-list is-open',
      styles.list
    ],
    divider: [
      'ms-ContextualMenu-divider',
      className,
      styles.divider
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
  itemClassName: string,
  iconClassName: string,
  subMenuClassname: string,
): IMenuItemClassNames => {

  const styles = getMenuItemStyles(theme);

  return mergeStyleSets({
    item: [
      itemClassName,
      'ms-ContextualMenu-item',
      styles.item,
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
      !disabled && !expanded && !checked && [{
        selectors: {
          ':hover': styles.rootHovered,
          ':active': styles.rootPressed,
          '.ms-Fabric.is-focusVisible &:focus': styles.rootFocused
        }
      }],
    ],
    linkContent: [
      'ms-ContextualMenu-linkContent',
      styles.linkContent
    ],
    icon: [
      'ms-ContextualMenu-icon',
      knownIcon && ('ms-ContextualMenu-iconColor ' + styles.iconColor),
      iconClassName,
      styles.icon,
    ],
    subMenuIcon: [
      'ms-ContextualMenu-submenuIcon',
      subMenuClassname,
      styles.subMenuIcon
    ],
    label: [
      'ms-ContextualMenu-itemText',
      styles.label
    ]
  });
});