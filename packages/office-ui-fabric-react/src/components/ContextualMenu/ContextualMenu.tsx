import * as React from 'react';
import { IContextualMenuProps, IContextualMenuItem, ContextualMenuItemType } from './ContextualMenu.types';
import { DirectionalHint } from '../../common/DirectionalHint';
import { FocusZone, FocusZoneDirection, IFocusZoneProps, FocusZoneTabbableElements } from '../../FocusZone';
import {
  IMenuItemClassNames,
  IContextualMenuClassNames,
  getContextualMenuClassNames,
  getItemClassNames
} from './ContextualMenu.classNames';
import {
  BaseComponent,
  IPoint,
  assign,
  getId,
  getRTL,
  KeyCodes,
  getDocument,
  getWindow,
  customizable,
  getFirstFocusable,
  getLastFocusable,
  css,
  shouldWrapFocus
} from '../../Utilities';
import { hasSubmenu, getIsChecked, isItemDisabled } from '../../utilities/contextualMenu/index';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import { Callout } from '../../Callout';
import { IIconProps } from '../../Icon';
import { ContextualMenuItem } from './ContextualMenuItem';
import { ContextualMenuSplitButton, ContextualMenuButton, ContextualMenuAnchor } from './ContextualMenuItemWrapper/index';

export interface IContextualMenuState {
  expandedMenuItemKey?: string;
  expandedByMouseClick?: boolean;
  dismissedMenuItemKey?: string;
  contextualMenuItems?: IContextualMenuItem[];
  contextualMenuTarget?: Element;
  submenuTarget?: Element;
  positions?: any;
  slideDirectionalClassName?: string;
  subMenuId?: string;
  submenuDirection?: DirectionalHint;
}

export function getSubmenuItems(item: IContextualMenuItem) {
  return item.subMenuProps ? item.subMenuProps.items : item.items;
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

const NavigationIdleDelay = 250 /* ms */;

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
    getMenuClassNames: getContextualMenuClassNames
  };

  private _host: HTMLElement;
  private _previousActiveElement: HTMLElement | null;
  private _isFocusingPreviousElement: boolean;
  private _enterTimerId: number | undefined;
  private _targetWindow: Window;
  private _target: Element | MouseEvent | IPoint | null;
  private _classNames: IContextualMenuClassNames;
  private _isScrollIdle: boolean;
  private _scrollIdleTimeoutId: number | undefined;

  private _adjustedFocusZoneProps: IFocusZoneProps;

  constructor(props: IContextualMenuProps) {
    super(props);

    this.state = {
      contextualMenuItems: undefined,
      subMenuId: getId('ContextualMenu')
    };

    this._warnDeprecations({
      'targetPoint': 'target',
      'useTargetPoint': 'target',
      'arrowDirection': 'focusZoneProps'
    });

    this._isFocusingPreviousElement = false;
    this._isScrollIdle = true;
  }

  public dismiss = (ev?: any, dismissAll?: boolean) => {
    const { onDismiss } = this.props;

    if (onDismiss) {
      onDismiss(ev, dismissAll);
    }
  }

  public componentWillUpdate(newProps: IContextualMenuProps): void {
    if (newProps.target !== this.props.target) {
      const newTarget = newProps.target;
      this._setTargetWindowAndElement(newTarget!);
    }
    if (newProps.hidden !== this.props.hidden) {
      if (newProps.hidden) {
        this._onMenuClosed();
      } else {
        this._onMenuOpened();
        this._previousActiveElement = this._targetWindow ? this._targetWindow.document.activeElement as HTMLElement : null;
      }
    }
  }

  // Invoked once, both on the client and server, immediately before the initial rendering occurs.
  public componentWillMount() {
    const target = this.props.target;
    this._setTargetWindowAndElement(target!);
    if (!this.props.hidden) {
      this._previousActiveElement = this._targetWindow ? this._targetWindow.document.activeElement as HTMLElement : null;
    }
  }

  // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
  public componentDidMount(): void {
    if (!this.props.hidden) {
      this._onMenuOpened();
    }
  }

  // Invoked immediately before a component is unmounted from the DOM.
  public componentWillUnmount() {
    if (this._isFocusingPreviousElement && this._previousActiveElement) {

      // This slight delay is required so that we can unwind the stack, const react try to mess with focus, and then
      // apply the correct focus. Without the setTimeout, we end up focusing the correct thing, and then React wants
      // to reset the focus back to the thing it thinks should have been focused.
      // Note: Cannot be replaced by this._async.setTimout because those will be removed by the time this is called.
      setTimeout(() => { this._previousActiveElement && this._previousActiveElement!.focus(); }, 0);
    }

    if (this.props.onMenuDismissed) {
      this.props.onMenuDismissed(this.props);
    }
  }

  public render(): JSX.Element | null {
    let {
      isBeakVisible
    } = this.props;

    const {
      className,
      items,
      labelElementId,
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
      target,
      bounds,
      useTargetWidth,
      useTargetAsMinWidth,
      directionalHintFixed,
      shouldFocusOnMount,
      shouldFocusOnContainer,
      title,
      theme,
      calloutProps,
      onRenderSubMenu = this._onRenderSubMenu,
      focusZoneProps
    } = this.props;

    const menuClassNames = this.props.getMenuClassNames || getContextualMenuClassNames;
    this._classNames = menuClassNames(theme!, className);

    const hasIcons = itemsHaveIcons(items);

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

    this._adjustedFocusZoneProps = { ...focusZoneProps, direction: this._getFocusZoneDirection() };

    const hasCheckmarks = canAnyMenuItemsCheck(items);
    const submenuProps = this.state.expandedMenuItemKey ? this._getSubmenuProps() : null;

    isBeakVisible = isBeakVisible === undefined ? this.props.responsiveMode! <= ResponsiveMode.medium : isBeakVisible;
    /**
     * When useTargetWidth is true, get the width of the target element and apply it for the context menu container
     */
    let contextMenuStyle;
    const targetAsHtmlElement = this._target as HTMLElement;
    if ((useTargetWidth || useTargetAsMinWidth) && targetAsHtmlElement && targetAsHtmlElement.offsetWidth) {
      const targetBoundingRect = targetAsHtmlElement.getBoundingClientRect();
      const targetWidth = targetBoundingRect.width - 2 /* Accounts for 1px border */;

      if (useTargetWidth) {
        contextMenuStyle = {
          width: targetWidth
        };
      } else if (useTargetAsMinWidth) {
        contextMenuStyle = {
          minWidth: targetWidth
        };
      }
    }

    // The menu should only return if items were provided, if no items were provided then it should not appear.
    if (items && items.length > 0) {
      let indexCorrection = 0;
      let totalItemCount = 0;
      for (const item of items) {
        if (item.itemType !== ContextualMenuItemType.Divider &&
          item.itemType !== ContextualMenuItemType.Header) {
          const itemCount = item.customOnRenderListLength ? item.customOnRenderListLength : 1;
          totalItemCount += itemCount;
        }
      }
      return (
        <Callout
          { ...calloutProps }
          target={ useTargetPoint ? targetPoint : target }
          isBeakVisible={ isBeakVisible }
          beakWidth={ beakWidth }
          directionalHint={ directionalHint }
          directionalHintForRTL={ directionalHintForRTL }
          gapSpace={ gapSpace }
          coverTarget={ coverTarget }
          doNotLayer={ doNotLayer }
          className={ css('ms-ContextualMenu-Callout', calloutProps ? calloutProps.className : undefined) }
          setInitialFocus={ shouldFocusOnMount }
          onDismiss={ this.props.onDismiss }
          onScroll={ this._onScroll }
          bounds={ bounds }
          directionalHintFixed={ directionalHintFixed }
          hidden={ this.props.hidden }
        >
          <div
            role={ 'menu' }
            aria-label={ ariaLabel }
            aria-labelledby={ labelElementId }
            style={ contextMenuStyle }
            ref={ (host: HTMLDivElement) => this._host = host }
            id={ id }
            className={ this._classNames.container }
            tabIndex={ shouldFocusOnContainer ? 0 : -1 }
            onKeyDown={ this._onMenuKeyDown }
          >
            { title && <div className={ this._classNames.title } role='heading' aria-level={ 1 }> { title } </div> }
            { (items && items.length) ? (
              <FocusZone
                { ...this._adjustedFocusZoneProps }
                className={ this._classNames.root }
                isCircularNavigation={ true }
                handleTabKey={ FocusZoneTabbableElements.all }
              >
                <ul
                  className={ this._classNames.list }
                  onKeyDown={ this._onKeyDown }
                  role='presentation'
                >
                  { items.map((item, index) => {
                    const menuItem = this._renderMenuItem(item, index, indexCorrection, totalItemCount, hasCheckmarks, hasIcons);
                    if (item.itemType !== ContextualMenuItemType.Divider &&
                      item.itemType !== ContextualMenuItemType.Header) {
                      const indexIncrease = item.customOnRenderListLength ? item.customOnRenderListLength : 1;
                      indexCorrection += indexIncrease;
                    }
                    return menuItem;
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

  private _onMenuOpened() {
    this._events.on(this._targetWindow, 'resize', this.dismiss);
    this.props.onMenuOpened && this.props.onMenuOpened(this.props);
  }

  private _onMenuClosed() {
    this._events.off(this._targetWindow, 'resize', this.dismiss);
    this._previousActiveElement && this._async.setTimeout(() => { this._previousActiveElement && this._previousActiveElement!.focus(); }, 0);
  }

  /**
   * Gets the focusZoneDirection by using the arrowDirection if specified,
   * the direction specificed in the focusZoneProps, or defaults to FocusZoneDirection.vertical
   */
  private _getFocusZoneDirection() {
    const {
      arrowDirection,
      focusZoneProps
    } = this.props;
    return arrowDirection !== undefined ? arrowDirection :
      focusZoneProps && focusZoneProps.direction !== undefined ? focusZoneProps.direction : FocusZoneDirection.vertical;
  }

  private _onRenderSubMenu(subMenuProps: IContextualMenuProps) {
    return <ContextualMenu { ...subMenuProps } />;
  }

  private _renderMenuItem(item: IContextualMenuItem, index: number, focusableElementIndex: number, totalItemCount: number, hasCheckmarks: boolean, hasIcons: boolean): React.ReactNode {
    const renderedItems: React.ReactNode[] = [];
    const iconProps = this._getIconProps(item);
    // We only send a dividerClassName when the item to be rendered is a divider. For all other cases, the default divider style is used.
    const dividerClassName = item.itemType === ContextualMenuItemType.Divider ? item.className : undefined;
    const subMenuIconClassName = item.submenuIconProps ? item.submenuIconProps.className : '';
    const getClassNames = item.getItemClassNames || getItemClassNames;
    const itemClassNames = getClassNames(
      this.props.theme!,
      isItemDisabled(item),
      (this.state.expandedMenuItemKey === item.key),
      !!getIsChecked(item),
      !!item.href,
      (iconProps.iconName !== 'None'),
      item.className,
      dividerClassName,
      iconProps.className,
      subMenuIconClassName,
      item.primaryDisabled
    );

    if (item.name === '-') {
      item.itemType = ContextualMenuItemType.Divider;
    }
    switch (item.itemType) {
      case ContextualMenuItemType.Divider:
        renderedItems.push(this._renderSeparator(index, itemClassNames));
        break;
      case ContextualMenuItemType.Header:
        renderedItems.push(this._renderSeparator(index, itemClassNames));
        const headerItem = this._renderHeaderMenuItem(item, itemClassNames, index, hasCheckmarks, hasIcons);
        renderedItems.push(this._renderListItem(headerItem, item.key || index, itemClassNames, item.title));
        break;
      case ContextualMenuItemType.Section:
        renderedItems.push(this._renderSectionItem(item, itemClassNames, index, hasCheckmarks, hasIcons));
        break;
      default:
        const menuItem = this._renderNormalItem(item, itemClassNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons);
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
            <ul className={ this._classNames.list } role='presentation'>
              { section.topDivider && this._renderSeparator(index, menuClassNames, true, true) }
              { headerItem && this._renderListItem(headerItem, item.key || index, menuClassNames, item.title) }
              { section.items.map((contextualMenuItem, itemsIndex) => (
                this._renderMenuItem(contextualMenuItem, itemsIndex, itemsIndex, section.items.length, hasCheckmarks, hasIcons)
              )) }
              { section.bottomDivider && this._renderSeparator(index, menuClassNames, false, true) }
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

  private _renderSeparator(index: number, classNames: IMenuItemClassNames, top?: boolean, fromSection?: boolean): React.ReactNode {
    if (fromSection || index > 0) {
      return (
        <li
          role='separator'
          key={ 'separator-' + index + (top === undefined ? '' : (top ? '-top' : '-bottom')) }
          className={ classNames.divider }
        />
      );
    }
    return null;
  }

  private _renderNormalItem(item: IContextualMenuItem, classNames: IMenuItemClassNames, index: number, focusableElementIndex: number, totalItemCount: number, hasCheckmarks: boolean, hasIcons: boolean): React.ReactNode {
    if (item.onRender) {
      return [item.onRender({ 'aria-posinset': focusableElementIndex + 1, 'aria-setsize': totalItemCount, ...item }, this.dismiss)];
    }
    if (item.href) {
      return this._renderAnchorMenuItem(item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons);
    }

    if (item.split && hasSubmenu(item)) {
      return this._renderSplitButton(item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons);
    }

    return this._renderButtonItem(item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons);
  }

  private _renderHeaderMenuItem(item: IContextualMenuItem, classNames: IMenuItemClassNames, index: number, hasCheckmarks: boolean, hasIcons: boolean): React.ReactNode {
    const { contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem } = this.props;

    return (
      <div className={ this._classNames.header } style={ item.style } role='heading' aria-level={ this.props.title ? 2 : 1 }>
        <ChildrenRenderer
          item={ item }
          classNames={ classNames }
          index={ index }
          onCheckmarkClick={ hasCheckmarks ? this._onItemClick : undefined }
          hasIcons={ hasIcons }
        />
      </div>);
  }

  private _renderAnchorMenuItem(item: IContextualMenuItem, classNames: IMenuItemClassNames, index: number, focusableElementIndex: number, totalItemCount: number, hasCheckmarks: boolean, hasIcons: boolean): React.ReactNode {
    const { contextualMenuItemAs } = this.props;
    const { expandedMenuItemKey } = this.state;
    return (
      <ContextualMenuAnchor
        item={ item }
        classNames={ classNames }
        index={ index }
        focusableElementIndex={ focusableElementIndex }
        totalItemCount={ totalItemCount }
        hasCheckmarks={ hasCheckmarks }
        hasIcons={ hasIcons }
        contextualMenuItemAs={ contextualMenuItemAs }
        onItemMouseEnter={ this._onItemMouseEnterBase }
        onItemMouseLeave={ this._onMouseItemLeave }
        onItemMouseMove={ this._onItemMouseMoveBase }
        onItemMouseDown={ this._onItemMouseDown }
        executeItemClick={ this._executeItemClick }
        onItemClick={ this._onAnchorClick }
        onItemKeyDown={ this._onItemKeyDown }
        getSubMenuId={ this._getSubMenuId }
        expandedMenuItemKey={ expandedMenuItemKey }
        openSubMenu={ this._onItemSubMenuExpand }
        dismissSubMenu={ this._onSubMenuDismiss }
        dismissMenu={ this.dismiss }
      />
    );
  }

  private _renderButtonItem(
    item: IContextualMenuItem,
    classNames: IMenuItemClassNames,
    index: number,
    focusableElementIndex: number,
    totalItemCount: number,
    hasCheckmarks?: boolean,
    hasIcons?: boolean) {
    const { contextualMenuItemAs } = this.props;
    const { expandedMenuItemKey } = this.state;

    return (
      <ContextualMenuButton
        item={ item }
        classNames={ classNames }
        index={ index }
        focusableElementIndex={ focusableElementIndex }
        totalItemCount={ totalItemCount }
        hasCheckmarks={ hasCheckmarks }
        hasIcons={ hasIcons }
        contextualMenuItemAs={ contextualMenuItemAs }
        onItemMouseEnter={ this._onItemMouseEnterBase }
        onItemMouseLeave={ this._onMouseItemLeave }
        onItemMouseMove={ this._onItemMouseMoveBase }
        onItemMouseDown={ this._onItemMouseDown }
        executeItemClick={ this._executeItemClick }
        onItemClick={ this._onItemClick }
        onItemClickBase={ this._onItemClickBase }
        onItemKeyDown={ this._onItemKeyDown }
        getSubMenuId={ this._getSubMenuId }
        expandedMenuItemKey={ expandedMenuItemKey }
        openSubMenu={ this._onItemSubMenuExpand }
        dismissSubMenu={ this._onSubMenuDismiss }
        dismissMenu={ this.dismiss }
      />
    );
  }

  private _renderSplitButton(
    item: IContextualMenuItem,
    classNames: IMenuItemClassNames,
    index: number,
    focusableElementIndex: number,
    totalItemCount: number,
    hasCheckmarks?: boolean,
    hasIcons?: boolean): JSX.Element {
    const { contextualMenuItemAs } = this.props;
    const { expandedMenuItemKey } = this.state;

    return (
      <ContextualMenuSplitButton
        item={ item }
        classNames={ classNames }
        index={ index }
        focusableElementIndex={ focusableElementIndex }
        totalItemCount={ totalItemCount }
        hasCheckmarks={ hasCheckmarks }
        hasIcons={ hasIcons }
        contextualMenuItemAs={ contextualMenuItemAs }
        onItemMouseEnter={ this._onItemMouseEnterBase }
        onItemMouseLeave={ this._onMouseItemLeave }
        onItemMouseMove={ this._onItemMouseMoveBase }
        onItemMouseDown={ this._onItemMouseDown }
        executeItemClick={ this._executeItemClick }
        onItemClick={ this._onItemClick }
        onItemClickBase={ this._onItemClickBase }
        onItemKeyDown={ this._onItemKeyDown }
        openSubMenu={ this._onItemSubMenuExpand }
        dismissSubMenu={ this._onSubMenuDismiss }
        dismissMenu={ this.dismiss }
        expandedMenuItemKey={ expandedMenuItemKey }
        onTap={ this._onPointerAndTouchEvent }
      />
    );
  }

  private _getIconProps(item: IContextualMenuItem): IIconProps {
    const iconProps: IIconProps = item.iconProps ? item.iconProps : {
      iconName: item.icon
    };
    return iconProps;
  }

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    if (ev.which === KeyCodes.escape ||
      ev.altKey ||
      ev.metaKey ||
      this._shouldCloseSubMenu(ev)) {
      // When a user presses escape, we will try to refocus the previous focused element.
      this._isFocusingPreviousElement = true;
      ev.preventDefault();
      ev.stopPropagation();
      this.dismiss(ev);
    }
  }

  /**
   * Checks if the submenu should be closed
   */
  private _shouldCloseSubMenu = (ev: React.KeyboardEvent<HTMLElement>): boolean => {
    const submenuCloseKey = getRTL() ? KeyCodes.right : KeyCodes.left;

    if (ev.which !== submenuCloseKey || !this.props.isSubMenu) {
      return false;
    }

    return this._adjustedFocusZoneProps.direction === FocusZoneDirection.vertical ||
      (!!this._adjustedFocusZoneProps.checkForNoWrap && !shouldWrapFocus(ev.target as HTMLElement, 'data-no-horizontal-wrap'));
  }

  private _onMenuKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    if (ev.which === KeyCodes.escape || ev.altKey || ev.metaKey) {
      this._isFocusingPreviousElement = true;
      ev.preventDefault();
      ev.stopPropagation();
      this.dismiss(ev);
      return;
    }

    if (!this._host) {
      return;
    }

    const elementToFocus = ev.which === KeyCodes.up ?
      getLastFocusable(this._host, (this._host.lastChild as HTMLElement), true) :
      ev.which === KeyCodes.down ?
        getFirstFocusable(this._host, (this._host.firstChild as HTMLElement), true) :
        null;

    if (elementToFocus) {
      elementToFocus.focus();
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  /**
   * Scroll handler for the callout to make sure the mouse events
   * for updating focus are not interacting during scroll
   */
  private _onScroll = (): void => {
    if (!this._isScrollIdle && this._scrollIdleTimeoutId !== undefined) {
      this._async.clearTimeout(this._scrollIdleTimeoutId);
      this._scrollIdleTimeoutId = undefined;
    } else {
      this._isScrollIdle = false;
    }

    this._scrollIdleTimeoutId = this._async.setTimeout(() => { this._isScrollIdle = true; }, NavigationIdleDelay);
  }

  private _onItemMouseEnterBase = (item: any, ev: React.MouseEvent<HTMLElement>, target?: HTMLElement): void => {
    if (!this._isScrollIdle) {
      return;
    }

    this._updateFocusOnMouseEvent(item, ev, target);
  }

  private _onItemMouseMoveBase = (item: any, ev: React.MouseEvent<HTMLElement>, target: HTMLElement): void => {

    const targetElement = ev.currentTarget as HTMLElement;

    if (!this._isScrollIdle ||
      this._enterTimerId !== undefined ||
      targetElement === this._targetWindow.document.activeElement as HTMLElement) {
      return;
    }

    this._updateFocusOnMouseEvent(item, ev, target);
  }
  private _onMouseItemLeave = (item: any, ev: React.MouseEvent<HTMLElement>): void => {
    if (!this._isScrollIdle) {
      return;
    }

    if (this._enterTimerId !== undefined) {
      this._async.clearTimeout(this._enterTimerId);
      this._enterTimerId = undefined;
    }

    if (this.state.expandedMenuItemKey !== undefined) {
      return;
    }

    /**
     * IE11 focus() method forces parents to scroll to top of element.
     * Edge and IE expose a setActive() function for focusable divs that
     * sets the page focus but does not scroll the parent element.
     */
    if ((this._host as any).setActive) {
      (this._host as any).setActive();
    } else {
      this._host.focus();
    }
  }

  /**
   * Handles updating focus when mouseEnter or mouseMove fire.
   * As part of updating focus, This function will also update
   * the expand/collapse state accordingly.
   */
  private _updateFocusOnMouseEvent(item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>, target?: HTMLElement) {
    const targetElement = target ? target : ev.currentTarget as HTMLElement;
    const { subMenuHoverDelay: timeoutDuration = NavigationIdleDelay } = this.props;

    if (item.key === this.state.expandedMenuItemKey) {
      return;
    }

    if (this._enterTimerId !== undefined) {
      this._async.clearTimeout(this._enterTimerId);
      this._enterTimerId = undefined;
    }

    // If the menu is not expanded we can update focus without any delay
    if (this.state.expandedMenuItemKey === undefined) {
      targetElement.focus();
    }

    // Delay updating expanding/dismissing the submenu
    // and only set focus if we have not already done so
    if (hasSubmenu(item)) {
      ev.stopPropagation();
      this._enterTimerId = this._async.setTimeout(() => {
        targetElement.focus();
        this.setState({
          expandedByMouseClick: true
        });
        this._onItemSubMenuExpand(item, targetElement);
        this._enterTimerId = undefined;
      }, timeoutDuration);
    } else {
      this._enterTimerId = this._async.setTimeout(() => {
        this._onSubMenuDismiss(ev);
        targetElement.focus();
        this._enterTimerId = undefined;
      }, timeoutDuration);
    }
  }

  private _onItemMouseDown = (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>): void => {
    if (item.onMouseDown) {
      item.onMouseDown(item, ev);
    }
  }

  private _onItemClick = (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    this._onItemClickBase(item, ev, ev.currentTarget as HTMLElement);
  }

  private _onItemClickBase = (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, target: HTMLElement): void => {
    const items = getSubmenuItems(item);

    // Cancel a async menu item hover timeout action from being taken and instead
    // just trigger the click event instead.
    this._cancelSubMenuTimer();

    if (!hasSubmenu(item) && (!items || !items.length)) { // This is an item without a menu. Click it.
      this._executeItemClick(item, ev);
    } else {
      if (item.key === this.state.expandedMenuItemKey) { // This has an expanded sub menu. collapse it.
        this._onSubMenuDismiss(ev);
      } else { // This has a collapsed sub menu. Expand it.
        this.setState({
          // When Edge + Narrator are used together (regardless of if the button is in a form or not), pressing
          // "Enter" fires this method and not _onMenuKeyDown. Checking ev.nativeEvent.detail differentiates
          // between a real click event and a keypress event.
          expandedByMouseClick: (ev.nativeEvent.detail !== 0)
        });
        this._onItemSubMenuExpand(item, target);
      }
    }

    ev.stopPropagation();
    ev.preventDefault();
  }

  private _onAnchorClick = (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) => {
    this._executeItemClick(item, ev);
    ev.stopPropagation();
  }

  private _executeItemClick = (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    if (item.disabled || item.isDisabled) {
      return;
    }

    let dismiss = false;
    if (item.onClick) {
      dismiss = !!item.onClick(ev, item);
    } else if (this.props.onItemClick) {
      dismiss = !!this.props.onItemClick(ev, item);
    }

    (dismiss || !ev.defaultPrevented) && this.dismiss(ev, true);
  }

  private _onItemKeyDown = (item: any, ev: React.KeyboardEvent<HTMLElement>): void => {
    const openKey = getRTL() ? KeyCodes.left : KeyCodes.right;

    if ((ev.which === openKey || ev.which === KeyCodes.enter) && !item.disabled) {
      this.setState({
        expandedByMouseClick: false
      });
      this._onItemSubMenuExpand(item, ev.currentTarget as HTMLElement);
      ev.preventDefault();
    }
  }

  // Cancel a async menu item hover timeout action from being taken and instead
  // do new upcoming behavior
  private _cancelSubMenuTimer = () => {
    if (this._enterTimerId !== undefined) {
      this._async.clearTimeout(this._enterTimerId);
      this._enterTimerId = undefined;
    }
  }

  private _onItemSubMenuExpand = (item: IContextualMenuItem, target: HTMLElement): void => {
    if (this.state.expandedMenuItemKey !== item.key) {

      if (this.state.expandedMenuItemKey) {
        this._onSubMenuDismiss();
      }

      // Focus the target to ensure when we close it, we're focusing on the correct element.
      target.focus();
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
        shouldFocusOnContainer: this.state.expandedByMouseClick,
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
    const { items } = this.props;
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

  private _onSubMenuDismiss = (ev?: any, dismissAll?: boolean): void => {
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

  private _setTargetWindowAndElement(target: Element | string | MouseEvent | IPoint): void {
    if (target) {
      if (typeof target === 'string') {
        const currentDoc: Document = getDocument()!;
        this._target = currentDoc ? currentDoc.querySelector(target) as Element : null;
        this._targetWindow = getWindow()!;
      } else if ((target as MouseEvent).stopPropagation) {
        this._targetWindow = getWindow((target as MouseEvent).toElement as HTMLElement)!;
        this._target = target;
      } else if ((target as IPoint).x !== undefined && (target as IPoint).y !== undefined) {
        this._targetWindow = getWindow()!;
        this._target = target;
      } else {
        const targetElement: Element = target as Element;
        this._targetWindow = getWindow(targetElement)!;
        this._target = target;
      }
    } else {
      this._targetWindow = getWindow()!;
    }
  }

  private _getSubMenuId = (item: IContextualMenuItem): string | undefined => {
    let { subMenuId } = this.state;

    if (item.subMenuProps && item.subMenuProps.id) {
      subMenuId = item.subMenuProps.id;
    }

    return subMenuId;
  }

  private _onPointerAndTouchEvent = (ev: React.TouchEvent<HTMLElement> | PointerEvent) => {
    this._cancelSubMenuTimer();
  }
}
