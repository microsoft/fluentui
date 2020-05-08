import {
  Accessibility,
  menuItemBehavior,
  submenuBehavior,
  indicatorBehavior,
  MenuItemBehaviorProps,
} from '@fluentui/accessibility';
import {
  focusAsync,
  useTelemetry,
  useAutoControlled,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStyles,
} from '@fluentui/react-bindings';
import { EventListener } from '@fluentui/react-component-event-listener';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import cx from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  childrenExist,
  createShorthandFactory,
  doesNodeContainClick,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  isFromKeyboard as isEventFromKeyboard,
} from '../../utils';
import Menu, { MenuProps, MenuShorthandKinds } from './Menu';
import Box, { BoxProps } from '../Box/Box';
import {
  ComponentEventHandler,
  WithAsProp,
  ShorthandValue,
  ShorthandCollection,
  withSafeTypeForAs,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
import { Popper, PopperShorthandProps, getPopperPropsFromShorthand } from '../../utils/positioner';
// @ts-ignore
import { ThemeContext } from 'react-fela';

export interface MenuItemSlotClassNames {
  wrapper: string;
  submenu: string;
  indicator: string;
}

export interface MenuItemProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @available menuItemAsToolbarButtonBehavior, tabBehavior
   */
  accessibility?: Accessibility<MenuItemBehaviorProps>;

  /** A menu item can be active. */
  active?: boolean;

  /** A menu item can show it is currently unable to be interacted with. */
  disabled?: boolean;

  /** Name or shorthand for Menu Item Icon */
  icon?: ShorthandValue<BoxProps>;

  /** A menu may have just icons. */
  iconOnly?: boolean;

  /** MenuItem index inside Menu. */
  index?: number;

  /** MenuItem position inside Menu (skipping separators). */
  itemPosition?: number;

  /** MenuItem count inside Menu. */
  itemsCount?: number;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<MenuItemProps>;

  /**
   * Called after user's focus.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<MenuItemProps>;

  /**
   * Called after item blur.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onBlur?: ComponentEventHandler<MenuItemProps>;

  /** A menu can adjust its appearance to de-emphasize its contents. */
  pills?: boolean;

  /**
   * A menu can point to show its relationship to nearby content.
   * For vertical menu, it can point to the start of the item or to the end.
   */
  pointing?: boolean | 'start' | 'end';

  /** The menu item can have primary type. */
  primary?: boolean;

  /** The menu item can have secondary type. */
  secondary?: boolean;

  /** Menu items can by highlighted using underline. */
  underlined?: boolean;

  /** A vertical menu displays elements vertically. */
  vertical?: boolean;

  /** Shorthand for the wrapper component. */
  wrapper?: ShorthandValue<BoxProps>;

  /** Shorthand for the submenu. */
  menu?:
    | ShorthandValue<MenuProps & { popper?: PopperShorthandProps }>
    | ShorthandCollection<MenuItemProps, MenuShorthandKinds>;

  /** Indicates if the menu inside the item is open. */
  menuOpen?: boolean;

  /** Default menu open */
  defaultMenuOpen?: boolean;

  /** Callback for setting the current menu item as active element in the menu. */
  onActiveChanged?: ComponentEventHandler<MenuItemProps>;

  /** Indicates whether the menu item is part of submenu. */
  inSubmenu?: boolean;

  /** Shorthand for the submenu indicator. */
  indicator?: ShorthandValue<BoxProps>;

  /**
   * Event for request to change 'open' value.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onMenuOpenChange?: ComponentEventHandler<MenuItemProps>;
}

export type MenuItemStylesProps = Required<
  Pick<
    MenuItemProps,
    | 'primary'
    | 'underlined'
    | 'active'
    | 'vertical'
    | 'pointing'
    | 'secondary'
    | 'disabled'
    | 'iconOnly'
    | 'pills'
    | 'icon'
    | 'menu'
    | 'inSubmenu'
  >
> & { isFromKeyboard: boolean; hasContent: boolean };

export const menuItemClassName = 'ui-menu__item';
export const menuItemSlotClassNames: MenuItemSlotClassNames = {
  submenu: `${menuItemClassName}__submenu`,
  wrapper: `${menuItemClassName}__wrapper`,
  indicator: `${menuItemClassName}__indicator`,
};

export const MenuItem: React.FC<WithAsProp<MenuItemProps>> & FluentComponentStaticProps<MenuItemProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(MenuItem.displayName, context.telemetry);
  setStart();

  const {
    children,
    content,
    icon,
    wrapper,
    menu,
    primary,
    secondary,
    active,
    vertical,
    indicator,
    disabled,
    accessibility,
    underlined,
    iconOnly,
    inSubmenu,
    pills,
    pointing,
    className,
    design,
    styles,
    variables,
  } = props;

  const [menuOpen, setMenuOpen] = useAutoControlled({
    defaultValue: props.defaultMenuOpen,
    value: props.menuOpen,
    initialValue: false,
  });

  const [isFromKeyboard, setIsFromKeyboard] = React.useState(false);

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(MenuItem.handledProps, props);

  const getA11yProps = useAccessibility<MenuItemBehaviorProps>(accessibility, {
    debugName: MenuItem.displayName,
    actionHandlers: {
      performClick: event => !event.defaultPrevented && handleClick(event),
      openMenu: event => openMenu(event),
      closeAllMenusAndFocusNextParentItem: event => closeAllMenus(event),
      closeMenu: event => closeMenu(event),
      closeMenuAndFocusTrigger: event => closeMenu(event, true),
      doNotNavigateNextParentItem: event => {
        event.stopPropagation();
      },
      closeAllMenus: event => closeAllMenus(event),
    },
    mapPropsToBehavior: () => ({
      menuOpen,
      menu,
      disabled,
      vertical,
    }),
    rtl: context.rtl,
  });

  const { classes, styles: resolvedStyles } = useStyles<MenuItemStylesProps>(MenuItem.displayName, {
    className: menuItemClassName,
    mapPropsToStyles: () => ({
      primary,
      underlined,
      active,
      vertical,
      pointing,
      secondary,
      disabled,
      iconOnly,
      pills,
      icon,
      menu,
      inSubmenu,
      isFromKeyboard,
      hasContent: !!content,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const menuRef = React.createRef<HTMLElement>();
  const itemRef = React.createRef<HTMLElement>();

  const handleWrapperBlur = e => {
    if (!props.inSubmenu && !e.currentTarget.contains(e.relatedTarget)) {
      trySetMenuOpen(false, e);
    }
  };

  const outsideClickHandler = e => {
    if (!isSubmenuOpen()) return;
    if (
      !doesNodeContainClick(itemRef.current, e, context.target) &&
      !doesNodeContainClick(menuRef.current, e, context.target)
    ) {
      trySetMenuOpen(false, e);
    }
  };

  const performClick = e => {
    if (menu) {
      if (doesNodeContainClick(menuRef.current, e, context.target)) {
        // submenu was clicked => close it and propagate
        trySetMenuOpen(false, e, () => focusAsync(itemRef.current));
      } else {
        // the menuItem element was clicked => toggle the open/close and stop propagation
        trySetMenuOpen(active ? !menuOpen : true, e);
        e.stopPropagation();
        e.preventDefault();
      }
    }
  };

  const handleClick = (e: Event | React.SyntheticEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    performClick(e);
    _.invoke(props, 'onClick', e, props);
  };

  const handleBlur = (e: React.SyntheticEvent) => {
    setIsFromKeyboard(false);

    _.invoke(props, 'onBlur', e, props);
  };

  const handleFocus = (e: React.SyntheticEvent) => {
    setIsFromKeyboard(isEventFromKeyboard());

    _.invoke(props, 'onFocus', e, props);
  };

  const isSubmenuOpen = (): boolean => {
    return !!(menu && menuOpen);
  };

  const closeAllMenus = (e: Event) => {
    if (!isSubmenuOpen()) {
      return;
    }

    trySetMenuOpen(false, e, () => {
      if (!inSubmenu) {
        focusAsync(itemRef.current);
      }
    });

    // avoid spacebar scrolling the page
    if (!inSubmenu) {
      e.preventDefault();
    }
  };

  const closeMenu = (e: Event, forceTriggerFocus?: boolean) => {
    if (!isSubmenuOpen()) {
      return;
    }

    const shouldStopPropagation = inSubmenu || props.vertical;
    trySetMenuOpen(false, e, () => {
      if (forceTriggerFocus || shouldStopPropagation) {
        focusAsync(itemRef.current);
      }
    });

    if (forceTriggerFocus || shouldStopPropagation) {
      e.stopPropagation();
    }
  };

  const openMenu = (e: Event) => {
    if (menu && !menuOpen) {
      trySetMenuOpen(true, e);
      _.invoke(props, 'onActiveChanged', e, { ...props, active: true });
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const trySetMenuOpen = (newValue: boolean, e: Event | React.SyntheticEvent, onStateChanged?: any) => {
    setMenuOpen(newValue);
    // The reason why post-effect is not passed as callback to trySetState method
    // is that in 'controlled' mode the post-effect is applied before final re-rendering
    // which cause a broken behavior: for e.g. when it is needed to focus submenu trigger on ESC.
    // TODO: all DOM post-effects should be applied at componentDidMount & componentDidUpdated stages.
    onStateChanged && onStateChanged();
    _.invoke(props, 'onMenuOpenChange', e, {
      ...props,
      menuOpen: newValue,
    });
  };

  const menuItemInner = (
    <Ref innerRef={itemRef}>
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          disabled,
          onBlur: handleBlur,
          onFocus: handleFocus,
          ...unhandledProps,
        })}
        {...(!wrapper && { onClick: handleClick })}
      >
        {Box.create(icon, {
          defaultProps: () =>
            getA11yProps('icon', {
              styles: resolvedStyles.icon,
              as: 'span',
            }),
        })}
        {Box.create(content, {
          defaultProps: () => getA11yProps('content', { as: 'span', styles: resolvedStyles.content }),
        })}
        {menu &&
          Box.create(indicator, {
            defaultProps: () =>
              getA11yProps('indicator', {
                as: 'span',
                className: menuItemSlotClassNames.indicator,
                styles: resolvedStyles.indicator,
                accessibility: indicatorBehavior,
              }),
          })}
      </ElementType>
    </Ref>
  );

  const maybeSubmenu =
    menu && active && menuOpen ? (
      <>
        <Ref innerRef={menuRef}>
          <Popper
            align={vertical ? 'top' : context.rtl ? 'end' : 'start'}
            position={vertical ? (context.rtl ? 'before' : 'after') : 'below'}
            targetRef={itemRef}
            {...getPopperPropsFromShorthand(menu)}
          >
            {Menu.create(menu, {
              defaultProps: () => ({
                accessibility: submenuBehavior,
                className: menuItemSlotClassNames.submenu,
                vertical: true,
                primary,
                secondary,
                styles: resolvedStyles.menu,
                submenu: true,
                indicator,
              }),
            })}
          </Popper>
        </Ref>
        <EventListener listener={outsideClickHandler} target={context.target} type="click" />
      </>
    ) : null;

  if (wrapper) {
    const wrapperElement = Box.create(wrapper, {
      defaultProps: () =>
        getA11yProps('wrapper', {
          className: cx(menuItemSlotClassNames.wrapper, classes.wrapper),
        }),
      overrideProps: () => ({
        children: (
          <>
            {childrenExist(children) ? children : menuItemInner}
            {maybeSubmenu}
          </>
        ),
        onClick: handleClick,
        onBlur: handleWrapperBlur,
      }),
    });

    setEnd();
    return wrapperElement;
  }

  setEnd();
  return menuItemInner;
};

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {
  ...commonPropTypes.createCommon(),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: customPropTypes.shorthandAllowingChildren,
  iconOnly: PropTypes.bool,
  index: PropTypes.number,
  itemPosition: PropTypes.number,
  itemsCount: PropTypes.number,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  pills: PropTypes.bool,
  pointing: PropTypes.oneOf(['start', 'end', true, false]),
  primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
  secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
  underlined: PropTypes.bool,
  vertical: PropTypes.bool,
  wrapper: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  menu: PropTypes.oneOfType([customPropTypes.itemShorthand, customPropTypes.collectionShorthand]),
  menuOpen: PropTypes.bool,
  defaultMenuOpen: PropTypes.bool,
  onActiveChanged: PropTypes.func,
  inSubmenu: PropTypes.bool,
  indicator: customPropTypes.shorthandAllowingChildren,
  onMenuOpenChange: PropTypes.func,
};

MenuItem.handledProps = Object.keys(MenuItem.propTypes) as any;

MenuItem.defaultProps = {
  as: 'a',
  accessibility: menuItemBehavior as Accessibility,
  wrapper: { as: 'li' },
  indicator: {},
};

MenuItem.create = createShorthandFactory({ Component: MenuItem, mappedProp: 'content' });

// MenuItem.autoControlledProps = ['menuOpen'];

/**
 * A MenuItem is an actionable item within a Menu.
 */
export default withSafeTypeForAs<typeof MenuItem, MenuItemProps, 'a'>(MenuItem);
