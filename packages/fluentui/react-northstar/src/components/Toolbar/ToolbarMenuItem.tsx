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
  compose,
  focusAsync,
  mergeVariablesOverrides,
  useTelemetry,
  useStyles,
  useAutoControlled,
  useFluentContext,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useContextSelectors,
} from '@fluentui/react-bindings';

import { GetRefs, NodeRef, Unstable_NestingAuto } from '@fluentui/react-component-nesting-registry';

import {
  createShorthand,
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  UIComponentProps,
  childrenExist,
  doesNodeContainClick,
} from '../../utils';
import { ComponentEventHandler, ShorthandValue, ShorthandCollection } from '../../types';
import { partitionPopperPropsFromShorthand, Popper, PopperShorthandProps } from '../../utils/positioner';

import { Box, BoxProps } from '../Box/Box';
import { Popup, PopupProps } from '../Popup/Popup';
import { ToolbarMenu, ToolbarMenuProps, ToolbarMenuItemShorthandKinds } from './ToolbarMenu';
import { ToolbarMenuItemIcon, ToolbarMenuItemIconProps } from './ToolbarMenuItemIcon';
import { ToolbarVariablesContext, ToolbarVariablesProvider } from './toolbarVariablesContext';
import { ToolbarMenuItemSubmenuIndicator } from './ToolbarMenuItemSubmenuIndicator';
import { ToolbarMenuItemActiveIndicator } from './ToolbarMenuItemActiveIndicator';
import { ToolbarItemSubscribedValue, ToolbarMenuContext } from './toolbarMenuContext';
import { ToolbarMenuItemContent } from './ToolbarMenuItemContent';
import { ChevronEndIcon } from '@fluentui/react-icons-northstar';

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

  /** A toolbar item can be disabled and focusable at the same time. */
  disabledFocusable?: boolean;

  /** Name or shorthand for Toolbar Item Icon */
  icon?: ShorthandValue<ToolbarMenuItemIconProps>;

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

export type ToolbarMenuItemStylesProps = Pick<ToolbarMenuItemProps, 'disabled' | 'disabledFocusable'> & {
  hasContent: boolean;
};

export interface ToolbarMenuItemSlotClassNames {
  wrapper: string;
  submenu: string;
}

export const toolbarMenuItemClassName = 'ui-toolbar__menuitem';
export const toolbarMenuItemSlotClassNames: ToolbarMenuItemSlotClassNames = {
  wrapper: `${toolbarMenuItemClassName}__wrapper`,
  submenu: `${toolbarMenuItemClassName}__submenu`,
};

/**
 * A ToolbarMenuItem renders ToolbarMenu item as button.
 */
export const ToolbarMenuItem = compose<'button', ToolbarMenuItemProps, ToolbarMenuItemStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const {
      active,
      activeIndicator,
      children,
      content,
      disabled,
      disabledFocusable,
      submenuIndicator,
      icon,
      popup,
      wrapper,
      inSubmenu,
      className,
      design,
      styles,
      variables,
    } = props;
    const [menu, menuPositioningProps] = partitionPopperPropsFromShorthand(props.menu);

    const [menuOpen, setMenuOpen] = useAutoControlled({
      defaultValue: props.defaultMenuOpen,
      value: props.menuOpen,
      initialValue: false,
    });

    const itemRef = React.useRef<HTMLElement>();
    const menuRef = React.useRef<HTMLElement>();

    const { menuSlot } = useContextSelectors(ToolbarMenuContext, {
      menuSlot: v => v.slots.menu,
    }) as unknown as ToolbarItemSubscribedValue; // TODO: we should improve typings for the useContextSelectors

    const parentVariables = React.useContext(ToolbarVariablesContext);
    const mergedVariables = mergeVariablesOverrides(parentVariables, variables);

    const ElementType = getElementType(props);
    const slotProps = composeOptions.resolveSlotProps<ToolbarMenuItemProps>(props);
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    const getA11yProps = useAccessibility(props.accessibility, {
      debugName: composeOptions.displayName,
      mapPropsToBehavior: () => ({
        hasMenu: !!menu,
        active,
        menuOpen,
        disabled,
        disabledFocusable,
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

    const { classes, styles: resolvedStyles } = useStyles<ToolbarMenuItemStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToStyles: () => ({
        disabled,
        disabledFocusable,
        hasContent: !!content,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables: mergedVariables,
      }),
      rtl: context.rtl,
      unstable_props: props,
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
          ref,
          ...unhandledProps,
        })}
      >
        {childrenExist(children) ? (
          children
        ) : (
          <>
            {createShorthand(composeOptions.slots.icon, icon, { defaultProps: () => slotProps.icon })}
            {createShorthand(composeOptions.slots.content, content, {
              defaultProps: () => getA11yProps('content', slotProps.content),
            })}
            {active &&
              createShorthand(composeOptions.slots.activeIndicator, activeIndicator, {
                defaultProps: () => slotProps.activeIndicator,
              })}
            {menu &&
              createShorthand(composeOptions.slots.submenuIndicator, submenuIndicator, {
                defaultProps: () => slotProps.submenuIndicator,
              })}
          </>
        )}
      </ElementType>
    );

    const hasChildren = childrenExist(children);

    if (popup && !hasChildren) {
      const popupElement = createShorthand(composeOptions.slots.popup, popup, {
        defaultProps: () => ({
          ...slotProps.popup,
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
          {(getRefs, nestingRef) => {
            return (
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
                    {...menuPositioningProps}
                  >
                    <ToolbarVariablesProvider value={mergedVariables}>
                      {createShorthand(composeOptions.slots.menu || menuSlot || ToolbarMenu, menu, {
                        defaultProps: () => ({
                          className: toolbarMenuItemSlotClassNames.submenu,
                          styles: resolvedStyles.menu,
                          submenu: true,
                          submenuIndicator,
                          ...slotProps.menu,
                        }),
                        overrideProps: handleMenuOverrides,
                      })}
                    </ToolbarVariablesProvider>
                  </Popper>
                </Ref>
                <EventListener
                  capture={true}
                  listener={outsideClickHandler(getRefs)}
                  target={context.target}
                  type="click"
                />
              </>
            );
          }}
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
  },
  {
    className: toolbarMenuItemClassName,
    displayName: 'ToolbarMenuItem',

    slots: {
      icon: ToolbarMenuItemIcon,
      submenuIndicator: ToolbarMenuItemSubmenuIndicator,
      activeIndicator: ToolbarMenuItemActiveIndicator,
      popup: Popup,
      content: ToolbarMenuItemContent,
    },
    slotProps: props => ({
      icon: {
        hasContent: !!props.content,
      },
      submenuIndicator: {
        accessibility: indicatorBehavior,
      },
      activeIndicator: {
        accessibility: indicatorBehavior,
      },
      popup: {
        trapFocus: true,
      },
      content: {},
    }),

    shorthandConfig: {
      mappedProp: 'content',
    },
    handledProps: [
      'accessibility',
      'as',
      'children',
      'className',
      'content',
      'design',
      'styles',
      'variables',
      'disabledFocusable',
      'active',
      'activeIndicator',
      'defaultMenuOpen',
      'disabled',
      'icon',
      'index',
      'submenuIndicator',
      'inSubmenu',
      'menu',
      'menuOpen',
      'onClick',
      'onMenuOpenChange',
      'popup',
      'wrapper',
    ],
  },
);

ToolbarMenuItem.propTypes = {
  ...commonPropTypes.createCommon(),
  active: PropTypes.bool,
  activeIndicator: customPropTypes.shorthandAllowingChildren,
  defaultMenuOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledFocusable: PropTypes.bool,
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
ToolbarMenuItem.defaultProps = {
  as: 'button',
  accessibility: toolbarMenuItemBehavior,
  activeIndicator: {},
  submenuIndicator: <ChevronEndIcon outline />,
  wrapper: { as: 'li' },
};
