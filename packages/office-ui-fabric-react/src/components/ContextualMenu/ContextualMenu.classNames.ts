import { memoizeFunction } from '../../Utilities';
import { ITheme, mergeStyleSets } from '../../Styling';
import { IContextualMenuStyles, IMenuItemStyles } from './ContextualMenu.Props';
import { getStyles as getContextualMenuStyles, getMenuItemStyles } from './ContextualMenu.styles';
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
      styles.container,
      className,
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
  itemClassName: string,
  dividerClassName: string,
  iconClassName: string,
  subMenuClassName: string,
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
      knownIcon && 'ms-ContextualMenu-iconColor ' && {
        color: ContextualMenuIconColor
      },
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
    ]
  });
});