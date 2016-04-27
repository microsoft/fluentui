import * as React from 'react';
import FocusZone from '../../utilities/focus/FocusZone';
import './ContextualMenu.scss';
import KeyCodes from '../../utilities/KeyCodes';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import { css } from '../../utilities/css';
import { getRTL } from '../../utilities/rtl';
import Async from '../../utilities/Async/Async';
import { IContextualMenuProps, IContextualMenuItem } from './ContextualMenu.Props';
import { getRelativePositions, IPositionInfo } from '../../utilities/positioning';
import { DirectionalHint } from '../Callout/index';

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
const OFF_SCREEN_POSITION = { top: 0, left: -9999 };

export interface IContextualMenuState {
  expandedMenuItemKey?: string;
  dismissedMenuItemKey?: string;
  contextualMenuItems?: IContextualMenuItem[];
  contextualMenuTarget?: HTMLElement;
  beakStyle?: any;
  submenuProps?: IContextualMenuProps;
  positions?: any;
  slideDirectionalClassName?: string;
  subMenuId?: string;
}

enum ContextualMenuType {
  vertical,
  horizontal
}

enum HorizontalAlignmentHint {
  auto,
  left,
  center,
  right
}

enum VerticalAlignmentHint {
  top,
  center,
  bottom
}

interface IMenuSizeWindowSizeInfo {
  hostRect: IRect;
  targetRect: IRect;
  menuRect: IRect;
  windowSize: any;
  gapSpace: number;
}

interface IRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

interface IParsedDirectionalHint {
  contextualMenuType: ContextualMenuType;
  horizontalAlignmentHint: HorizontalAlignmentHint;
  verticalAlignmentHint: VerticalAlignmentHint;
};

let _instance = 0;

export default class ContextualMenu extends React.Component<IContextualMenuProps, IContextualMenuState> {
  // The default ContextualMenu properities have no items and beak, the default submenu direction is right and top.
  public static defaultProps = {
    items: [],
    shouldFocusOnMount: true,
    isBeakVisible: false,
    gapSpace: 0,
    directionalHint: DirectionalHint.rightBottomEdge,
    beakWidth: 16
  };

  public refs: {
    [key: string]: React.ReactInstance;
    focusZone: FocusZone;
    host: HTMLElement;
    menu: HTMLElement;
  };

  private _previousActiveElement: HTMLElement;
  private _isFocusingPreviousElement: boolean;
  private _didSetInitialFocus: boolean;
  private _enterTimerId: number;
  private _events: EventGroup;
  private _async: Async;

  constructor(props: IContextualMenuProps) {
    super(props);

    this.state = {
      contextualMenuItems: null,
      subMenuId: 'ContextualMenu-SubMenu-' + _instance++
    };

    this._isFocusingPreviousElement = false;
    this._didSetInitialFocus = false;
    this._enterTimerId = 0;
    this._events = new EventGroup(this);
    this._async = new Async(this);

    this._updatePosition = this._updatePosition.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onMouseDownCapture = this._onMouseDownCapture.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
    this._onSubMenuDismiss = this._onSubMenuDismiss.bind(this);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
  }

  public dismiss(ev?: any) {
    let { onDismiss } = this.props;

    if (onDismiss) {
      onDismiss(ev);
    }
  }

  // Invoked once, both on the client and server, immediately before the initial rendering occurs.
  public componentWillMount() {
    this._previousActiveElement = document.activeElement as HTMLElement;
  }

  // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
  public componentDidMount() {
    this._updatePosition();
    this._events.on(window, 'scroll', this.dismiss, true);
    this._events.on(window, 'resize', this.dismiss);
    this._events.on(window, 'mousedown', this._onMouseDownCapture, true);
    this._events.on(window, 'touchstart', this._onMouseDownCapture, true);
  }

  // Invoked when a component is receiving new props.
  public componentWillReceiveProps(newProps: IContextualMenuProps, newState: IContextualMenuState) {
    if (newProps.targetElement !== this.props.targetElement) {
      this._didSetInitialFocus = false;
    }
  }

  // Invoked immediately after the component's updates are flushed to the DOM.
  public componentDidUpdate() {
    if (!this._didSetInitialFocus && this.props.shouldFocusOnMount) {
      let { focusZone } = this.refs;

      if (focusZone) {
        focusZone.focus();
        this._didSetInitialFocus = true;
      }
    }
    this._updatePosition();
  }

  // Invoked immediately before a component is unmounted from the DOM.
  public componentWillUnmount() {
    if (this._isFocusingPreviousElement && this._previousActiveElement) {
      this._previousActiveElement.focus();
    }
    this._events.dispose();
    this._async.dispose();
  }

  public render() {
    let { className, items, isBeakVisible, labelElementId, targetElement, id } = this.props;
    let { submenuProps, positions, slideDirectionalClassName } = this.state;

    let hasIcons = !!(items && items.some(item => !!item.icon));
    let hasCheckmarks = !!(items && items.some(item => !!item.canCheck));

    return (
      <div ref='host' id={ id } className={ css('ms-ContextualMenu-container', className) }>
        { (items && items.length) ? (
          <FocusZone
            className={ 'ms-ContextualMenu is-open' + ((slideDirectionalClassName) ? (` ms-u-${slideDirectionalClassName}`) : '') }
            ref='focusZone'
            role='menu'
            ariaLabelledBy={ labelElementId }
            style={ ((positions) ? positions.menu : OFF_SCREEN_POSITION) }
            >
            { isBeakVisible && targetElement ? (<div className='ms-ContextualMenu-beak'  style={ ((positions) ? positions.beak : BEAK_ORIGIN_POSITION) } />) : (null) }
            <ul className='ms-ContextualMenu-list is-open ' onKeyDown={ this._onKeyDown } ref='menu'>
              { items.map((item, index) => (
                // If the item name is equal to '-', a divider will be generated.
                item.name === '-' ? (
                  <li
                    key={ item.key || index }
                    className={ css('ms-ContextualMenu-item ms-ContextualMenu-item--divider', item.className ) }/>
                ) : (
                    <li
                      key={ item.key || index }
                      className={ css('ms-ContextualMenu-item', item.className ) }
                      ref={ item.key }>
                        { this._renderMenuItem(item, index, hasCheckmarks, hasIcons) }
                    </li>
                  )
              )) }
            </ul>
          </FocusZone>
        ) : (null) }
        { submenuProps ? ( // If a submenu properities exists, the submenu will be rendered.
          <ContextualMenu { ...submenuProps } />
        ) : (null) }
      </div>
    );
  }

  private _renderMenuItem(item: IContextualMenuItem, index: number, hasCheckmarks: boolean, hasIcons: boolean) {
    let { expandedMenuItemKey, subMenuId } = this.state;

    if (item.onRender) {
      return item.onRender(item);
    }

    return React.createElement(
            item.href ? 'a' : 'button',
             { className: css('ms-ContextualMenu-link', { 'is-expanded': (expandedMenuItemKey === item.key) }),
               onClick: item.onClick || (item.items && item.items.length) ? this._onItemClick.bind(this, item) : null,
               onKeyDown: item.items && item.items.length ? this._onItemKeyDown.bind(this, item) : null,
               onMouseEnter: item.items && item.items.length ? this._onMouseEnter.bind(this, item) : null,
               onMouseLeave: this._onMouseLeave,
               disabled: item.isDisabled,
               dataCommandKey: index,
               role: 'menuitem',
               href: item.href,
               'aria-haspopup': item.items && item.items.length ? true : null,
               'aria-owns': item.key === expandedMenuItemKey ? subMenuId : null },
             this._renderMenuItemChildren(item, index, hasCheckmarks, hasIcons));
  }

  private _renderMenuItemChildren(item: IContextualMenuItem, index: number, hasCheckmarks: boolean, hasIcons: boolean) {
    return <div>
            {(hasCheckmarks) ? (
               <span
                 className={
                   css('ms-ContextualMenu-checkmark', {'ms-Icon ms-Icon--check': item.isChecked, 'not-selected': !item.isChecked})
                  }
                 onClick={ this._onItemClick.bind(this, item) } />
             ) : (null) }
             {(hasIcons) ? (
               <span className={ 'ms-ContextualMenu-icon' + ((item.icon) ? ` ms-Icon ms-Icon--${item.icon}` : ' no-icon') }/>
             ) : (null)}
             <span className='ms-ContextualMenu-itemText ms-font-m ms-font-weight-regular'>{ item.name }</span>
             {(item.items && item.items.length) ? (
               <i className={ css('ms-ContextualMenu-chevronRight ms-Icon', getRTL() ? 'ms-Icon--chevronLeft' : 'ms-Icon--chevronRight') } />
             ) : (null)}
           </div>;
  }

  private _onKeyDown(ev: React.KeyboardEvent) {
    let submenuCloseKey = getRTL() ? KeyCodes.right : KeyCodes.left;
    if (ev.which === KeyCodes.escape
      || (ev.which === submenuCloseKey && this.props.isSubMenu)) {
      // When a user presses escape, we will try to refocus the previous focused element.
      this._isFocusingPreviousElement = true;
      this.dismiss(ev);
    }
  }

  private _onMouseEnter(item: any, ev: React.MouseEvent) {
    let targetElement = ev.currentTarget as HTMLElement;

    this._enterTimerId = this._async.setTimeout(() => this._onSubMenuExpand(item, targetElement), 500);
  }

  private _onMouseLeave(ev: React.MouseEvent) {
    this._async.clearTimeout(this._enterTimerId);
  }

  private _onMouseDownCapture(ev: React.MouseEvent) {
    if (!this.refs.host.contains(ev.target as HTMLElement)) {
      this.dismiss(ev);
    }
  }

  private _onItemClick(item: any, ev: MouseEvent) {
    if (!item.items || !item.items.length) { // This is an item without a menu. Click it.
      if (item.onClick) {
        item.onClick(item, ev);
      }
      this.dismiss(ev);
    } else {
      if (item.key === this.state.dismissedMenuItemKey) { // This has an expanded sub menu. collapse it.
        this._onSubMenuDismiss(ev);
      } else { // This has a collapsed sub menu. Expand it.
        this._onSubMenuExpand(item, ev.currentTarget as HTMLElement);
      }
    }

    ev.stopPropagation();
    ev.preventDefault();
  }

  private _onItemKeyDown(item: any, ev: KeyboardEvent) {
    let openKey = getRTL() ? KeyCodes.left : KeyCodes.right;
    if (ev.which === openKey) {
      this._onSubMenuExpand(item, ev.currentTarget as HTMLElement);
    }
  }

  private _onSubMenuExpand(item: any, target: HTMLElement) {
    this.setState({
      expandedMenuItemKey: item.key,
      submenuProps: {
        items: item.items,
        targetElement: target,
        onDismiss: this._onSubMenuDismiss,
        isSubMenu: true,
        id: this.state.subMenuId
      }
    });
  }

  private _onSubMenuDismiss(ev?: any) {
    let itemKey = null;
    let list = this.refs[this.state.expandedMenuItemKey] as HTMLElement;

    if (list && list.contains(ev.target as HTMLElement)) {
      itemKey = this.state.expandedMenuItemKey;
    }
    this.setState({
      dismissedMenuItemKey: itemKey,
      expandedMenuItemKey: null,
      submenuProps: null
    });
  }

  private _updatePosition() {
    let { positions } = this.state;
    let hostElement: HTMLElement = this.refs.host;
    let menuElement: HTMLElement = this.refs.menu;

    if (hostElement && menuElement) {
      let positionInfo: IPositionInfo = getRelativePositions(this.props, hostElement, menuElement);

      // Set the new position only when the positions are not exists or one of the new callout positions are different
      if ((!positions && positionInfo) ||
        (positions && positionInfo && (positions.menu.top !== positionInfo.calloutPosition.top || positions.menu.left !== positionInfo.calloutPosition.left))) {
        this.setState({
          positions: {
            menu: positionInfo.calloutPosition,
            beak: positionInfo.beakPosition,
          },
          slideDirectionalClassName: positionInfo.directionalClassName
        });
      }
    }
  }
}
