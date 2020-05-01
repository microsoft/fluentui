import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import { Accessibility, menuButtonBehavior } from '@fluentui/accessibility';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';

import {
  AutoControlledComponent,
  RenderResultConfig,
  applyAccessibilityKeyHandlers,
  getOrGenerateIdFromShorthand,
  commonPropTypes,
  StyledComponentProps,
} from '../../utils';
import { ShorthandValue, ComponentEventHandler, ShorthandCollection } from '../../types';

import { createShorthandFactory, ShorthandFactory } from '../../utils/factories';
import Popup, { PopupProps, PopupEvents, PopupEventsArray } from '../Popup/Popup';
import Menu, { MenuProps } from '../Menu/Menu';
import { MenuItemProps } from '../Menu/MenuItem';
import { focusMenuItem } from './focusUtils';
import { ALIGNMENTS, POSITIONS, PositioningProps } from '../../utils/positioner';

export interface MenuButtonSlotClassNames {
  menu: string;
}

export interface MenuButtonProps extends StyledComponentProps<MenuButtonProps>, PositioningProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default menuButtonBehavior
   */
  accessibility?: Accessibility;

  /** Additional CSS class name(s) to apply.  */
  className?: string;

  /** Initial value for 'open'. */
  defaultOpen?: boolean;

  /** Existing element the popup should be bound to. */
  mountNode?: HTMLElement;

  /** Delay in ms for the mouse leave event, before the popup will be closed. */
  mouseLeaveDelay?: number;

  /** Events triggering the popup. */
  on?: PopupEvents | PopupEventsArray;

  /** Defines whether popup is displayed. */
  open?: boolean;

  /**
   * Called after user's click on a menu item.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onMenuItemClick?: ComponentEventHandler<MenuItemProps>;

  /**
   * Event for request to change 'open' value.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onOpenChange?: ComponentEventHandler<PopupProps>;

  /** A popup can show a pointer to trigger. */
  pointing?: boolean;

  /**
   * DOM element that should be used as popup's target - instead of 'trigger' element that is used by default.
   */
  target?: HTMLElement;

  /** Element to be rendered in-place where the popup is defined. */
  trigger?: JSX.Element;

  /** Whether the trigger should be tabbable */
  tabbableTrigger?: boolean;

  /** Shorthand for menu configuration */
  menu?: ShorthandValue<MenuProps> | ShorthandCollection<MenuItemProps>;

  /** Determines if the MenuButton behaves as context menu */
  contextMenu?: boolean;
}

export interface MenuButtonState {
  open: boolean;
  menuId: string;
  triggerId: string;
}

export const menuButtonClassName = 'ui-menubutton';
export const menuButtonSlotClassNames: MenuButtonSlotClassNames = {
  menu: `${menuButtonClassName}__menu`,
};

/**
 * A MenuButton displays a menu connected to trigger element.
 * @accessibility
 */
export default class MenuButton extends AutoControlledComponent<MenuButtonProps, MenuButtonState> {
  static displayName = 'MenuButton';

  static deprecated_className = menuButtonClassName;

  static create: ShorthandFactory<MenuButtonProps>;

  static propTypes = {
    ...commonPropTypes.createCommon({
      as: true,
      content: false,
    }),
    align: PropTypes.oneOf(ALIGNMENTS),
    defaultOpen: PropTypes.bool,
    mountNode: customPropTypes.domNode,
    mouseLeaveDelay: PropTypes.number,
    offset: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.number) as PropTypes.Requireable<[number, number]>,
    ]),
    on: PropTypes.oneOfType([
      PropTypes.oneOf(['hover', 'click', 'focus', 'context']),
      PropTypes.arrayOf(PropTypes.oneOf(['click', 'focus', 'context'])),
      PropTypes.arrayOf(PropTypes.oneOf(['hover', 'focus', 'context'])),
    ]),
    flipBoundary: PropTypes.oneOfType([
      PropTypes.object as PropTypes.Requireable<HTMLElement>,
      PropTypes.arrayOf(PropTypes.object) as PropTypes.Requireable<HTMLElement[]>,
      PropTypes.oneOf<'clippingParents' | 'window' | 'scrollParent'>(['clippingParents', 'window', 'scrollParent']),
    ]),
    overflowBoundary: PropTypes.oneOfType([
      PropTypes.object as PropTypes.Requireable<HTMLElement>,
      PropTypes.arrayOf(PropTypes.object) as PropTypes.Requireable<HTMLElement[]>,
      PropTypes.oneOf<'clippingParents' | 'window' | 'scrollParent'>(['clippingParents', 'window', 'scrollParent']),
    ]),
    open: PropTypes.bool,
    onMenuItemClick: PropTypes.func,
    onOpenChange: PropTypes.func,
    position: PropTypes.oneOf(POSITIONS),
    positionFixed: PropTypes.bool,
    target: PropTypes.any,
    trigger: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.any]),
    tabbableTrigger: PropTypes.bool,
    unstable_pinned: PropTypes.bool,
    menu: PropTypes.oneOfType([
      customPropTypes.itemShorthandWithoutJSX,
      PropTypes.arrayOf(customPropTypes.itemShorthandWithoutJSX),
    ]),
    contextMenu: PropTypes.bool,
  };

  static defaultProps: MenuButtonProps = {
    accessibility: menuButtonBehavior,
    align: 'start',
    position: 'below',
  };

  static autoControlledProps = ['open'];

  static getAutoControlledStateFromProps(props: MenuButtonProps, state: MenuButtonState): Partial<MenuButtonState> {
    return {
      menuId: getOrGenerateIdFromShorthand('menubutton-menu-', props.menu, state.menuId),
      triggerId: getOrGenerateIdFromShorthand('menubutton-trigger-', props.trigger, state.triggerId),
    };
  }

  triggerRef = React.createRef<HTMLElement>();
  menuRef = React.createRef<HTMLElement>();

  actionHandlers = {
    closeMenu: e => this.closeMenu(e),
    openAndFocusFirst: e => this.openAndFocus(e, 'first'),
    openAndFocusLast: e => this.openAndFocus(e, 'last'),
  };

  closeMenu(e: React.KeyboardEvent) {
    this.handleOpenChange(e, false);
  }

  openAndFocus(e: React.KeyboardEvent, which: 'first' | 'last') {
    e.preventDefault();
    this.handleOpenChange(e, true, () => focusMenuItem(this.menuRef.current, which));
  }

  handleOpenChange = (e: React.SyntheticEvent, open: boolean, callback?: () => void) => {
    _.invoke(this.props, 'onOpenChange', e, { ...this.props, open });
    this.setState({ open }, callback);
  };

  handleMenuOverrides = (predefinedProps?: MenuProps) => ({
    onItemClick: (e: React.SyntheticEvent, itemProps: MenuItemProps) => {
      _.invoke(predefinedProps, 'onItemClick', e, itemProps);
      _.invoke(this.props, 'onMenuItemClick', e, itemProps);
      if (!itemProps || !itemProps.menu) {
        // do not close if clicked on item with submenu
        this.handleOpenChange(e, false);
      }
    },
  });

  renderComponent({
    ElementType,
    classes,
    unhandledProps,
    accessibility,
    styles,
  }: RenderResultConfig<MenuButtonProps>): React.ReactNode {
    const {
      // MenuButton props:
      contextMenu,
      menu,
      // Popup props:
      accessibility: accessibilityProp,
      align,
      className,
      defaultOpen,
      flipBoundary,
      mountNode,
      mouseLeaveDelay,
      offset,
      on,
      onOpenChange,
      open,
      overflowBoundary,
      pointing,
      position,
      positionFixed,
      tabbableTrigger,
      styles: stylesProp,
      target,
      trigger,
      unstable_pinned,
      variables,
    } = this.props;

    const popupProps = {
      accessibility: accessibilityProp,
      align,
      className,
      defaultOpen,
      mountNode,
      mouseLeaveDelay,
      flipBoundary,
      offset,
      on,
      onOpenChange,
      open,
      overflowBoundary,
      pointing,
      position,
      positionFixed,
      tabbableTrigger,
      styles: stylesProp,
      target,
      trigger,
      unstable_pinned,
      variables,
    };

    const content = Menu.create(menu, {
      defaultProps: () => ({
        ...accessibility.attributes.menu,
        vertical: true,
        className: menuButtonSlotClassNames.menu,
      }),
      overrideProps: this.handleMenuOverrides,
    });

    const overrideProps: PopupProps = {
      accessibility: () => accessibility,
      open: this.state.open,
      onOpenChange: (e, { open }) => {
        this.handleOpenChange(e, open);
      },
      content: {
        styles: styles.popupContent,
        content: content && <Ref innerRef={this.menuRef}>{content}</Ref>,
      },
      children: undefined, // force-reset `children` defined for `Popup` as it collides with the `trigger
      ...(contextMenu
        ? {
            on: 'context',
            trapFocus: true,
            tabbableTrigger: false,
          }
        : {
            inline: true,
            autoFocus: true,
          }),
    };

    const popup = Popup.create(popupProps, { overrideProps });

    if (contextMenu) {
      return popup;
    }

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        <Ref innerRef={this.triggerRef}>{popup}</Ref>
      </ElementType>
    );
  }
}

MenuButton.create = createShorthandFactory({ Component: MenuButton, mappedProp: 'menu' });
