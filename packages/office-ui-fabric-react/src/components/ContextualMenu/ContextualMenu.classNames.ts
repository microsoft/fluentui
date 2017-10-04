import { memoizeFunction } from '../../Utilities';
import { ITheme, mergeStyles } from '../../Styling';
import { IContextualMenuStyles, IMenuItemStyles } from './ContextualMenu.Props';
import { getStyles as getContextualMenuStyles, getMenuItemStyles } from './ContextualMenu.styles';
export interface IContextualMenuClassNames {
  container: string;
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
  icon?: string;
  subMenuIcon?: string;
  label: string;
}

export const getContextualMenuClassNames = memoizeFunction((
  theme: ITheme,
  className: string
): IContextualMenuClassNames => {

  const styles = getContextualMenuStyles(theme);

  return {
    container: mergeStyles(
      'ms-ContextualMenu-container',
      className,
      styles.container
    ),
    root: mergeStyles(
      'ms-ContextualMenu is-open',
      styles.root
    ),
    list: mergeStyles(
      'ms-ContextualMenu-list is-open',
      styles.list
    ),
    divider: mergeStyles(
      'ms-ContextualMenu-divider',
      className,
      styles.divider
    ),
    header: mergeStyles(
      'ms-ContextualMenu-header',
      styles.header
    ),
    title: mergeStyles(
      styles.title
    ),
  };
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

  return {
    item: mergeStyles(
      itemClassName,
      'ms-ContextualMenu-item',
      styles.item,
    ),
    root: mergeStyles(
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
          ':focus': styles.rootFocused,
          ':active': styles.rootPressed,
        }
      }],
    ),
    linkContent: mergeStyles(
      'ms-ContextualMenu-linkContent',
      styles.linkContent
    ),
    icon: mergeStyles(
      'ms-ContextualMenu-icon',
      knownIcon && ('ms-ContextualMenu-iconColor ' + styles.iconColor),
      iconClassName,
      styles.icon,
    ),
    subMenuIcon: mergeStyles(
      'ms-ContextualMenu-submenuIcon',
      subMenuClassname,
      styles.subMenuIcon
    ),
    label: mergeStyles(
      'ms-ContextualMenu-itemText',
      styles.label
    ),
  };
});