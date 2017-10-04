import * as React from 'react';
import { IContextualMenuProps, IContextualMenuItem, ContextualMenuItemType } from './ContextualMenu.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import {
  getStyles,
  getMenuItemStyles
} from './ContextualMenu.styles';
import {
  IMenuItemClassNames,
  IContextualMenuClassNames,
  getContextualMenuClassNames,
  getItemClassNames
} from './ContextualMenu.classNames';
import {
  BaseComponent,
  anchorProperties,
  buttonProperties,
  getNativeProps,
  assign,
  getId,
  getRTL,
  autobind,
  KeyCodes,
  getDocument,
  getWindow,
  customizable
} from '../../Utilities';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import { Callout } from '../../Callout';
import {
  Icon,
  IIconProps
} from '../../Icon';
export interface IContextualMenuState {
  expandedMenuItemKey?: string;
  dismissedMenuItemKey?: string;
  contextualMenuItems?: IContextualMenuItem[];
  contextualMenuTarget?: HTMLElement;
  submenuTarget?: HTMLElement;
  positions?: any;
  slideDirectionalClassName?: string;
  subMenuId?: string;
  submenuDirection?: DirectionalHint;
}

export function hasSubmenuItems(item: IContextualMenuItem) {
  let submenuItems = getSubmenuItems(item);

  return !!(submenuItems && submenuItems.length);
}

export function getSubmenuItems(item: IContextualMenuItem) {
  return item.subMenuProps ? item.subMenuProps.items : item.items;
}

/**
 * Determines the effective checked state of a menu item.
 *
 * @param item {IContextualMenuItem} to get the check state of.
 * @returns {true} if the item is checked.
 * @returns {false} if the item is unchecked.
 * @returns {null} if the item is not checkable.
 */
function getIsChecked(item: IContextualMenuItem): boolean | null | undefined {
  if (item.canCheck) {
    return item.isChecked || item.checked;
  }

  if (typeof item.isChecked === 'boolean') {
    return item.isChecked;
  }

  // Item is not checkable.
  return null;
}

/**
 * Returns true if a list of menu items can contain a checkbox
 */
export function canAnyMenuItemsCheck(items: IContextualMenuItem[]): boolean {
  return items.some(item => {
    if (item.canCheck) {
      return true;
    }

    // If the item is a section, check if any of the items in the section can check.
    if (item.sectionProps && item.sectionProps.items.some(submenuItem => submenuItem.canCheck === true)) {
      return true;
    }

    return false;
  });
}

@customizable('ContextualMenu', ['theme'])
@withResponsiveMode
export class ContextualMenu extends BaseComponent<IContextualMenuProps, IContextualMenuState> {
  // The default ContextualMenu properties have no items and beak, the default submenu direction is right and top.
  public static defaultProps: IContextualMenuProps = {
    items: [],
    shouldFocusOnMount: true,
    gapSpace: 0,
    directionalHint: DirectionalHint.bottomAutoEdge,
    beakWidth: 16,
    arrowDirection: FocusZoneDirection.vertical,
    getMenuClassNames: getContextualMenuClassNames,
    getItemClassNames: getItemClassNames,
  };

  private _host: HTMLElement;
  private _previousActiveElement: HTMLElement | null;
  private _isFocusingPreviousElement: boolean;
  private _enterTimerId: number;
  private _targetWindow: Window;
  private _target: HTMLElement | MouseEvent | null;
  private _classNames: IContextualMenuClassNames;

  constructor(props: IContextualMenuProps) {
    super(props);

    this.state = {
      contextualMenuItems: undefined,
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
      this._setTargetWindowAndElement(newTarget!);
    }
  }

  // Invoked once, both on the client and server, immediately before the initial rendering occurs.
  public componentWillMount() {
    let target = this.props.targetElement ? this.props.targetElement : this.props.target;
    this._setTargetWindowAndElement(target!);
    this._previousActiveElement = this._targetWindow ? this._targetWindow.document.activeElement as HTMLElement : null;
  }

  // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
  public componentDidMount() {
    this._events.on(this._targetWindow, 'resize', this.dismiss);
    if (this.props.onMenuOpened) {
      this.props.onMenuOpened(this.props);
    }
  }

  // Invoked immediately before a component is unmounted from the DOM.
  public componentWillUnmount() {
    if (this._isFocusingPreviousElement && this._previousActiveElement) {

      // This slight delay is required so that we can unwind the stack, let react try to mess with focus, and then
      // apply the correct focus. Without the setTimeout, we end up focusing the correct thing, and then React wants
      // to reset the focus back to the thing it thinks should have been focused.
      setTimeout(() => this._previousActiveElement!.focus(), 0);
    }

    this._events.dispose();
    this._async.dispose();
  }

  public render(): JSX.Element | null {
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
      directionalHintForRTL,
      gapSpace,
      coverTarget,
      ariaLabel,
      doNotLayer,
      arrowDirection,
      target,
      bounds,
      useTargetWidth,
      directionalHintFixed,
      shouldFocusOnMount,
      title,
      styles: customStyles,
      theme,
      calloutProps,
      onRenderSubMenu = this._onRenderSubMenu
    } = this.props;

    let menuClassNames = this.props.getMenuClassNames ? this.props.getMenuClassNames : getContextualMenuClassNames;
    this._classNames = menuClassNames(theme!, className!);

    let hasIcons = itemsHaveIcons(items);

    function itemsHaveIcons(contextualMenuItems: IContextualMenuItem[]): boolean {
      for (const item of contextualMenuItems) {
        if (!!item.icon || !!item.iconProps) {
          return true;
        }

        if (item.itemType === ContextualMenuItemType.Section && item.sectionProps && itemsHaveIcons(item.sectionProps.items)) {
          return true;
        }
      }

      return false;
    }

    let hasCheckmarks = canAnyMenuItemsCheck(items);
    const submenuProps = this.state.expandedMenuItemKey ? this._getSubmenuProps() : null;

    isBeakVisible = isBeakVisible === undefined ? this.props.responsiveMode! <= ResponsiveMode.medium : isBeakVisible;
    /**
     * When useTargetWidth is true, get the width of the target element and apply it for the context menu container
     */
    let contextMenuStyle;
    let targetAsHtmlElement = this._target as HTMLElement;
    if (useTargetWidth && targetAsHtmlElement && targetAsHtmlElement.offsetWidth) {
      let contextMenuWidth = targetAsHtmlElement.offsetWidth;
      contextMenuStyle = {
        width: contextMenuWidth
      };
    }

    // The menu should only return if items were provided, if no items were provided then it should not appear.
    if (items && items.length > 0) {
      let indexCorrection = 0;
      let totalItemCount = 0;
      for (let item of items) {
        if (item.itemType !== ContextualMenuItemType.Divider &&
          item.itemType !== ContextualMenuItemType.Header) {
          totalItemCount++;
        }
      }
      return (
        <Callout
          {...calloutProps}
          target={ target }
          targetElement={ targetElement }
          targetPoint={ targetPoint }
          useTargetPoint={ useTargetPoint }
          isBeakVisible={ isBeakVisible }
          beakWidth={ beakWidth }
          directionalHint={ directionalHint }
          directionalHintForRTL={ directionalHintForRTL }
          gapSpace={ gapSpace }
          coverTarget={ coverTarget }
          doNotLayer={ doNotLayer }
          className='ms-ContextualMenu-Callout'
          setInitialFocus={ shouldFocusOnMount }
          onDismiss={ this.props.onDismiss }
          bounds={ bounds }
          directionalHintFixed={ directionalHintFixed }
        >
          <div style={ contextMenuStyle } ref={ (host: HTMLDivElement) => this._host = host } id={ id } className={ this._classNames.container }>
            { title && <div className={ this._classNames.title } role='heading' aria-level={ 1 }> { title } </div> }
            { (items && items.length) ? (
              <FocusZone
                className={ this._classNames.root }
                direction={ arrowDirection }
                isCircularNavigation={ true }
              >
                <ul
                  role='menu'
                  aria-label={ ariaLabel }
                  aria-labelledby={ labelElementId }
                  className={ this._classNames.list }
                  onKeyDown={ this._onKeyDown }
                >
                  { items.map((item, index) => {
                    if (item.itemType === ContextualMenuItemType.Divider ||
                      item.itemType === ContextualMenuItemType.Header) {
                      indexCorrection++;
                    }
                    return this._renderMenuItem(item, index, index - indexCorrection, totalItemCount, hasCheckmarks, hasIcons);
                  }) }
                </ul>
              </FocusZone>
            ) : (null) }
            { submenuProps && onRenderSubMenu(submenuProps, this._onRenderSubMenu) }
          </div>
        </Callout>
      );
    } else {
      return null;
    }
  }

  private _onRenderSubMenu(subMenuProps: IContextualMenuProps) {
    return <ContextualMenu { ...subMenuProps } />;
  }

  private _renderMenuItem(item: IContextualMenuItem, index: number, focusableElementIndex: number, totalItemCount: number, hasCheckmarks: boolean, hasIcons: boolean): React.ReactNode {
    let renderedItems: React.ReactNode[] = [];
    let iconProps = this._getIconProps(item);
    let subMenuIconClassName = item.submenuIconProps ? item.submenuIconProps.className : '';
    let getClassNames = this.props.getItemClassNames ? this.props.getItemClassNames : getItemClassNames;
    let itemClassNames = getClassNames(
      this.props.theme!,
      !!item.disabled,
      (this.state.expandedMenuItemKey === item.key),
      !!getIsChecked(item),
      !!item.href,
      (iconProps.iconName !== 'None'),
      item.className!,
      iconProps.className!,
      subMenuIconClassName!
    );

    if (item.name === '-') {
      item.itemType = ContextualMenuItemType.Divider;
    }
    switch (item.itemType) {
      case ContextualMenuItemType.Divider:
        renderedItems.push(this._renderSeparator(index, item.className));
        break;
      case ContextualMenuItemType.Header:
        renderedItems.push(this._renderSeparator(index));
        let headerItem = this._renderHeaderMenuItem(item, itemClassNames, index, hasCheckmarks, hasIcons);
        renderedItems.push(this._renderListItem(headerItem, item.key || index, itemClassNames, item.title));
        break;
      case ContextualMenuItemType.Section:
        renderedItems.push(this._renderSectionItem(item, itemClassNames, index, hasCheckmarks, hasIcons));
        break;
      default:
        let menuItem = this._renderNormalItem(item, itemClassNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons);
        renderedItems.push(this._renderListItem(menuItem, item.key || index, itemClassNames, item.title));
        break;
    }

    return renderedItems;
  }

  private _renderSectionItem(item: IContextualMenuItem, menuClassNames: IMenuItemClassNames, index: number, hasCheckmarks: boolean, hasIcons: boolean) {
    const section = item.sectionProps;
    if (!section) {
      return;
    }

    let headerItem;
    if (section.title) {
      const headerContextualMenuItem: IContextualMenuItem = {
        key: `section-${section.title}-title`,
        itemType: ContextualMenuItemType.Header,
        name: section.title,
      };
      headerItem = this._renderHeaderMenuItem(headerContextualMenuItem, menuClassNames, index, hasCheckmarks, hasIcons);
    }

    if (section.items && section.items.length > 0) {
      return (
        <li
          role='presentation'
          key={ section.key }
        >
          <div role='group'>
            <ul className={ this._classNames.list }>
              { section.topDivider && this._renderSeparator(index, undefined, true, true) }
              { headerItem && this._renderListItem(headerItem, item.key || index, menuClassNames, item.title) }
              { section.items.map((contextualMenuItem, itemsIndex) => (
                this._renderMenuItem(contextualMenuItem, itemsIndex, itemsIndex, section.items.length, hasCheckmarks, hasIcons)
              )) }
              { section.bottomDivider && this._renderSeparator(index, undefined, false, true) }
            </ul>
          </div>
        </li>
      );
    }
  }

  private _renderListItem(content: React.ReactNode, key: string | number, classNames: IMenuItemClassNames, title?: string) {
    return (
      <li
        role='presentation'
        title={ title }
        key={ key }
        className={ classNames.item }
      >
        { content }
      </li>
    );
  }

  private _renderSeparator(index: number, className?: string, top?: boolean, fromSection?: boolean): React.ReactNode {
    if (fromSection || index > 0) {
      return (
        <li
          role='separator'
          key={ 'separator-' + index + (top === undefined ? '' : (top ? '-top' : '-bottom')) }
          className={ this._classNames.divider }
        />
      );
    }
    return null;
  }

  private _renderNormalItem(item: IContextualMenuItem, classNames: IMenuItemClassNames, index: number, focusableElementIndex: number, totalItemCount: number, hasCheckmarks: boolean, hasIcons: boolean): React.ReactNode {
    if (item.onRender) {
      return [item.onRender(item)];
    }
    if (item.href) {
      return this._renderAnchorMenuItem(item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons);
    }
    return this._renderButtonItem(item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons);
  }

  private _renderHeaderMenuItem(item: IContextualMenuItem, classNames: IMenuItemClassNames, index: number, hasCheckmarks: boolean, hasIcons: boolean): React.ReactNode {
    return (
      <div className={ this._classNames.header } style={ item.style } role='heading' aria-level={ this.props.title ? 2 : 1 }>
        { this._renderMenuItemChildren(item, classNames, index, hasCheckmarks, hasIcons) }
      </div>);
  }

  private _renderAnchorMenuItem(item: IContextualMenuItem, classNames: IMenuItemClassNames, index: number, focusableElementIndex: number, totalItemCount: number, hasCheckmarks: boolean, hasIcons: boolean): React.ReactNode {
    return (
      <div>
        <a
          { ...getNativeProps(item, anchorProperties) }
          href={ item.href }
          target={ item.target }
          className={ classNames.root }
          role='menuitem'
          aria-posinset={ focusableElementIndex + 1 }
          aria-setsize={ totalItemCount }
          aria-disabled={ item.isDisabled }
          style={ item.style }
          onClick={ this._onAnchorClick.bind(this, item) }
        >
          { this._renderMenuItemChildren(item, classNames, index, hasCheckmarks, hasIcons) }
        </a>
      </div>);
  }

  private _renderButtonItem(
    item: IContextualMenuItem,
    classNames: IMenuItemClassNames,
    index: number,
    focusableElementIndex: number,
    totalItemCount: number,
    hasCheckmarks?: boolean,
    hasIcons?: boolean) {
    let { expandedMenuItemKey, subMenuId } = this.state;
    let ariaLabel = '';

    if (item.ariaLabel) {
      ariaLabel = item.ariaLabel;
    } else if (item.name) {
      ariaLabel = item.name;
    }

    const isChecked: boolean | null | undefined = getIsChecked(item);
    const canCheck: boolean = isChecked !== null;
    const defaultRole = canCheck ? 'menuitemcheckbox' : 'menuitem';

    const itemButtonProperties = {
      className: classNames.root,
      onClick: this._onItemClick.bind(this, item),
      onKeyDown: hasSubmenuItems(item) ? this._onItemKeyDown.bind(this, item) : null,
      onMouseEnter: this._onItemMouseEnter.bind(this, item),
      onMouseLeave: this._onMouseLeave,
      onMouseDown: (ev: any) => this._onItemMouseDown(item, ev),
      disabled: item.isDisabled || item.disabled,
      href: item.href,
      title: item.title,
      'aria-label': ariaLabel,
      'aria-haspopup': hasSubmenuItems(item) || null,
      'aria-owns': item.key === expandedMenuItemKey ? subMenuId : null,
      'aria-checked': isChecked,
      'aria-posinset': focusableElementIndex + 1,
      'aria-setsize': totalItemCount,
      'aria-disabled': item.isDisabled,
      role: item.role || defaultRole,
      style: item.style
    };

    return React.createElement(
      'button',
      assign({}, getNativeProps(item, buttonProperties), itemButtonProperties),
      this._renderMenuItemChildren(item, classNames, index, hasCheckmarks!, hasIcons!));
  }

  private _renderMenuItemChildren(item: IContextualMenuItem, classNames: IMenuItemClassNames, index: number, hasCheckmarks: boolean, hasIcons: boolean) {
    const isItemChecked: boolean | null | undefined = getIsChecked(item);
    return (
      <div className={ classNames.linkContent }>
        { (hasCheckmarks) ? (
          <Icon
            iconName={ isItemChecked === true ? 'CheckMark' : 'CustomIcon' }
            className={ classNames.icon }
            onClick={ this._onItemClick.bind(this, item) }
          />
        ) : (null) }
        { (hasIcons) ? (
          this._renderIcon(item, classNames)
        ) : (null) }
        <span className={ classNames.label }>{ item.name }</span>
        { hasSubmenuItems(item) ? (
          <Icon
            iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' }
            { ...item.submenuIconProps }
            className={ classNames.subMenuIcon }
          />
        ) : (null) }
      </div>
    );
  }

  private _getIconProps(item: IContextualMenuItem): IIconProps {
    let iconProps: IIconProps = item.iconProps ? item.iconProps : {
      iconName: item.icon
    };
    return iconProps;
  }

  private _renderIcon(item: IContextualMenuItem, classNames: IMenuItemClassNames) {
    // Only present to allow continued use of item.icon which is deprecated.
    let iconProps = this._getIconProps(item);

    return <Icon { ...iconProps } className={ classNames.icon } />;
  }

  @autobind
  private _onKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    let submenuCloseKey = getRTL() ? KeyCodes.right : KeyCodes.left;

    if (ev.which === KeyCodes.escape
      || ev.which === KeyCodes.tab
      || (ev.which === submenuCloseKey && this.props.isSubMenu && this.props.arrowDirection === FocusZoneDirection.vertical)) {
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
      if (hasSubmenuItems(item)) {
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

  private _onItemClick(item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) {
    let items = getSubmenuItems(item);

    if (!items || !items.length) { // This is an item without a menu. Click it.
      this._executeItemClick(item, ev);
    } else {
      if (item.key === this.state.expandedMenuItemKey) { // This has an expanded sub menu. collapse it.
        this._onSubMenuDismiss(ev);
      } else { // This has a collapsed sub menu. Expand it.
        this._onItemSubMenuExpand(item, ev.currentTarget as HTMLElement);
      }
    }

    ev.stopPropagation();
    ev.preventDefault();
  }

  private _onAnchorClick(item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) {
    this._executeItemClick(item, ev);
    ev.stopPropagation();
  }

  private _executeItemClick(item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) {
    if (item.onClick) {
      item.onClick(ev, item);
    } else if (this.props.onItemClick) {
      this.props.onItemClick(ev, item);
    }

    this.dismiss(ev, true);
  }

  private _onItemKeyDown(item: any, ev: KeyboardEvent) {
    let openKey = getRTL() ? KeyCodes.left : KeyCodes.right;

    if (ev.which === openKey) {
      this._onItemSubMenuExpand(item, ev.currentTarget as HTMLElement);
      ev.preventDefault();
    }
  }

  private _onItemSubMenuExpand(item: IContextualMenuItem, target: HTMLElement) {
    if (this.state.expandedMenuItemKey !== item.key) {

      if (this.state.expandedMenuItemKey) {
        this._onSubMenuDismiss();
      }
      this.setState({
        expandedMenuItemKey: item.key,
        submenuTarget: target
      });
    }
  }

  private _getSubmenuProps() {
    const { submenuTarget, expandedMenuItemKey } = this.state;
    const item = this._findItemByKey(expandedMenuItemKey!);
    let submenuProps = null;

    if (item) {
      submenuProps = {
        items: getSubmenuItems(item)!,
        target: submenuTarget,
        onDismiss: this._onSubMenuDismiss,
        isSubMenu: true,
        id: this.state.subMenuId,
        shouldFocusOnMount: true,
        directionalHint: getRTL() ? DirectionalHint.leftTopEdge : DirectionalHint.rightTopEdge,
        className: this.props.className,
        gapSpace: 0,
        isBeakVisible: false
      };

      if (item.subMenuProps) {
        assign(submenuProps, item.subMenuProps);
      }
    }
    return submenuProps;
  }

  private _findItemByKey(key: string): IContextualMenuItem | undefined {
    let { items } = this.props;
    return this._findItemByKeyFromItems(key, items);
  }

  /**
   * Returns the item that mathes a given key if any.
   * @param key The key of the item to match
   * @param items The items to look for the key
   */
  private _findItemByKeyFromItems(key: string, items: IContextualMenuItem[]): IContextualMenuItem | undefined {
    for (const item of items) {
      if (item.itemType === ContextualMenuItemType.Section && item.sectionProps) {
        const match = this._findItemByKeyFromItems(key, item.sectionProps.items);
        if (match) {
          return match;
        }
      } else if (item.key && item.key === key) {
        return item;
      }
    }
  }

  @autobind
  private _onSubMenuDismiss(ev?: any, dismissAll?: boolean) {
    if (dismissAll) {
      this.dismiss(ev, dismissAll);
    } else {
      this.setState({
        dismissedMenuItemKey: this.state.expandedMenuItemKey,
        expandedMenuItemKey: undefined,
        submenuTarget: undefined
      });
    }
  }

  private _setTargetWindowAndElement(target: HTMLElement | string | MouseEvent): void {
    if (target) {
      if (typeof target === 'string') {
        let currentDoc: Document = getDocument()!;
        this._target = currentDoc ? currentDoc.querySelector(target) as HTMLElement : null;
        this._targetWindow = getWindow()!;
      } else if ((target as MouseEvent).stopPropagation) {
        this._target = target;
        this._targetWindow = getWindow((target as MouseEvent).toElement as HTMLElement)!;
      } else {
        let targetElement: HTMLElement = target as HTMLElement;
        this._target = target;
        this._targetWindow = getWindow(targetElement)!;
      }
    } else {
      this._targetWindow = getWindow()!;
    }
  }
}
