import * as React from 'react';
import { IMenuProps } from './Menu.Props';
import { IMenuItemProps } from './MenuItem.Props';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import {
  getId,
  getRTL,
  css,
  autobind,
  KeyCodes
} from '../../Utilities';
import { IContextualMenuProps, ContextualMenu, DirectionalHint } from '../../ContextualMenu';
import { BaseComponent } from '../../common/BaseComponent';
import { AnchorMenuItem } from './MenuItems/AnchorMenuItem';
import { ButtonMenuItem } from './MenuItems/ButtonMenuItem';
import './Menu.scss';

export interface IMenuState {
  expandedMenuItemKey?: string;
  dismissedMenuItemKey?: string;
  subMenuId?: string;
  submenuProps?: IContextualMenuProps;
}

export class Menu extends BaseComponent<IMenuProps, IMenuState> {
  public static defaultProps = {
    items: [],
  };

  private _enterTimerId: number;
  private _focusZone: FocusZone;

  constructor(props: IMenuProps) {
    super(props);

    this.state = {
      subMenuId: getId('Menu')
    };

    this._enterTimerId = 0;
  }

  public render() {
    let { className,
      items,
      id } = this.props;

    let { submenuProps } = this.state;

    let hasIcons = !!(items && items.some(item => !!item.iconProps));
    let hasCheckmarks = !!(items && items.some(item => !!item.canCheck));

    return (
      <div className={ css(className, 'ms-Menu') }
        id={ id }>
        { (items && items.length) ? (
          <FocusZone
            direction={ FocusZoneDirection.vertical }
            ref={ (focusZone) => this._focusZone = focusZone }
            rootProps={ { role: 'menu' } }
            >
            <ul
              className='ms-Menu-list'
              aria-label={ this.props.ariaLabel } >
              { items.map((item, index) => (
                // If the item name is equal to '-', a divider will be generated.
                item.name === '-' ? (
                  <li
                    role='separator'
                    key={ item.key || index + item.name }
                    className={ css('ms-Menu-divider', item.className) } />
                ) : (
                    <li
                      role='menuitem'
                      title={ item.title }
                      key={ item.key || index + item.name }
                      className={ css('ms-Menu-item', item.className) }>
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
  private _renderMenuItem(item, index, hasCheckmarks, hasIcons) {
    if (item.href) {
      return <AnchorMenuItem
        {...item}
        onClick={ (ev: React.MouseEvent<HTMLAnchorElement>) => this._onAnchorClick(item, ev) }
        hasCheckmarks={ hasCheckmarks }
        onKeyDown={ item.items && item.items.length ? this._onItemKeyDown.bind(this, item) : null }
        hasIcons={ hasIcons }
        onMouseEnter={ this._onItemMouseEnter.bind(this, item) }
        key={ index + item.name } />;
    }
    return <ButtonMenuItem
      {...item}
      onClick={ (ev: React.MouseEvent<HTMLElement>) => this._onItemClick(item, ev) }
      hasCheckmarks={ hasCheckmarks }
      hasIcons={ hasIcons }
      onKeyDown={ item.items && item.items.length ? this._onItemKeyDown.bind(this, item) : null }
      onMouseEnter={ this._onItemMouseEnter.bind(this, item) }
      onMouseLeave={ this._onMouseLeave }
      key={ index + item.name } />;
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

  private _onItemClick(item: any, ev: React.MouseEvent<HTMLElement>) {
    if (item.key !== this.state.expandedMenuItemKey) {
      if (!item.items || !item.items.length) { // This is an item without a menu. Click it.
        this._executeItemClick(item, ev.nativeEvent as MouseEvent);
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

  private _onAnchorClick(item: IMenuItemProps, ev: React.MouseEvent<HTMLAnchorElement>) {
    this._executeItemClick(item, ev.nativeEvent as MouseEvent);
    ev.stopPropagation();
  }

  private _executeItemClick(item: any, ev: MouseEvent) {
    if (item.onClick) {
      item.onClick(ev, item);
    }
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
          className: css('ms-Menu-subMenu', this.props.className),
          gapSpace: 0
        }
      });
    }
  }

  @autobind
  private _onSubMenuDismiss(ev?: any, dismissAll?: boolean) {
    this.setState({
      dismissedMenuItemKey: this.state.expandedMenuItemKey,
      expandedMenuItemKey: null,
      submenuProps: null
    });
  }

}
