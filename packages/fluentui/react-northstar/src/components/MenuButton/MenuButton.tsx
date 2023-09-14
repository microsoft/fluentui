import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import { Accessibility, menuButtonBehavior, MenuButtonBehaviorProps } from '@fluentui/accessibility';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';

import { commonPropTypes, StyledComponentProps, getOrGenerateIdFromShorthand } from '../../utils';
import { ShorthandValue, ComponentEventHandler, ShorthandCollection, FluentComponentStaticProps } from '../../types';

import { createShorthandFactory } from '../../utils/factories';
import { Popup, PopupProps, PopupEvents, PopupEventsArray } from '../Popup/Popup';
import { Menu, MenuProps } from '../Menu/Menu';
import { MenuItemProps } from '../Menu/MenuItem';
import { focusMenuItem } from './focusUtils';
import { ALIGNMENTS, POSITIONS, PositioningProps, AutoSize, AUTOSIZES } from '../../utils/positioner';
import {
  useAccessibility,
  useTelemetry,
  getElementType,
  useUnhandledProps,
  useFluentContext,
  useAutoControlled,
  useStyles,
  useOnIFrameFocus,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface MenuButtonSlotClassNames {
  menu: string;
}

export interface MenuButtonProps extends StyledComponentProps<MenuButtonProps>, PositioningProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default menuButtonBehavior
   */
  accessibility?: Accessibility<MenuButtonBehaviorProps>;

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

export type MenuButtonStylesProps = never;

/**
 * A MenuButton displays a menu connected to trigger element.
 * @accessibility
 */
export const MenuButton = React.forwardRef<HTMLDivElement, MenuButtonProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(MenuButton.displayName, context.telemetry);
  setStart();

  const {
    // MenuButton props:
    contextMenu,
    menu,
    // Popup props:
    accessibility,
    align,
    className,
    defaultOpen,
    flipBoundary,
    mountNode,
    mouseLeaveDelay,
    offset,
    on,
    onOpenChange,
    overflowBoundary,
    pointing,
    popperRef,
    position,
    positionFixed,
    tabbableTrigger,
    target,
    trigger,
    unstable_disableTether,
    unstable_pinned,
    autoSize,
    variables,
  } = props;

  const [open, setOpen] = useAutoControlled({
    defaultValue: props.defaultOpen,
    value: props.open,
    initialValue: false,
  });

  useOnIFrameFocus(open, context.target, (e: Event) => {
    setOpen(__ => {
      _.invoke(props, 'onOpenChange', e, { ...props, ...{ open: false } });
      return false;
    });
  });

  const menuId = React.useRef<string>();
  menuId.current = getOrGenerateIdFromShorthand('menubutton-menu-', menu, menuId.current);
  const triggerId = React.useRef<string>();
  triggerId.current = getOrGenerateIdFromShorthand('menubutton-trigger-', trigger, triggerId.current);

  const triggerRef = React.useRef<HTMLElement>();
  const menuRef = React.useRef<HTMLElement>();

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(MenuButton.handledProps, props);

  const getA11yProps = useAccessibility<MenuButtonBehaviorProps>(accessibility, {
    debugName: MenuButton.displayName,
    actionHandlers: {
      closeMenu: e => closeMenu(e),
      openAndFocusFirst: e => openAndFocus(e, 'first'),
      openAndFocusLast: e => openAndFocus(e, 'last'),
    },
    mapPropsToBehavior: () => ({
      menuId: menuId.current,
      triggerId: triggerId.current,
      open,
      trigger: props.trigger,
      contextMenu,
      on,
      tabbableTrigger,
    }),
    rtl: context.rtl,
  });

  const popupProps: PopupProps = {
    accessibility,
    align,
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
    popperRef,
    position,
    positionFixed,
    tabbableTrigger,
    target,
    trigger,
    unstable_disableTether,
    unstable_pinned,
    autoSize,
  };

  const { classes, styles: resolvedStyles } = useStyles<MenuButtonStylesProps>(MenuButton.displayName, {
    className: menuButtonClassName,
    mapPropsToInlineStyles: () => ({
      className,
      styles: props.styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const closeMenu = (e: React.KeyboardEvent) => {
    handleOpenChange(e, false);
  };

  const openAndFocus = (e: React.KeyboardEvent, which: 'first' | 'last') => {
    e.preventDefault();
    handleOpenChange(e, true, () => menuRef.current && focusMenuItem(menuRef.current, which));
  };

  const handleOpenChange = (e: React.SyntheticEvent, open: boolean, callback?: () => void) => {
    _.invoke(props, 'onOpenChange', e, { ...props, open });
    setOpen(open);
    callback && callback();
  };

  const handleMenuOverrides = (predefinedProps: MenuProps) => ({
    onItemClick: (e: React.SyntheticEvent, itemProps: MenuItemProps) => {
      _.invoke(predefinedProps, 'onItemClick', e, itemProps);
      _.invoke(props, 'onMenuItemClick', e, itemProps);
      if (!itemProps || !itemProps.menu) {
        // do not close if clicked on item with submenu
        handleOpenChange(e, false);
      }
    },
    onKeyDown: (e: React.KeyboardEvent, itemProps: MenuItemProps) => {
      _.invoke(predefinedProps, 'onKeyDown', e, itemProps);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.stopPropagation();
      }
    },
  });

  const content = Menu.create(menu, {
    defaultProps: () =>
      getA11yProps('menu', {
        vertical: true,
        className: menuButtonSlotClassNames.menu,
      }),
    overrideProps: handleMenuOverrides,
  });

  const overrideProps: PopupProps = {
    accessibility: getA11yProps.unstable_behaviorDefinition,
    open,
    onOpenChange: (e, { open }) => {
      handleOpenChange(e, open);
    },
    content: {
      styles: resolvedStyles.popupContent,
      content: content && <Ref innerRef={menuRef}>{content}</Ref>,
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
    setEnd();
    return popup;
  }

  const element = getA11yProps.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11yProps('root', {
        ref,
        className: classes.root,
        ...unhandledProps,
      })}
    >
      <Ref innerRef={triggerRef}>{popup}</Ref>
    </ElementType>,
  );
  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, MenuButtonProps> & FluentComponentStaticProps<MenuButtonProps>;

MenuButton.displayName = 'MenuButton';

MenuButton.propTypes = {
  ...commonPropTypes.createCommon({
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
  ]) as any,
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
  popperRef: customPropTypes.ref,
  position: PropTypes.oneOf(POSITIONS),
  positionFixed: PropTypes.bool,
  target: PropTypes.any,
  trigger: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.any]),
  tabbableTrigger: PropTypes.bool,
  unstable_disableTether: PropTypes.oneOf([true, false, 'all']),
  unstable_pinned: PropTypes.bool,
  autoSize: PropTypes.oneOf<AutoSize>(AUTOSIZES),
  menu: PropTypes.oneOfType([
    customPropTypes.itemShorthandWithoutJSX,
    PropTypes.arrayOf(customPropTypes.itemShorthandWithoutJSX),
  ]),
  contextMenu: PropTypes.bool,
};

MenuButton.defaultProps = {
  accessibility: menuButtonBehavior,
  align: 'start',
  position: 'below',
};

MenuButton.handledProps = Object.keys(MenuButton.propTypes) as any;

MenuButton.create = createShorthandFactory({ Component: MenuButton, mappedProp: 'menu' });
