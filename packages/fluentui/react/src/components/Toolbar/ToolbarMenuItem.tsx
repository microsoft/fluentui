import { Accessibility, toolbarMenuItemBehavior } from '@fluentui/accessibility';
import * as React from 'react';
import * as _ from 'lodash';
import cx from 'classnames';
import * as PropTypes from 'prop-types';

import { EventListener } from '@fluentui/react-component-event-listener';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import { focusAsync } from '@fluentui/react-bindings';
import { GetRefs, NodeRef, Unstable_NestingAuto } from '@fluentui/react-component-nesting-registry';

import {
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  AutoControlledComponent,
  UIComponentProps,
  createShorthandFactory,
  childrenExist,
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
  doesNodeContainClick
} from '../../utils';
import { ComponentEventHandler, ShorthandValue, WithAsProp, withSafeTypeForAs, Omit, ShorthandCollection } from '../../types';
import { Popper } from '../../utils/positioner';

import Box, { BoxProps } from '../Box/Box';
import Icon, { IconProps } from '../Icon/Icon';
import Popup, { PopupProps } from '../Popup/Popup';
import { ToolbarMenuProps, ToolbarMenuItemShorthandKinds, default as ToolbarMenu } from './ToolbarMenu';

export interface ToolbarMenuItemProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility;

  /** A toolbar item can be active. */
  active?: boolean;

  /** A slot for a selected indicator in the dropdown list. */
  activeIndicator?: ShorthandValue<IconProps>;

  /** A toolbar item can show it is currently unable to be interacted with. */
  disabled?: boolean;

  /** Name or shorthand for Toolbar Item Icon */
  icon?: ShorthandValue<IconProps>;

  /** ToolbarMenuItem index inside ToolbarMenu. */
  index?: number;

  /** Shorthand for the submenu indicator. */
  submenuIndicator?: ShorthandValue<IconProps>;

  /** Indicates whether the menu item is part of submenu. */
  inSubmenu?: boolean;

  /** Shorthand for the submenu. */
  menu?: ShorthandValue<ToolbarMenuProps> | ShorthandCollection<ToolbarMenuItemProps, ToolbarMenuItemShorthandKinds>;

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

export interface ToolbarMenuItemState {
  menuOpen: boolean;
}

export interface ToolbarMenuItemSlotClassNames {
  activeIndicator: string;
  wrapper: string;
  submenu: string;
}

class ToolbarMenuItem extends AutoControlledComponent<WithAsProp<ToolbarMenuItemProps>, ToolbarMenuItemState> {
  static displayName = 'ToolbarMenuItem';

  static className = 'ui-toolbar__menuitem';

  static slotClassNames: ToolbarMenuItemSlotClassNames = {
    activeIndicator: `${ToolbarMenuItem.className}__activeIndicator`,
    wrapper: `${ToolbarMenuItem.className}__wrapper`,
    submenu: `${ToolbarMenuItem.className}__submenu`
  };

  static create: ShorthandFactory<ToolbarMenuItemProps>;

  static propTypes = {
    ...commonPropTypes.createCommon(),
    active: PropTypes.bool,
    activeIndicator: customPropTypes.itemShorthandWithoutJSX,
    defaultMenuOpen: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: customPropTypes.itemShorthand,
    index: PropTypes.number,
    submenuIndicator: customPropTypes.itemShorthandWithoutJSX,
    inSubmenu: PropTypes.bool,
    menu: PropTypes.oneOfType([customPropTypes.itemShorthand, customPropTypes.collectionShorthand]),
    menuOpen: PropTypes.bool,
    onClick: PropTypes.func,
    onMenuOpenChange: PropTypes.func,
    popup: PropTypes.oneOfType([
      PropTypes.shape({
        ...Popup.propTypes,
        trigger: customPropTypes.never,
        children: customPropTypes.never
      }),
      PropTypes.string
    ]),
    wrapper: customPropTypes.itemShorthand
  };

  static defaultProps = {
    as: 'button',
    accessibility: toolbarMenuItemBehavior as Accessibility,
    activeIndicator: 'icon-checkmark',
    submenuIndicator: 'icon-menu-arrow-end',
    wrapper: { as: 'li' }
  };

  static autoControlledProps = ['menuOpen'];

  itemRef = React.createRef<HTMLElement>();
  menuRef = React.createRef<HTMLElement>() as React.MutableRefObject<HTMLElement>;

  actionHandlers = {
    performClick: event => {
      event.preventDefault();
      this.handleClick(event);
    },
    openMenu: event => this.openMenu(event),
    closeAllMenusAndFocusNextParentItem: event => this.closeAllMenus(event),
    closeMenu: event => this.closeMenu(event),
    closeMenuAndFocusTrigger: event => this.closeMenu(event),
    doNotNavigateNextParentItem: event => {
      event.stopPropagation();
    },
    closeAllMenus: event => this.closeAllMenus(event)
  };

  openMenu = (e: React.KeyboardEvent) => {
    const { menu } = this.props;
    const { menuOpen } = this.state;
    if (menu && !menuOpen) {
      this.trySetMenuOpen(true, e);
      e.stopPropagation();
      e.preventDefault();
    }
  };

  closeMenu = (e: React.KeyboardEvent) => {
    if (!this.isSubmenuOpen()) {
      return;
    }

    this.trySetMenuOpen(false, e, () => {
      focusAsync(this.itemRef.current);
    });

    e.stopPropagation();
  };

  closeAllMenus = (e: Event) => {
    if (!this.isSubmenuOpen()) {
      return;
    }
    const { inSubmenu } = this.props;
    this.trySetMenuOpen(false, e, () => {
      if (!inSubmenu) {
        focusAsync(this.itemRef.current);
      }
    });

    // avoid spacebar scrolling the page
    if (!inSubmenu) {
      e.preventDefault();
    }
  };

  isSubmenuOpen = (): boolean => {
    const { menu } = this.props;
    const { menuOpen } = this.state;

    return !!(menu && menuOpen);
  };

  trySetMenuOpen(newValue: boolean, e: Event | React.SyntheticEvent, onStateChanged?: any) {
    this.setState({ menuOpen: newValue });
    // The reason why post-effect is not passed as callback to trySetState method
    // is that in 'controlled' mode the post-effect is applied before final re-rendering
    // which cause a broken behavior: for e.g. when it is needed to focus submenu trigger on ESC.
    // TODO: all DOM post-effects should be applied at componentDidMount & componentDidUpdated stages.
    onStateChanged && onStateChanged();
    _.invoke(this.props, 'onMenuOpenChange', e, {
      ...this.props,
      menuOpen: newValue
    });
  }

  outsideClickHandler = (getRefs: GetRefs) => (e: MouseEvent) => {
    const isItemClick = doesNodeContainClick(this.itemRef.current, e, this.context.target);
    const isNestedClick = _.some(getRefs(), (childRef: NodeRef) => {
      return doesNodeContainClick(childRef.current as HTMLElement, e, this.context.target);
    });
    const isInside = isItemClick || isNestedClick;

    if (!isInside) {
      this.trySetMenuOpen(false, e);
    }
  };

  handleMenuOverrides = (getRefs: GetRefs) => (predefinedProps: ToolbarMenuProps) => ({
    onItemClick: (e, itemProps: ToolbarMenuItemProps) => {
      const { popup, menuOpen } = itemProps;
      _.invoke(predefinedProps, 'onItemClick', e, itemProps);
      if (popup) {
        return;
      }

      this.trySetMenuOpen(menuOpen, e);
      if (!menuOpen) {
        _.invoke(this.itemRef.current, 'focus');
      }
    }
  });

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, rtl }) {
    const { active, activeIndicator, children, content, disabled, submenuIndicator, icon, menu, popup, wrapper } = this.props;
    const { menuOpen } = this.state;

    const elementType = (
      <ElementType
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        disabled={disabled}
        className={classes.root}
        onClick={this.handleClick}
      >
        {childrenExist(children) ? (
          children
        ) : (
          <>
            {Icon.create(icon, {
              defaultProps: () => ({ xSpacing: !!content ? 'after' : 'none' })
            })}
            {content}
            {active &&
              Icon.create(activeIndicator, {
                defaultProps: () => ({
                  className: ToolbarMenuItem.slotClassNames.activeIndicator,
                  styles: styles.activeIndicator
                })
              })}
            {menu &&
              Icon.create(submenuIndicator, {
                defaultProps: () => ({
                  name: 'icon-menu-arrow-end',
                  styles: styles.submenuIndicator
                })
              })}
          </>
        )}
      </ElementType>
    );

    const hasChildren = childrenExist(children);

    if (popup && !hasChildren) {
      return Popup.create(popup, {
        defaultProps: () => ({
          trapFocus: true,
          onOpenChange: e => {
            e.stopPropagation();
          }
        }),
        overrideProps: {
          trigger: elementType,
          children: undefined // force-reset `children` defined for `Popup` as it collides with the `trigger`
        }
      });
    }

    const menuItemInner = hasChildren ? children : <Ref innerRef={this.itemRef}>{elementType}</Ref>;

    const maybeSubmenu =
      menu && menuOpen ? (
        <Unstable_NestingAuto>
          {(getRefs, nestingRef) => (
            <>
              <Ref
                innerRef={(node: HTMLElement) => {
                  nestingRef.current = node;
                  this.menuRef.current = node;
                }}
              >
                <Popper align="top" position={rtl ? 'before' : 'after'} targetRef={this.itemRef}>
                  {ToolbarMenu.create(menu, {
                    defaultProps: () => ({
                      className: ToolbarMenuItem.slotClassNames.submenu,
                      styles: styles.menu,
                      submenu: true,
                      submenuIndicator
                    }),
                    overrideProps: this.handleMenuOverrides(getRefs)
                  })}
                </Popper>
              </Ref>
              <EventListener listener={this.outsideClickHandler(getRefs)} target={this.context.target} type="click" />
            </>
          )}
        </Unstable_NestingAuto>
      ) : null;

    if (!wrapper) {
      return menuItemInner;
    }

    return Box.create(wrapper, {
      defaultProps: () => ({
        className: cx(ToolbarMenuItem.slotClassNames.wrapper, classes.wrapper),
        ...accessibility.attributes.wrapper,
        ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.wrapper, wrapper)
      }),
      overrideProps: () => ({
        children: (
          <>
            {menuItemInner}
            {maybeSubmenu}
          </>
        )
      })
    });
  }

  handleClick = (e: React.MouseEvent) => {
    const { disabled, menu, popup } = this.props;

    if (disabled) {
      e.preventDefault();
      return;
    }

    if (menu) {
      // the menuItem element was clicked => toggle the open/close and stop propagation
      this.trySetMenuOpen(!this.state.menuOpen, e);
      e.stopPropagation();
      e.preventDefault();
    }

    if (popup) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    _.invoke(this.props, 'onClick', e, this.props);
  };
}

ToolbarMenuItem.create = createShorthandFactory({
  Component: ToolbarMenuItem,
  mappedProp: 'content'
});

/**
 * A ToolbarMenuItem renders ToolbarMenu item as button.
 */
export default withSafeTypeForAs<typeof ToolbarMenuItem, ToolbarMenuItemProps, 'button'>(ToolbarMenuItem);
