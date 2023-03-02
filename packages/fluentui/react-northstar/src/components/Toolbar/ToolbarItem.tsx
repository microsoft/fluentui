import { Accessibility, toolbarItemBehavior, ToolbarItemBehaviorProps } from '@fluentui/accessibility';
import {
  compose,
  getElementType,
  mergeVariablesOverrides,
  useUnhandledProps,
  useFluentContext,
  useAccessibility,
  useStyles,
  useTelemetry,
  useContextSelectors,
} from '@fluentui/react-bindings';
import { handleRef, Ref } from '@fluentui/react-component-ref';
import { EventListener } from '@fluentui/react-component-event-listener';
import { GetRefs, NodeRef, Unstable_NestingAuto } from '@fluentui/react-component-nesting-registry';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  createShorthand,
  doesNodeContainClick,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  childrenExist,
} from '../../utils';
import { ComponentEventHandler, ShorthandValue, ShorthandCollection } from '../../types';
import { partitionPopperPropsFromShorthand, Popper, PopperShorthandProps } from '../../utils/positioner';

import { ToolbarMenu, ToolbarMenuProps } from './ToolbarMenu';
import { Popup, PopupProps } from '../Popup/Popup';
import { ToolbarMenuItemProps } from '../Toolbar/ToolbarMenuItem';
import { ToolbarItemShorthandKinds } from './Toolbar';
import { ToolbarVariablesContext, ToolbarVariablesProvider } from './toolbarVariablesContext';
import { ToolbarItemWrapper, ToolbarItemWrapperProps } from './ToolbarItemWrapper';
import { ToolbarItemIcon, ToolbarItemIconProps } from './ToolbarItemIcon';
import { ToolbarItemSubscribedValue, ToolbarMenuContext } from './toolbarMenuContext';

export interface ToolbarItemProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ToolbarItemBehaviorProps>;

  /** A toolbar item can be active. */
  active?: boolean;

  /** A toolbar item can show it is currently unable to be interacted with. */
  disabled?: boolean;

  /** A toolbar item can be disabled and focusable at the same time. */
  disabledFocusable?: boolean;

  /** Name or shorthand for Toolbar Item Icon */
  icon?: ShorthandValue<ToolbarItemIconProps>;

  /**
   * Shorthand for the submenu.
   * If submenu is specified, the item is wrapped to group the item and the menu elements together.
   */
  menu?:
    | ShorthandValue<ToolbarMenuProps & { popper?: PopperShorthandProps }>
    | ShorthandCollection<ToolbarMenuItemProps, ToolbarItemShorthandKinds>;

  /** Indicates if the menu inside the item is open. */
  menuOpen?: boolean;

  /**
   * Event for request to change 'menuOpen' value.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onMenuOpenChange?: ComponentEventHandler<ToolbarItemProps>;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<ToolbarItemProps>;

  /**
   * Called after user's focus.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<ToolbarItemProps>;

  /**
   * Called after item blur.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onBlur?: ComponentEventHandler<ToolbarItemProps>;

  /**
   * Attaches a `Popup` component to the ToolbarItem.
   * Accepts all props as a `Popup`, except `trigger` and `children`.
   * Traps focus by default.
   * @see PopupProps
   */
  popup?: Omit<PopupProps, 'trigger' | 'children'> | string;

  /** Shorthand for the wrapper component. The item is wrapped only if it contains a menu! */
  wrapper?: ShorthandValue<ToolbarItemWrapperProps>;
}

export type ToolbarItemStylesProps = Required<Pick<ToolbarItemProps, 'active' | 'disabled' | 'disabledFocusable'>>;

export const toolbarItemClassName = 'ui-toolbar__item';

/**
 * A ToolbarItem renders Toolbar item as a button with an icon.
 */
export const ToolbarItem = compose<'button', ToolbarItemProps, ToolbarItemStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const {
      accessibility,
      active,
      className,
      design,
      icon,
      children,
      disabled,
      disabledFocusable,
      popup,
      menuOpen,
      wrapper,
      styles,
      variables,
    } = props;
    const [menu, positioningProps] = partitionPopperPropsFromShorthand(props.menu);

    const itemRef = React.useRef<HTMLElement>();
    const menuRef = React.useRef<HTMLElement>();

    const parentVariables = React.useContext(ToolbarVariablesContext);
    const mergedVariables = mergeVariablesOverrides(parentVariables, variables);

    const { menuSlot } = useContextSelectors(ToolbarMenuContext, {
      menuSlot: v => v.slots.menu,
    }) as unknown as ToolbarItemSubscribedValue; // TODO: we should improve typings for the useContextSelectors

    const getA11yProps = useAccessibility(accessibility, {
      debugName: composeOptions.displayName,
      actionHandlers: {
        performClick: event => {
          event.preventDefault();
          handleClick(event);
        },
        performWrapperClick: event => {
          handleWrapperClick(event);
        },
        closeMenuAndFocusTrigger: event => {
          trySetMenuOpen(false, event);
          _.invoke(itemRef.current, 'focus');
        },
        doNotNavigateNextToolbarItem: event => {
          event.stopPropagation();
        },
      },
      mapPropsToBehavior: () => ({
        as: String(props.as),
        disabled,
        disabledFocusable,
        hasMenu: !!menu,
        hasPopup: !!popup,
        menuOpen,
        active,
      }),
      rtl: context.rtl,
    });
    const { classes } = useStyles<ToolbarItemStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToStyles: () => ({ active, disabled, disabledFocusable }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables: mergedVariables,
      }),
      rtl: context.rtl,
      unstable_props: props,
    });

    const handleBlur = (e: React.SyntheticEvent) => {
      _.invoke(props, 'onBlur', e, props);
    };

    const handleFocus = (e: React.SyntheticEvent) => {
      _.invoke(props, 'onFocus', e, props);
    };

    const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
      if (disabled || disabledFocusable) {
        e.preventDefault();
        return;
      }

      if (menu) {
        trySetMenuOpen(!menuOpen, e);
      }

      _.invoke(props, 'onClick', e, props);
    };

    const handleWrapperClick = (e: React.MouseEvent | React.KeyboardEvent) => {
      if (menu) {
        if (doesNodeContainClick(menuRef.current, e.nativeEvent as MouseEvent, context.target, false)) {
          trySetMenuOpen(false, e);
        }
      }
    };

    const handleOutsideClick = (getRefs: GetRefs) => (e: MouseEvent) => {
      const isItemClick = doesNodeContainClick(itemRef.current, e, context.target);
      const isNestedClick = _.some(getRefs(), (childRef: NodeRef) => {
        return doesNodeContainClick(childRef.current as HTMLElement, e, context.target);
      });
      const isInside = isItemClick || isNestedClick;

      if (!isInside) {
        trySetMenuOpen(false, e);
      }
    };

    const trySetMenuOpen = (newValue: boolean, e: Event | React.SyntheticEvent) => {
      _.invoke(props, 'onMenuOpenChange', e, { ...props, menuOpen: newValue });
    };

    const handleMenuOverrides = (getRefs: GetRefs) => (predefinedProps: ToolbarMenuProps) => ({
      onBlur: (e: React.FocusEvent) => {
        const isInsideOrMenuTrigger = _.some(getRefs(), (childRef: NodeRef) => {
          return (
            childRef.current.contains(e.relatedTarget as HTMLElement) ||
            itemRef.current.contains(e.relatedTarget as HTMLElement)
          );
        });

        if (!isInsideOrMenuTrigger) {
          trySetMenuOpen(false, e);
        }
      },
      onItemClick: (e, itemProps: ToolbarMenuItemProps) => {
        const { popup, menuOpen } = itemProps;
        _.invoke(predefinedProps, 'onItemClick', e, itemProps);
        if (popup) {
          return;
        }
        // TODO: should we pass toolbarMenuItem to the user callback so he can decide if he wants to close the menu?
        trySetMenuOpen(menuOpen, e);
      },
    });

    const ElementType = getElementType(props);
    const slotProps = composeOptions.resolveSlotProps<ToolbarItemProps>(props);
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    const itemElement = (
      <Ref
        innerRef={node => {
          itemRef.current = node;
          handleRef(ref, node);
        }}
      >
        <ElementType
          {...getA11yProps('root', {
            ...unhandledProps,
            disabled,
            className: classes.root,
            onBlur: handleBlur,
            onFocus: handleFocus,
            onClick: handleClick,
          })}
        >
          {childrenExist(children) ? children : createShorthand(composeOptions.slots.icon, icon, slotProps.icon)}
        </ElementType>
      </Ref>
    );

    const submenuElement = menuOpen ? (
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
                <Popper align="start" position="above" targetRef={itemRef} {...positioningProps}>
                  <ToolbarVariablesProvider value={mergedVariables}>
                    {createShorthand(composeOptions.slots.menu || menuSlot || ToolbarMenu, menu, {
                      defaultProps: () => slotProps.menu,
                      overrideProps: handleMenuOverrides(getRefs),
                    })}
                  </ToolbarVariablesProvider>
                </Popper>
              </Ref>
              <EventListener listener={handleOutsideClick(getRefs)} target={context.target} type="click" capture />
            </>
          );
        }}
      </Unstable_NestingAuto>
    ) : null;

    if (popup) {
      const popupElement = createShorthand(composeOptions.slots.popup, popup, {
        defaultProps: () => slotProps.popup,
        overrideProps: {
          trigger: itemElement,
          children: undefined, // force-reset `children` defined for `Popup` as it collides with the `trigger`
        },
      });
      setEnd();

      return popupElement;
    }

    // wrap the item if it has menu (even if it is closed = not rendered)
    if (menu) {
      const contentElement = (
        <>
          {itemElement}
          {submenuElement}
        </>
      );

      if (wrapper) {
        const wrapperElement = createShorthand(composeOptions.slots.wrapper, wrapper, {
          defaultProps: () => getA11yProps('wrapper', slotProps.wrapper || {}),
          overrideProps: predefinedProps => ({
            children: contentElement,
            onClick: e => {
              handleWrapperClick(e);
              _.invoke(predefinedProps, 'onClick', e);
            },
          }),
        });
        setEnd();

        return wrapperElement;
      }

      setEnd();
      return contentElement;
    }

    setEnd();

    return itemElement;
  },
  {
    className: toolbarItemClassName,
    displayName: 'ToolbarItem',

    slots: {
      icon: ToolbarItemIcon,
      wrapper: ToolbarItemWrapper,
      popup: Popup, // TODO: compose Popup to ToolbarItemPopup once it has compose functionality
    },

    slotProps: () => ({
      popup: { trapFocus: true },
    }),

    shorthandConfig: { mappedProp: 'content' },
    handledProps: [
      'accessibility',
      'as',
      'children',
      'className',
      'content',
      'design',
      'styles',
      'disabledFocusable',
      'variables',
      'active',
      'disabled',
      'icon',
      'menu',
      'menuOpen',
      'onMenuOpenChange',
      'onClick',
      'onFocus',
      'onBlur',
      'popup',
      'wrapper',
    ],
  },
);

ToolbarItem.propTypes = {
  ...commonPropTypes.createCommon(),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledFocusable: PropTypes.bool,
  icon: customPropTypes.shorthandAllowingChildren,
  menu: PropTypes.oneOfType([
    customPropTypes.shorthandAllowingChildren,
    PropTypes.arrayOf(customPropTypes.shorthandAllowingChildren),
  ]),
  menuOpen: PropTypes.bool,
  onMenuOpenChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  popup: PropTypes.oneOfType([
    PropTypes.shape({
      ...Popup.propTypes,
      trigger: customPropTypes.never,
      children: customPropTypes.never,
    }),
    PropTypes.string,
  ]),
  wrapper: customPropTypes.shorthandAllowingChildren,
};
ToolbarItem.defaultProps = {
  as: 'button',
  accessibility: toolbarItemBehavior,
  wrapper: {},
};
