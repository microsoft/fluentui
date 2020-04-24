import {
  Accessibility,
  toolbarMenuItemBehavior,
  ToolbarMenuItemBehaviorProps,
  indicatorBehavior,
} from '@fluentui/accessibility';
import * as React from 'react';
import * as _ from 'lodash';
import cx from 'classnames';
import * as PropTypes from 'prop-types';

import { EventListener } from '@fluentui/react-component-event-listener';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import {
  focusAsync,
  useTelemetry,
  useStyles,
  useAutoControlled,
  getElementType,
  useUnhandledProps,
  useAccessibility,
} from '@fluentui/react-bindings';
import { mergeComponentVariables } from '@fluentui/styles';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import { GetRefs, NodeRef, Unstable_NestingAuto } from '@fluentui/react-component-nesting-registry';

import {
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  UIComponentProps,
  createShorthandFactory,
  childrenExist,
  doesNodeContainClick,
} from '../../utils';
import {
  ComponentEventHandler,
  ShorthandValue,
  WithAsProp,
  withSafeTypeForAs,
  Omit,
  ShorthandCollection,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
import { getPopperPropsFromShorthand, Popper, PopperShorthandProps } from '../../utils/positioner';

import Box, { BoxProps } from '../Box/Box';
import Popup, { PopupProps } from '../Popup/Popup';
import ToolbarMenu, { ToolbarMenuProps, ToolbarMenuItemShorthandKinds } from './ToolbarMenu';
import { ToolbarVariablesContext, ToolbarVariablesProvider } from './toolbarVariablesContext';

export interface ToolbarMenuItemProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<ToolbarMenuItemBehaviorProps>;

  /** A toolbar item can be active. */
  active?: boolean;

  /** A slot for a selected indicator in the dropdown list. */
  activeIndicator?: ShorthandValue<BoxProps>;

  /** A toolbar item can show it is currently unable to be interacted with. */
  disabled?: boolean;

  /** Name or shorthand for Toolbar Item Icon */
  icon?: ShorthandValue<BoxProps>;

  /** ToolbarMenuItem index inside ToolbarMenu. */
  index?: number;

  /** Shorthand for the submenu indicator. */
  submenuIndicator?: ShorthandValue<BoxProps>;

  /** Indicates whether the menu item is part of submenu. */
  inSubmenu?: boolean;

  /** Shorthand for the submenu. */
  menu?:
    | ShorthandValue<ToolbarMenuProps & { popper?: PopperShorthandProps }>
    | ShorthandCollection<ToolbarMenuItemProps, ToolbarMenuItemShorthandKinds>;

  /** Indicates if the menu inside the item is open. */
  menuOpen?: boolean;

  /** Default menu open */
  defaultMenuOpen?: boolean;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<ToolbarMenuItemProps>;

  /**
   * Called when the menu inside the item opens or closes.
   * @param event - React's original SyntheticEvent.
   * @param data - All props, with `menuOpen` reflecting the new state.
   */
  onMenuOpenChange?: ComponentEventHandler<ToolbarMenuItemProps>;

  /**
   * Attaches a `Popup` component to the ToolbarMenuItem.
   * Accepts all props as a `Popup`, except `trigger` and `children`.
   * Traps focus by default.
   * @see PopupProps
   */
  popup?: Omit<PopupProps, 'trigger' | 'children'> | string;

  /** Shorthand for the wrapper component. */
  wrapper?: ShorthandValue<BoxProps>;
}

export type ToolbarMenuItemStylesProps = Pick<ToolbarMenuItemProps, 'disabled'> & { hasContent: boolean };

export interface ToolbarMenuItemSlotClassNames {
  activeIndicator: string;
  wrapper: string;
  submenu: string;
  submenuIndicator: string;
}

export const toolbarMenuItemClassName = 'ui-toolbar__menuitem';
export const toolbarMenuItemSlotClassNames: ToolbarMenuItemSlotClassNames = {
  activeIndicator: `${toolbarMenuItemClassName}__activeIndicator`,
  wrapper: `${toolbarMenuItemClassName}__wrapper`,
  submenu: `${toolbarMenuItemClassName}__submenu`,
  submenuIndicator: `${toolbarMenuItemClassName}__submenuIndicator`,
};

const ToolbarMenuItem: React.FC<WithAsProp<ToolbarMenuItemProps>> &
  FluentComponentStaticProps<ToolbarMenuItemProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(ToolbarMenuItem.displayName, context.telemetry);
  setStart();

  const {
    active,
    activeIndicator,
    children,
    content,
    disabled,
    submenuIndicator,
    icon,
    menu,
    popup,
    wrapper,
    inSubmenu,
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

  const itemRef = React.useRef<HTMLElement>();
  const menuRef = React.useRef<HTMLElement>();

  const parentVariables = React.useContext(ToolbarVariablesContext);
  const mergedVariables = mergeComponentVariables(parentVariables, variables);

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(ToolbarMenuItem.handledProps, props);

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: ToolbarMenuItem.displayName,
    mapPropsToBehavior: () => ({
      menu,
      active,
      menuOpen,
      disabled,
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-describedby': props['aria-describedby'],
    }),
    actionHandlers: {
      performClick: event => {
        event.preventDefault();
        handleClick(event);
      },
      openMenu: event => openMenu(event),
      closeAllMenusAndFocusNextParentItem: event => closeAllMenus(event),
      closeMenu: event => closeMenu(event),
      closeMenuAndFocusTrigger: event => closeMenu(event),
      doNotNavigateNextParentItem: event => {
        event.stopPropagation();
      },
      closeAllMenus: event => closeAllMenus(event),
    },
    rtl: context.rtl,
  });

  const { classes, styles: resolvedStyles } = useStyles<ToolbarMenuItemStylesProps>(ToolbarMenuItem.displayName, {
    className: toolbarMenuItemClassName,
    mapPropsToStyles: () => ({
      disabled,
      hasContent: !!content,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables: mergedVariables,
    }),
    rtl: context.rtl,
  });

  const openMenu = (e: React.KeyboardEvent) => {
    if (menu && !menuOpen) {
      trySetMenuOpen(true, e);
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const closeMenu = (e: React.KeyboardEvent) => {
    if (!isSubmenuOpen()) {
      return;
    }

    trySetMenuOpen(false, e, () => {
      focusAsync(itemRef.current);
    });

    e.stopPropagation();
  };

  const closeAllMenus = (e: React.KeyboardEvent) => {
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

  const isSubmenuOpen = (): boolean => {
    return !!(menu && menuOpen);
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

  const outsideClickHandler = (getRefs: GetRefs) => (e: MouseEvent) => {
    const isItemClick = doesNodeContainClick(itemRef.current, e, context.target);
    const isNestedClick = _.some(getRefs(), (childRef: NodeRef) => {
      return doesNodeContainClick(childRef.current as HTMLElement, e, context.target);
    });
    const isInside = isItemClick || isNestedClick;

    if (!isInside) {
      trySetMenuOpen(false, e);
    }
  };

  const handleMenuOverrides = (predefinedProps: ToolbarMenuProps) => ({
    onItemClick: (e, itemProps: ToolbarMenuItemProps) => {
      const { popup, menuOpen } = itemProps;
      _.invoke(predefinedProps, 'onItemClick', e, itemProps);
      if (popup) {
        return;
      }

      trySetMenuOpen(menuOpen, e);
      if (!menuOpen) {
        _.invoke(itemRef.current, 'focus');
      }
    },
  });

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (menu) {
      // the menuItem element was clicked => toggle the open/close and stop propagation
      trySetMenuOpen(!menuOpen, e);
      e.stopPropagation();
      e.preventDefault();
    }

    if (popup) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    _.invoke(props, 'onClick', e, props);
  };

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        onClick: handleClick,
        disabled,
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? (
        children
      ) : (
        <>
          {Box.create(icon, {
            defaultProps: () => ({
              styles: resolvedStyles.icon,
            }),
          })}
          {content}
          {active &&
            Box.create(activeIndicator, {
              defaultProps: () => ({
                as: 'span',
                className: toolbarMenuItemSlotClassNames.activeIndicator,
                styles: resolvedStyles.activeIndicator,
                accessibility: indicatorBehavior,
              }),
            })}
          {menu &&
            Box.create(submenuIndicator, {
              defaultProps: () => ({
                as: 'span',
                className: toolbarMenuItemSlotClassNames.submenuIndicator,
                styles: resolvedStyles.submenuIndicator,
                accessibility: indicatorBehavior,
              }),
            })}
        </>
      )}
    </ElementType>
  );

  const hasChildren = childrenExist(children);

  if (popup && !hasChildren) {
    const popupElement = Popup.create(popup, {
      defaultProps: () => ({
        trapFocus: true,
        onOpenChange: e => {
          e.stopPropagation();
        },
      }),
      overrideProps: {
        trigger: element,
        children: undefined, // force-reset `children` defined for `Popup` as it collides with the `trigger`
      },
    });
    setEnd();

    return popupElement;
  }

  const menuItemInner = hasChildren ? (children as React.ReactElement) : <Ref innerRef={itemRef}>{element}</Ref>;

  const maybeSubmenu =
    menu && menuOpen ? (
      <Unstable_NestingAuto>
        {(getRefs, nestingRef) => (
          <>
            <Ref
              innerRef={(node: HTMLElement) => {
                nestingRef.current = node;
                menuRef.current = node;
              }}
            >
              <Popper
                align="top"
                position={context.rtl ? 'before' : 'after'}
                targetRef={itemRef}
                {...getPopperPropsFromShorthand(menu)}
              >
                <ToolbarVariablesProvider value={mergedVariables}>
                  {ToolbarMenu.create(menu, {
                    defaultProps: () => ({
                      className: toolbarMenuItemSlotClassNames.submenu,
                      styles: resolvedStyles.menu,
                      submenu: true,
                      submenuIndicator,
                    }),
                    overrideProps: handleMenuOverrides,
                  })}
                </ToolbarVariablesProvider>
              </Popper>
            </Ref>
            <EventListener listener={outsideClickHandler(getRefs)} target={context.target} type="click" />
          </>
        )}
      </Unstable_NestingAuto>
    ) : null;

  if (!wrapper) {
    setEnd();
    return menuItemInner;
  }

  const wrapperElement = Box.create(wrapper, {
    defaultProps: () =>
      getA11yProps('wrapper', {
        className: cx(toolbarMenuItemSlotClassNames.wrapper, classes.wrapper),
      }),
    overrideProps: () => ({
      children: (
        <>
          {menuItemInner}
          {maybeSubmenu}
        </>
      ),
    }),
  });
  setEnd();

  return wrapperElement;
};

ToolbarMenuItem.displayName = 'ToolbarMenuItem';

ToolbarMenuItem.propTypes = {
  ...commonPropTypes.createCommon(),
  active: PropTypes.bool,
  activeIndicator: customPropTypes.shorthandAllowingChildren,
  defaultMenuOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: customPropTypes.shorthandAllowingChildren,
  index: PropTypes.number,
  submenuIndicator: customPropTypes.shorthandAllowingChildren,
  inSubmenu: PropTypes.bool,
  menu: PropTypes.oneOfType([customPropTypes.itemShorthand, customPropTypes.collectionShorthand]),
  menuOpen: PropTypes.bool,
  onClick: PropTypes.func,
  onMenuOpenChange: PropTypes.func,
  popup: PropTypes.oneOfType([
    PropTypes.shape({
      ...Popup.propTypes,
      trigger: customPropTypes.never,
      children: customPropTypes.never,
    }),
    PropTypes.string,
  ]),
  wrapper: customPropTypes.itemShorthand,
};

ToolbarMenuItem.handledProps = Object.keys(ToolbarMenuItem.propTypes) as any;

ToolbarMenuItem.defaultProps = {
  as: 'button',
  accessibility: toolbarMenuItemBehavior,
  wrapper: { as: 'li' },
  activeIndicator: {},
  submenuIndicator: {},
};

ToolbarMenuItem.create = createShorthandFactory({
  Component: ToolbarMenuItem,
  mappedProp: 'content',
});

/**
 * A ToolbarMenuItem renders ToolbarMenu item as button.
 */
export default withSafeTypeForAs<typeof ToolbarMenuItem, ToolbarMenuItemProps, 'button'>(ToolbarMenuItem);
