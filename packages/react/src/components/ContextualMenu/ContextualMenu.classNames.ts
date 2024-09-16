import { getDividerClassNames } from '../Divider/VerticalDivider.classNames';
import { getMenuItemStyles } from './ContextualMenu.cnstyles';
import {
  mergeStyleSets,
  getGlobalClassNames,
  getScreenSelector,
  ScreenWidthMaxMedium,
  hiddenContentStyle,
} from '../../Styling';
import { memoizeFunction, IsFocusVisibleClassName } from '../../Utilities';
import type { ITheme } from '../../Styling';
import type { IVerticalDividerClassNames } from '../Divider/VerticalDivider.types';
import type { IContextualMenuItemStyles, IContextualMenuItemStyleProps } from './ContextualMenuItem.types';
import type { IContextualMenuSubComponentStyles } from './ContextualMenu.types';

/**
 * @deprecated Deprecated in favor of mergeStyles API.
 */
export interface IContextualMenuClassNames {
  container?: string;
  root?: string;
  list?: string;
  header?: string;
  title?: string;
  subComponentStyles?: IContextualMenuSubComponentStyles;
}

/**
 * @deprecated Deprecated in favor of mergeStyles API.
 */
export interface IMenuItemClassNames {
  item?: string;
  divider?: string;
  root?: string;
  linkContent?: string;
  icon?: string;
  checkmarkIcon?: string;
  subMenuIcon?: string;
  label?: string;
  secondaryText?: string;
  splitContainer?: string;
  splitPrimary?: string;
  splitMenu?: string;
  linkContentMenu?: string;
  screenReaderText?: string;
}

const CONTEXTUAL_SPLIT_MENU_MINWIDTH = '28px';

const MediumScreenSelector = getScreenSelector(0, ScreenWidthMaxMedium);

export const getSplitButtonVerticalDividerClassNames = memoizeFunction(
  /* eslint-disable deprecation/deprecation */
  (theme: ITheme): IVerticalDividerClassNames => {
    return mergeStyleSets(getDividerClassNames(theme), {
      /* eslint-enable deprecation/deprecation */
      wrapper: {
        position: 'absolute',
        right: 28, // width of the splitMenu based on the padding plus icon fontSize
        selectors: {
          [MediumScreenSelector]: {
            right: 32, // fontSize of the icon increased from 12px to 16px
          },
        },
      },
      divider: {
        height: 16,
        width: 1,
      },
    });
  },
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
  iconColor: 'ms-ContextualMenu-iconColor',
  checkmarkIcon: 'ms-ContextualMenu-checkmarkIcon',
  subMenuIcon: 'ms-ContextualMenu-submenuIcon',
  label: 'ms-ContextualMenu-itemText',
  secondaryText: 'ms-ContextualMenu-secondaryText',
  splitMenu: 'ms-ContextualMenu-splitMenu',
  screenReaderText: 'ms-ContextualMenu-screenReaderText',
};

/**
 * @deprecated Will be removed in \>= 7.0.
 * This is a package-internal method that has been depended on.
 * It is being kept in this form for backwards compatibility.
 * @internal
 */
// TODO: Audit perf. impact of and potentially remove memoizeFunction.
// https://github.com/microsoft/fluentui/issues/5534
export const getItemClassNames = memoizeFunction(
  (
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
    primaryDisabled?: boolean,
    className?: string,
  ): IContextualMenuItemStyles => {
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
                // eslint-disable-next-line @fluentui/max-len
                [`.${IsFocusVisibleClassName} &:focus, .${IsFocusVisibleClassName} &:focus:hover, :host(.${IsFocusVisibleClassName}) &:focus, :host(.${IsFocusVisibleClassName}) &:focus:hover`]:
                  styles.rootFocused,
                [`.${IsFocusVisibleClassName} &:hover, :host(.${IsFocusVisibleClassName}) &:hover`]: {
                  background: 'inherit;',
                },
              },
            },
          ],
        className,
      ],
      splitPrimary: [
        styles.root,
        {
          width: `calc(100% - ${CONTEXTUAL_SPLIT_MENU_MINWIDTH})`,
        },
        checked && ['is-checked', styles.rootChecked],
        (disabled || primaryDisabled) && ['is-disabled', styles.rootDisabled],
        !(disabled || primaryDisabled) &&
          !checked && [
            {
              selectors: {
                ':hover': styles.rootHovered,
                // when hovering over the splitPrimary also affect the splitMenu
                [`:hover ~ .${classNames.splitMenu}`]: styles.rootHovered,
                ':active': styles.rootPressed,
                // eslint-disable-next-line @fluentui/max-len
                [`.${IsFocusVisibleClassName} &:focus, .${IsFocusVisibleClassName} &:focus:hover, :host(.${IsFocusVisibleClassName}) &:focus, :host(.${IsFocusVisibleClassName}) &:focus:hover`]:
                  styles.rootFocused,
                [`.${IsFocusVisibleClassName} &:hover, :host(.${IsFocusVisibleClassName}) &:hover`]: {
                  background: 'inherit;',
                },
              },
            },
          ],
      ],
      splitMenu: [
        classNames.splitMenu,
        styles.root,
        {
          flexBasis: '0',
          padding: '0 8px',
          minWidth: CONTEXTUAL_SPLIT_MENU_MINWIDTH,
        },
        expanded && ['is-expanded', styles.rootExpanded],
        disabled && ['is-disabled', styles.rootDisabled],
        !disabled &&
          !expanded && [
            {
              selectors: {
                ':hover': styles.rootHovered,
                ':active': styles.rootPressed,
                // eslint-disable-next-line @fluentui/max-len
                [`.${IsFocusVisibleClassName} &:focus, .${IsFocusVisibleClassName} &:focus:hover, :host(.${IsFocusVisibleClassName}) &:focus, :host(.${IsFocusVisibleClassName}) &:focus:hover`]:
                  styles.rootFocused,
                [`.${IsFocusVisibleClassName} &:hover, :host(.${IsFocusVisibleClassName}) &:hover`]: {
                  background: 'inherit;',
                },
              },
            },
          ],
      ],
      anchorLink: styles.anchorLink,
      linkContent: [classNames.linkContent, styles.linkContent],
      linkContentMenu: [
        classNames.linkContentMenu,
        styles.linkContent,
        {
          justifyContent: 'center',
        },
      ],
      icon: [
        classNames.icon,
        knownIcon && styles.iconColor,
        styles.icon,
        iconClassName,
        disabled && [classNames.isDisabled, styles.iconDisabled],
      ],
      iconColor: styles.iconColor,
      checkmarkIcon: [classNames.checkmarkIcon, knownIcon && styles.checkmarkIcon, styles.icon, iconClassName],
      subMenuIcon: [
        classNames.subMenuIcon,
        styles.subMenuIcon,
        subMenuClassName,
        expanded && { color: theme.palette.neutralPrimary },
        disabled && [styles.iconDisabled],
      ],
      label: [classNames.label, styles.label],
      secondaryText: [classNames.secondaryText, styles.secondaryText],
      splitContainer: [
        styles.splitButtonFlexContainer,
        !disabled &&
          !checked && [
            {
              selectors: {
                // eslint-disable-next-line @fluentui/max-len
                [`.${IsFocusVisibleClassName} &:focus, .${IsFocusVisibleClassName} &:focus:hover, :host(.${IsFocusVisibleClassName}) &:focus, :host(.${IsFocusVisibleClassName}) &:focus:hover`]:
                  styles.rootFocused,
              },
            },
          ],
      ],
      screenReaderText: [
        classNames.screenReaderText,
        styles.screenReaderText,
        hiddenContentStyle,
        { visibility: 'hidden' },
      ],
    });
  },
);

/**
 * Wrapper function for generating ContextualMenuItem classNames which adheres to
 * the getStyles API, but invokes memoized className generator function with
 * primitive values.
 *
 * @param props - the ContextualMenuItem style props used to generate its styles.
 */
export const getItemStyles = (props: IContextualMenuItemStyleProps): IContextualMenuItemStyles => {
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
    className,
  } = props;

  // eslint-disable-next-line deprecation/deprecation
  return getItemClassNames(
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
    className,
  );
};
