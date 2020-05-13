import { Accessibility, toolbarItemBehavior, ToolbarItemBehaviorProps } from '@fluentui/accessibility';
import { getElementType, useUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import { EventListener } from '@fluentui/react-component-event-listener';
import { GetRefs, NodeRef, Unstable_NestingAuto } from '@fluentui/react-component-nesting-registry';
import * as customPropTypes from '@fluentui/react-proptypes';
import { mergeComponentVariables } from '@fluentui/styles';
import cx from 'classnames';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import {
  createShorthandFactory,
  doesNodeContainClick,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  childrenExist,
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

import ToolbarMenu, { ToolbarMenuProps } from './ToolbarMenu';
import Box, { BoxProps } from '../Box/Box';
import Popup, { PopupProps } from '../Popup/Popup';
import { ToolbarMenuItemProps } from '../Toolbar/ToolbarMenuItem';
import { ToolbarItemShorthandKinds } from './Toolbar';
import { ToolbarVariablesContext, ToolbarVariablesProvider } from './toolbarVariablesContext';

export interface ToolbarItemProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ToolbarItemBehaviorProps>;

  /** A toolbar item can be active. */
  active?: boolean;

  /** A toolbar item can show it is currently unable to be interacted with. */
  disabled?: boolean;

  /** Name or shorthand for Toolbar Item Icon */
  icon?: ShorthandValue<BoxProps>;

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
  wrapper?: ShorthandValue<BoxProps>;
}

export type ToolbarItemStylesProps = Required<Pick<ToolbarItemProps, 'active' | 'disabled'>>;

export interface ToolbarItemSlotClassNames {
  wrapper: string;
}

export const toolbarItemClassName = 'ui-toolbar__item';
export const toolbarItemSlotClassNames: ToolbarItemSlotClassNames = {
  wrapper: `${toolbarItemClassName}__wrapper`,
};

const ToolbarItem: React.FC<WithAsProp<ToolbarItemProps>> & FluentComponentStaticProps<ToolbarItemProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(ToolbarItem.displayName, context.telemetry);
  setStart();

  const {
    accessibility,
    active,
    className,
    design,
    icon,
    children,
    disabled,
    popup,
    menu,
    menuOpen,
    wrapper,
    styles,
    variables,
  } = props;

  const itemRef = React.useRef<HTMLElement>();
  const menuRef = React.useRef<HTMLElement>();

  const parentVariables = React.useContext(ToolbarVariablesContext);
  const mergedVariables = mergeComponentVariables(parentVariables, variables);

  const getA11yProps = useAccessibility(accessibility, {
    debugName: ToolbarItem.displayName,
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
      hasMenu: !!menu,
      hasPopup: !!popup,
      menuOpen,
      active,
    }),
    rtl: context.rtl,
  });
  const { classes } = useStyles<ToolbarItemStylesProps>(ToolbarItem.displayName, {
    className: toolbarItemClassName,
    mapPropsToStyles: () => ({ active, disabled }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables: mergedVariables,
    }),
    rtl: context.rtl,
  });

  const handleBlur = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onBlur', e, props);
  };

  const handleFocus = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onFocus', e, props);
  };

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (disabled) {
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
      if (doesNodeContainClick(menuRef.current, e.nativeEvent as MouseEvent, context.target)) {
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
  const unhandledProps = useUnhandledProps(ToolbarItem.handledProps, props);

  const itemElement = (
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
      {childrenExist(children) ? children : Box.create(icon)}
    </ElementType>
  );

  const submenuElement = menuOpen ? (
    <Unstable_NestingAuto>
      {(getRefs, nestingRef) => (
        <>
          <Ref
            innerRef={(node: HTMLElement) => {
              nestingRef.current = node;
              menuRef.current = node;
            }}
          >
            <Popper align="start" position="above" targetRef={itemRef} {...getPopperPropsFromShorthand(menu)}>
              <ToolbarVariablesProvider value={mergedVariables}>
                {ToolbarMenu.create(menu, {
                  overrideProps: handleMenuOverrides(getRefs),
                })}
              </ToolbarVariablesProvider>
            </Popper>
          </Ref>
          <EventListener listener={handleOutsideClick(getRefs)} target={context.target} type="click" capture />
        </>
      )}
    </Unstable_NestingAuto>
  ) : null;

  if (popup) {
    const popupElement = Popup.create(popup, {
      defaultProps: () => ({
        trapFocus: true,
      }),
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
        <Ref innerRef={itemRef}>{itemElement}</Ref>
        {submenuElement}
      </>
    );

    if (wrapper) {
      const wrapperElement = Box.create(wrapper, {
        defaultProps: () =>
          getA11yProps('wrapper', {
            className: cx(toolbarItemSlotClassNames.wrapper, classes.wrapper),
          }),
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

  const refElement = <Ref innerRef={itemRef}>{itemElement}</Ref>;
  setEnd();

  return refElement;
};

ToolbarItem.displayName = 'ToolbarItem';

ToolbarItem.defaultProps = {
  as: 'button',
  accessibility: toolbarItemBehavior,
  wrapper: {},
};
ToolbarItem.propTypes = {
  ...commonPropTypes.createCommon(),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
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
ToolbarItem.handledProps = Object.keys(ToolbarItem.propTypes) as any;

ToolbarItem.create = createShorthandFactory({ Component: ToolbarItem, mappedProp: 'content' });

/**
 * A ToolbarItem renders Toolbar item as a button with an icon.
 */
export default withSafeTypeForAs<typeof ToolbarItem, ToolbarItemProps, 'button'>(ToolbarItem);
