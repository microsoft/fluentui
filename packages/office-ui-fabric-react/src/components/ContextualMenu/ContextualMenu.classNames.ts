import { memoizeFunction } from '../../Utilities';
import { mergeStyles } from '../../Styling';
import { IContextualMenuStyles, IMenuItemStyle } from './ContextualMenu.Props';

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

export const getClassNames = memoizeFunction((
  styles: IContextualMenuStyles,
  className: string
): IContextualMenuClassNames => {

  styles = styles || {};

  return {
    container: mergeStyles(
      'ms-ContextualMenu-container',
      className,
      styles.container
    ) as string,
    root: mergeStyles(
      'ms-ContextualMenu is-open',
      styles.root
    ) as string,
    list: mergeStyles(
      'ms-ContextualMenu-list is-open',
      styles.list
    ) as string,
    divider: mergeStyles(
      'ms-ContextualMenu-divider',
      className,
      styles.divider
    ) as string,
    header: mergeStyles(
      'ms-ContextualMenu-header',
      styles.header
    ) as string,
    title: styles.title as string,
  };
});

export const getMenuItemClassNames = memoizeFunction((
  styles: IMenuItemStyle,
  isDisabled: boolean,
  isExpanded: boolean,
  isAnchorLink: boolean,
  knownIcon: boolean,
  itemClassName: string,
  expandedClassname: string,
  iconClassName: string,
  subMenuClassname: string,
): IMenuItemClassNames => {
  return {
    item: mergeStyles(
      'ms-ContextualMenu-item',
      styles.item,
      itemClassName
    ) as string,
    root: mergeStyles(
      'ms-ContextualMenu-link',
      styles.root,
      !isDisabled && !isExpanded && {
        ':hover': styles.rootHovered
      },
      isDisabled && [
        'is-disabled', styles.rootDisabled
      ],
      isAnchorLink && styles.anchorLink,
      isExpanded && [
        'is-expanded',
        expandedClassname,
        styles.rootExpanded
      ]
    ) as string,
    linkContent: mergeStyles(
      'ms-ContextualMenu-linkContent',
      styles.linkContent
    ) as string,
    icon: mergeStyles(
      'ms-ContextualMenu-icon',
      knownIcon && ('ms-ContextualMenu-iconColor ' + styles.iconColor),
      iconClassName,
      styles.icon,
    ) as string,
    subMenuIcon: mergeStyles(
      'ms-ContextualMenu-submenuIcon',
      styles.subMenuIcon,
      subMenuClassname
    ) as string,
    label: mergeStyles(
      'ms-ContextualMenu-itemText',
      styles.label
    ) as string,
  };
});