import * as React from 'react';
import { IContextualMenuProps, IContextualMenuItem } from './ContextualMenu.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import {
  anchorProperties,
  buttonProperties,
  getNativeProps,
  assign,
  getId,
  getRTL,
  css,
  autobind,
  KeyCodes,
  getDocument,
  getWindow
} from '../../Utilities';
import { Callout } from '../../Callout';
import { BaseComponent } from '../../common/BaseComponent';
import { Icon, IconName } from '../../Icon';
import './ContextualMenu.scss';

export interface IContextualMenuState {
  expandedMenuItemKey?: string;
  dismissedMenuItemKey?: string;
  contextualMenuItems?: IContextualMenuItem[];
  contextualMenuTarget?: HTMLElement;
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

export class ContextualMenu extends BaseComponent<IContextualMenuProps, IContextualMenuState> {
  // The default ContextualMenu properities have no items and beak, the default submenu direction is right and top.
  public static defaultProps = {
    items: [],
    shouldFocusOnMount: true,
    isBeakVisible: false,
    gapSpace: 0,
    directionalHint: DirectionalHint.bottomAutoEdge,
    beakWidth: 16
  };

  private _host: HTMLElement;
  private _previousActiveElement: HTMLElement;
  private _isFocusingPreviousElement: boolean;
  private _enterTimerId: number;
  private _focusZone: FocusZone;
  private _targetWindow: Window;
  private _target: HTMLElement | MouseEvent;

  constructor(props: IContextualMenuProps) {
    super(props);

    this.state = {
      contextualMenuItems: null,
      subMenuId: getId('ContextualMenu')
    };

    this._isFocusingPreviousElement = false;
    this._enterTimerId = 0;
  }

  @autobind
  public dismiss(ev?: any, dismissAll?: boolean) {
    let { onDismiss } = this.props;

    if (onDismiss) {
      onDismiss(ev, dismissAll);
    }
  }

  public componentWillUpdate(newProps: IContextualMenuProps) {
    if (newProps.targetElement !== this.props.targetElement || newProps.target !== this.props.target) {
      let newTarget = newProps.targetElement ? newProps.targetElement : newProps.target;
      this._setTargetWindowAndElement(newProps.target);
    }
  }

  // Invoked once, both on the client and server, immediately before the initial rendering occurs.
  public componentWillMount() {
    let target = this.props.targetElement ? this.props.targetElement : this.props.target;
    this._setTargetWindowAndElement(target);
    this._previousActiveElement = this._targetWindow ? this._targetWindow.document.activeElement as HTMLElement : null;
  }

  // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
  public componentDidMount() {
    this._events.on(this._targetWindow, 'resize', this.dismiss);
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
      coverTarget,
      ariaLabel,
      doNotLayer,
      target } = this.props;

    let { submenuProps } = this.state;

    let hasIcons = !!(items && items.some(item => !!item.icon || !!item.iconProps));
    let hasCheckmarks = !!(items && items.some(item => !!item.canCheck));

    return (
      <Callout
        target={ target }
        targetElement={ targetElement }
        targetPoint={ targetPoint }
        useTargetPoint={ useTargetPoint }
        isBeakVisible={ isBeakVisible }
        beakWidth={ beakWidth }
        directionalHint={ directionalHint }
        gapSpace={ gapSpace }
        coverTarget={ coverTarget }
        doNotLayer={ doNotLayer }
        className='ms-ContextualMenu-Callout'
        setInitialFocus={ true }
        onDismiss={ this.props.onDismiss }>
        <div ref={ (host: HTMLDivElement) => this._host = host } id={ id } className={ css('ms-ContextualMenu-container', className) }>
          { (items && items.length) ? (
            <FocusZone
              className={ 'ms-ContextualMenu is-open' }
              direction={ FocusZoneDirection.vertical }
              ariaLabelledBy={ labelElementId }
              ref={ (focusZone) => this._focusZone = focusZone }
              rootProps={ { role: 'menu' } }
              >
              <ul
                className='ms-ContextualMenu-list is-open'
                onKeyDown={ this._onKeyDown }
                aria-label={ ariaLabel } >
                { items.map((item, index) => (
                  // If the item name is equal to '-', a divider will be generated.
                  item.name === '-' ? (
                    <li
                      role='separator'
                      key={ item.key || index }
                      className={ css('ms-ContextualMenu-divider', item.className) } />
                  ) : (
                      <li
                        role='menuitem'
                        title={ item.title }
                        key={ item.key || index }
                        className={ css('ms-ContextualMenu-item', item.className) }>
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
      </Callout>
    );
  }

  private _renderMenuItem(item: IContextualMenuItem, index: number, hasCheckmarks: boolean, hasIcons: boolean) {
    if (item.onRender) {
      return item.onRender(item);
    }

    // If the item is disabled then it should render as the button for proper styling.
    if (item.href) {
      return this._renderAnchorMenuItem(item, index, hasCheckmarks, hasIcons);
    }
    return this._renderButtonItem(item, index, hasCheckmarks, hasIcons);
  }

  private _renderAnchorMenuItem(item: IContextualMenuItem, index: number, hasCheckmarks: boolean, hasIcons: boolean): JSX.Element {
    // Only present to allow continued use of item.icon which is deprecated.
    let iconProps = item.iconProps ? item.iconProps : {
      iconName: IconName[item.icon]
    };
    return (
      <div>
        <a
          { ...getNativeProps(item, anchorProperties) }
          href={ item.href }
          className={ css('ms-ContextualMenu-link', item.isDisabled || item.disabled ? 'is-disabled' : '') }
          role='menuitem'
          onClick={ this._onAnchorClick.bind(this, item) }>
          { (hasIcons) ? (
            <Icon { ...iconProps } className={ 'ms-ContextualMenu-icon' } />)
            : null
          }
          <span className='ms-ContextualMenu-linkText ms-fontWeight-regular'> { item.name } </span>
        </a>
      </div >);
  }

  private _renderButtonItem(
    item: IContextualMenuItem,
    index: number,
    hasCheckmarks?: boolean,
    hasIcons?: boolean) {
    let { expandedMenuItemKey, subMenuId } = this.state;
    let ariaLabel = '';

    if (item.ariaLabel) {
      ariaLabel = item.ariaLabel;
    } else if (item.name) {
      ariaLabel = item.name;
    }

    let itemButtonProperties = {
      className: css('ms-ContextualMenu-link', { 'is-expanded': (expandedMenuItemKey === item.key) }),
      onClick: this._onItemClick.bind(this, item),
      onKeyDown: item.items && item.items.length ? this._onItemKeyDown.bind(this, item) : null,
      onMouseEnter: this._onItemMouseEnter.bind(this, item),
      onMouseLeave: this._onMouseLeave,
      onMouseDown: (ev: any) => this._onItemMouseDown(item, ev),
      disabled: item.isDisabled || item.disabled,
      role: 'menuitem',
      href: item.href,
      title: item.title,
      'aria-label': ariaLabel,
      'aria-haspopup': item.items && item.items.length ? true : null,
      'aria-owns': item.key === expandedMenuItemKey ? subMenuId : null
    };

    return React.createElement(
      'button',
      assign({}, getNativeProps(item, buttonProperties), itemButtonProperties),
      this._renderMenuItemChildren(item, index, hasCheckmarks, hasIcons));
  }

  private _renderMenuItemChildren(item: IContextualMenuItem, index: number, hasCheckmarks: boolean, hasIcons: boolean) {
    let isItemChecked: boolean = item.isChecked || item.checked;
    // Only present to allow continued use of item.icon which is deprecated.
    let iconProps = item.iconProps ? item.iconProps : {
      iconName: IconName[item.icon]
    };
    return (
      <div className='ms-ContextualMenu-linkContent'>
        { (hasCheckmarks) ? (
          <Icon
            iconName={ isItemChecked ? IconName.CheckMark : IconName.CustomIcon }
            className={ 'ms-ContextualMenu-icon' }
            onClick={ this._onItemClick.bind(this, item) } />
        ) : (null) }
        { (hasIcons) ? (
          <Icon { ...iconProps } className={ 'ms-ContextualMenu-icon' } />
        ) : (null) }
        <span className='ms-ContextualMenu-itemText ms-fontWeight-regular'>{ item.name }</span>
        { (item.items && item.items.length) ? (
          <Icon className='ms-ContextualMenu-submenuChevron ms-Icon' iconName={ getRTL() ? IconName.ChevronLeft : IconName.ChevronRight } />
        ) : (null) }
      </div>
    );
  }

  @autobind
  private _onKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
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

  private _onItemMouseEnter(item: any, ev: React.MouseEvent<HTMLElement>) {
    let targetElement = ev.currentTarget as HTMLElement;

    if (item.key !== this.state.expandedMenuItemKey) {
      if (item.items && item.items.length) {
        this._enterTimerId = this._async.setTimeout(() => this._onItemSubMenuExpand(item, targetElement), 500);
      } else {
        this._enterTimerId = this._async.setTimeout(() => this._onSubMenuDismiss(ev), 500);
      }
    }
  }

  @autobind
  private _onMouseLeave(ev: React.MouseEvent<HTMLElement>) {
    this._async.clearTimeout(this._enterTimerId);
  }

  private _onItemMouseDown(item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) {
    if (item.onMouseDown) {
      item.onMouseDown(item, ev);
    }
  }

  private _onItemClick(item: any, ev: MouseEvent) {
    if (item.key !== this.state.expandedMenuItemKey) {
      if (!item.items || !item.items.length) { // This is an item without a menu. Click it.
        this._executeItemClick(item, ev);
      } else {
        if (item.key === this.state.dismissedMenuItemKey) { // This has an expanded sub menu. collapse it.
          this._onSubMenuDismiss(ev);
        } else { // This has a collapsed sub menu. Expand it.
          this._onItemSubMenuExpand(item, ev.currentTarget as HTMLElement);
        }
      }
    }
    ev.stopPropagation();
    ev.preventDefault();
  }

  private _onAnchorClick(item: IContextualMenuItem, ev: MouseEvent) {
    this._executeItemClick(item, ev);
    ev.stopPropagation();
  }

  private _executeItemClick(item: any, ev: MouseEvent) {
    if (item.onClick) {
      item.onClick(ev, item);
    }
    this.dismiss(ev, true);
  }

  private _onItemKeyDown(item: any, ev: KeyboardEvent) {
    let openKey = getRTL() ? KeyCodes.left : KeyCodes.right;

    if (ev.which === openKey) {
      this._onItemSubMenuExpand(item, ev.currentTarget as HTMLElement);
    }
  }

  private _onItemSubMenuExpand(item: any, target: HTMLElement) {
    if (this.state.expandedMenuItemKey !== item.key) {

      if (this.state.submenuProps) {
        this._onSubMenuDismiss();
      }

      this.setState({
        expandedMenuItemKey: item.key,
        submenuProps: {
          items: item.items,
          target: target,
          onDismiss: this._onSubMenuDismiss,
          isSubMenu: true,
          id: this.state.subMenuId,
          shouldFocusOnMount: true,
          directionalHint: getRTL() ? DirectionalHint.leftTopEdge : DirectionalHint.rightTopEdge,
          className: this.props.className,
          gapSpace: 0
        }
      });
    }
  }

  @autobind
  private _onSubMenuDismiss(ev?: any, dismissAll?: boolean) {
    if (dismissAll) {
      this.dismiss(ev, dismissAll);
    } else {
      this.setState({
        dismissedMenuItemKey: this.state.expandedMenuItemKey,
        expandedMenuItemKey: null,
        submenuProps: null
      });
    }
  }

  private _setTargetWindowAndElement(target: HTMLElement | string | MouseEvent): void {
    if (target) {
      if (typeof target === 'string') {
        let currentDoc: Document = getDocument();
        this._target = currentDoc ? currentDoc.getElementById(target) : null;
        this._targetWindow = getWindow();
      } else if ((target as MouseEvent).stopPropagation) {
        this._target = target;
        this._targetWindow = getWindow((target as MouseEvent).toElement as HTMLElement);
      } else {
        let targetElement: HTMLElement = target as HTMLElement;
        this._target = target;
        this._targetWindow = getWindow(targetElement);
      }
    } else {
      this._targetWindow = getWindow();
    }
  }
}
