import * as React from 'react';
import { IContextualMenuProps, IContextualMenuItem } from './ContextualMenu.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { KeyCodes } from '../../utilities/KeyCodes';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { css } from '../../utilities/css';
import { getRTL } from '../../utilities/rtl';
import { getId } from '../../utilities/object';
import { Async } from '../../utilities/Async/Async';
import { Callout } from '../../Callout';
import './ContextualMenu.scss';

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
  submenuDirection?: DirectionalHint;
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
}

export class ContextualMenu extends React.Component<IContextualMenuProps, IContextualMenuState> {
  // The default ContextualMenu properities have no items and beak, the default submenu direction is right and top.
  public static defaultProps = {
    items: [],
    shouldFocusOnMount: true,
    isBeakVisible: false,
    gapSpace: 0,
    directionalHint: DirectionalHint.rightBottomEdge,
    beakWidth: 16
  };

  private _host: HTMLElement;
  private _previousActiveElement: HTMLElement;
  private _isFocusingPreviousElement: boolean;
  private _didSetInitialFocus: boolean;
  private _enterTimerId: number;
  private _events: EventGroup;
  private _async: Async;
  private _focusZone: FocusZone;

  constructor(props: IContextualMenuProps) {
    super(props);

    this.state = {
      contextualMenuItems: null,
      subMenuId: getId('ContextualMenu')
    };

    this._isFocusingPreviousElement = false;
    this._didSetInitialFocus = false;
    this._enterTimerId = 0;
    this._events = new EventGroup(this);
    this._async = new Async(this);

    this.dismiss = this.dismiss.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
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
    this._events.on(window, 'resize', this.dismiss);
  }

  // Invoked when a component is receiving new props.
  public componentWillReceiveProps(newProps: IContextualMenuProps, newState: IContextualMenuState) {
    if (newProps.targetElement !== this.props.targetElement) {
      this._didSetInitialFocus = false;
    }
  }

  // Invoked immediately before a component is unmounted from the DOM.
  public componentWillUnmount() {
    if (this._isFocusingPreviousElement && this._previousActiveElement) {

      // This slight delay is required so that we can unwind the stack, let react try to mess with focus, and then
      // apply the correct focus. Without the setTimeout, we end up focusing the correct thing, and then React wants
      // to reset the focus back to the thing it thinks should have been focused.
      setTimeout(() => this._previousActiveElement.focus(), 0);
    }

    this._events.dispose();
    this._async.dispose();
  }

  public render() {
    let { className,
          items,
          isBeakVisible,
          labelElementId,
          targetElement,
          id,
          targetPoint,
          useTargetPoint,
          beakWidth,
          directionalHint,
          gapSpace,
          isSubMenu,
          coverTarget } = this.props;

    let { submenuProps } = this.state;

    let hasIcons = !!(items && items.some(item => !!item.icon));
    let hasCheckmarks = !!(items && items.some(item => !!item.canCheck));

    return (
      <Callout
        targetElement={ targetElement }
        targetPoint={ targetPoint }
        useTargetPoint={ useTargetPoint }
        isBeakVisible={ isBeakVisible }
        beakWidth={ beakWidth }
        directionalHint={ directionalHint }
        gapSpace={ gapSpace }
        doNotLayer={ isSubMenu }
        coverTarget={ coverTarget }
        beakStyle='ms-Callout-smallbeak'
        className='ms-ContextualMenu-Callout'
        onLayerMounted={ () => this._tryFocus(this._focusZone) }
        onDismiss={ this.props.onDismiss }>
        <div ref={ (host: HTMLDivElement) => this._host = host} id={ id } className={ css('ms-ContextualMenu-container', className) }>
          { (items && items.length) ? (
            <FocusZone
              className={ 'ms-ContextualMenu is-open' }
              direction={ FocusZoneDirection.vertical }
              ariaLabelledBy={ labelElementId }
              ref={ (focusZone) => this._focusZone = focusZone }
              rootProps={ { role: 'menu' } }
              >
              <ul className='ms-ContextualMenu-list is-open' onKeyDown={ this._onKeyDown }>
                { items.map((item, index) => (
                  // If the item name is equal to '-', a divider will be generated.
                  item.name === '-' ? (
                    <li
                      role='separator'
                      key={ item.key || index }
                      className={ css('ms-ContextualMenu-divider', item.className ) }/>
                  ) : (
                      <li
                        role='menuitem'
                        title={ item.title }
                        key={ item.key || index }
                        className={ css('ms-ContextualMenu-item', item.className ) }>
                          { this._renderMenuItem(item, index, hasCheckmarks, hasIcons) }
                      </li>
                    )
                )) }
              </ul>
            </FocusZone>
          ) : (null) }
          { submenuProps ? ( // If a submenu properities exists, the submenu will be rendered.
            <ContextualMenu { ...submenuProps }/>
          ) : (null) }
        </div>
      </Callout>
    );
  }

  private _renderMenuItem(item: IContextualMenuItem, index: number, hasCheckmarks: boolean, hasIcons: boolean) {
    let { expandedMenuItemKey, subMenuId } = this.state;

    if (item.onRender) {
      return item.onRender(item);
    }

    return React.createElement(
            'button',
             { className: css('ms-ContextualMenu-link', { 'is-expanded': (expandedMenuItemKey === item.key) }),
               onClick: item.onClick || (item.items && item.items.length) ? this._onItemClick.bind(this, item) : item.href ? () => { location.href = item.href; } : null,
               onKeyDown: item.items && item.items.length ? this._onItemKeyDown.bind(this, item) : null,
               onMouseEnter: this._onMouseEnter.bind(this, item),
               onMouseLeave: this._onMouseLeave,
               onMouseDown: (ev: any) => this._onItemMouseDown(item, ev),
               disabled: item.isDisabled,
               dataCommandKey: index,
               role: 'menuitem',
               href: item.href,
               'aria-haspopup': item.items && item.items.length ? true : null,
               'aria-owns': item.key === expandedMenuItemKey ? subMenuId : null },
             this._renderMenuItemChildren(item, index, hasCheckmarks, hasIcons));
  }

  private _renderMenuItemChildren(item: IContextualMenuItem, index: number, hasCheckmarks: boolean, hasIcons: boolean) {
    return (
      <div>
        {(hasCheckmarks) ? (
          <span
            className={
              css('ms-ContextualMenu-checkmark', {'ms-Icon ms-Icon--CheckMark': item.isChecked, 'not-selected': !item.isChecked})
            }
            onClick={ this._onItemClick.bind(this, item) } />
        ) : (null) }
        {(hasIcons) ? (
          <span className={ 'ms-ContextualMenu-icon' + ((item.icon) ? ` ms-Icon ms-Icon--${item.icon}` : ' no-icon') }/>
        ) : (null)}
        <span className='ms-ContextualMenu-itemText ms-fontWeight-regular'>{ item.name }</span>
        {(item.items && item.items.length) ? (
          <i className={ css('ms-ContextualMenu-submenuChevron ms-Icon', getRTL() ? 'ms-Icon--ChevronLeft' : 'ms-Icon--ChevronRight') } />
        ) : (null)}
      </div>
    );
  }

  private _tryFocus(focusZone: FocusZone) {
    if (focusZone && this.props.shouldFocusOnMount) {
      focusZone.focus();
    }
  }

  private _onKeyDown(ev: React.KeyboardEvent) {
    let submenuCloseKey = getRTL() ? KeyCodes.right : KeyCodes.left;

    if (ev.which === KeyCodes.escape
      || ev.which === KeyCodes.tab
      || (ev.which === submenuCloseKey && this.props.isSubMenu)) {
      // When a user presses escape, we will try to refocus the previous focused element.
      this._isFocusingPreviousElement = true;
      ev.preventDefault();
      ev.stopPropagation();
      this.dismiss(ev);
    }
  }

  private _onMouseEnter(item: any, ev: React.MouseEvent) {
    let targetElement = ev.currentTarget as HTMLElement;

    if (item.key !== this.state.expandedMenuItemKey) {
      if (item.items && item.items.length) {
        this._enterTimerId = this._async.setTimeout(() => this._onSubMenuExpand(item, targetElement), 500);
      } else {
        this._enterTimerId = this._async.setTimeout(() => this._onSubMenuDismiss(ev), 500);
      }
    }
  }

  private _onMouseLeave(ev: React.MouseEvent) {
    this._async.clearTimeout(this._enterTimerId);
  }

  private _onItemMouseDown(item: IContextualMenuItem, ev: React.MouseEvent) {
    if (item.onMouseDown) {
      item.onMouseDown(item, ev);
    }
  }

  private _onItemClick(item: any, ev: MouseEvent) {
    if (item.key !== this.state.expandedMenuItemKey) {
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
    if (this.state.expandedMenuItemKey !== item.key) {

      if (this.state.submenuProps) {
        this._onSubMenuDismiss();
      }

      this.setState({
        expandedMenuItemKey: item.key,
        submenuProps: {
          items: item.items,
          targetElement: target,
          onDismiss: this._onSubMenuDismiss,
          isSubMenu: true,
          id: this.state.subMenuId,
          shouldFocusOnMount: true,
          directionalHint: getRTL() ? DirectionalHint.leftTopEdge : DirectionalHint.rightTopEdge,
          className: this.props.className
        }
      });
    }
 }

  private _onSubMenuDismiss(ev?: any) {
    this.setState({
      dismissedMenuItemKey: this.state.expandedMenuItemKey,
      expandedMenuItemKey: null,
      submenuProps: null
    });
  }
}
