import * as React from 'react';
import {
  IContextualMenuProps,
  IContextualMenuItem,
  ContextualMenuItemType,
  IContextualMenuListProps,
  IContextualMenuStyleProps,
  IContextualMenuStyles,
  IContextualMenuItemRenderProps,
} from './ContextualMenu.types';
import { DirectionalHint } from '../../common/DirectionalHint';
import { FocusZone, FocusZoneDirection, IFocusZoneProps, FocusZoneTabbableElements } from '../../FocusZone';
import { IMenuItemClassNames, IContextualMenuClassNames } from './ContextualMenu.classNames';
import {
  divProperties,
  getNativeProps,
  shallowCompare,
  warnDeprecations,
  Async,
  EventGroup,
  assign,
  classNamesFunction,
  css,
  getDocument,
  getFirstFocusable,
  getId,
  getLastFocusable,
  getRTL,
  getWindow,
  IRenderFunction,
  Point,
  KeyCodes,
  shouldWrapFocus,
  IStyleFunctionOrObject,
  isIOS,
  isMac,
  initializeComponentRef,
  memoizeFunction,
} from '../../Utilities';
import { hasSubmenu, getIsChecked, isItemDisabled } from '../../utilities/contextualMenu/index';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import { Callout, ICalloutContentStyleProps, ICalloutContentStyles } from '../../Callout';
import { ContextualMenuItem } from './ContextualMenuItem';
import {
  ContextualMenuSplitButton,
  ContextualMenuButton,
  ContextualMenuAnchor,
} from './ContextualMenuItemWrapper/index';
import { IProcessedStyleSet, concatStyleSetsWithProps } from '../../Styling';
import { IContextualMenuItemStyleProps, IContextualMenuItemStyles } from './ContextualMenuItem.types';
import { getItemStyles } from './ContextualMenu.classNames';
import { Target } from '@uifabric/react-hooks';

const getClassNames = classNamesFunction<IContextualMenuStyleProps, IContextualMenuStyles>();
const getContextualMenuItemClassNames = classNamesFunction<IContextualMenuItemStyleProps, IContextualMenuItemStyles>();

export interface IContextualMenuState {
  expandedMenuItemKey?: string;
  /** True if the menu was expanded by mouse click OR hover (as opposed to by keyboard) */
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

export function getSubmenuItems(item: IContextualMenuItem): IContextualMenuItem[] | undefined {
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

const NavigationIdleDelay = 250; /* ms */

const COMPONENT_NAME = 'ContextualMenu';

const _getMenuItemStylesFunction = memoizeFunction(
  (
    ...styles: (IStyleFunctionOrObject<IContextualMenuItemStyleProps, IContextualMenuItemStyles> | undefined)[]
  ): IStyleFunctionOrObject<IContextualMenuItemStyleProps, IContextualMenuItemStyles> => {
    return (styleProps: IContextualMenuItemStyleProps) =>
      concatStyleSetsWithProps(styleProps, getItemStyles, ...styles);
  },
);

@withResponsiveMode
export class ContextualMenuBase extends React.Component<IContextualMenuProps, IContextualMenuState> {
  // The default ContextualMenu properties have no items and beak, the default submenu direction is right and top.
  public static defaultProps: IContextualMenuProps = {
    items: [],
    shouldFocusOnMount: true,
    gapSpace: 0,
    directionalHint: DirectionalHint.bottomAutoEdge,
    beakWidth: 16,
  };

  private _async: Async;
  private _events: EventGroup;
  private _id: string;
  private _host: HTMLElement;
  private _previousActiveElement: HTMLElement | undefined;
  private _enterTimerId: number | undefined;
  private _targetWindow: Window;
  private _target: Element | MouseEvent | Point | null;
  private _isScrollIdle: boolean;
  private _scrollIdleTimeoutId: number | undefined;
  /** True if the most recent keydown event was for alt (option) or meta (command). */
  private _lastKeyDownWasAltOrMeta: boolean | undefined;
  private _shouldUpdateFocusOnMouseEvent: boolean;
  private _gotMouseMove: boolean;
  private _mounted = false;
  private _focusingPreviousElement: boolean;

  private _adjustedFocusZoneProps: IFocusZoneProps;

  // eslint-disable-next-line deprecation/deprecation
  private _classNames: IProcessedStyleSet<IContextualMenuStyles> | IContextualMenuClassNames;

  constructor(props: IContextualMenuProps) {
    super(props);

    this._async = new Async(this);
    this._events = new EventGroup(this);
    initializeComponentRef(this);

    warnDeprecations(COMPONENT_NAME, props, {
      getMenuClassNames: 'styles',
    });

    this.state = {
      contextualMenuItems: undefined,
      subMenuId: getId('ContextualMenu'),
    };

    this._id = props.id || getId('ContextualMenu');
    this._focusingPreviousElement = false;
    this._isScrollIdle = true;
    this._shouldUpdateFocusOnMouseEvent = !this.props.delayUpdateFocusOnHover;
    this._gotMouseMove = false;
  }

  public dismiss = (ev?: any, dismissAll?: boolean) => {
    const { onDismiss } = this.props;

    if (onDismiss) {
      onDismiss(ev, dismissAll);
    }
  };

  public shouldComponentUpdate(newProps: IContextualMenuProps, newState: IContextualMenuState): boolean {
    if (!newProps.shouldUpdateWhenHidden && this.props.hidden && newProps.hidden) {
      // Do not update when hidden.
      return false;
    }

    return !shallowCompare(this.props, newProps) || !shallowCompare(this.state, newState);
  }

  public UNSAFE_componentWillUpdate(newProps: IContextualMenuProps): void {
    if (newProps.target !== this.props.target) {
      const newTarget = newProps.target;
      this._setTargetWindowAndElement(newTarget!);
    }

    if (this._isHidden(newProps) !== this._isHidden(this.props)) {
      if (this._isHidden(newProps)) {
        this._onMenuClosed();
      } else {
        this._onMenuOpened();
        this._previousActiveElement = this._targetWindow
          ? (this._targetWindow.document.activeElement as HTMLElement)
          : undefined;
      }
    }
    if (newProps.delayUpdateFocusOnHover !== this.props.delayUpdateFocusOnHover) {
      // update shouldUpdateFocusOnMouseEvent to follow what was passed in
      this._shouldUpdateFocusOnMouseEvent = !newProps.delayUpdateFocusOnHover;

      // If shouldUpdateFocusOnMouseEvent is false, we need to reset gotMouseMove to false
      this._gotMouseMove = this._shouldUpdateFocusOnMouseEvent && this._gotMouseMove;
    }
  }

  // Invoked once, both on the client and server, immediately before the initial rendering occurs.
  public UNSAFE_componentWillMount() {
    const target = this.props.target;
    this._setTargetWindowAndElement(target!);
    if (!this.props.hidden) {
      this._previousActiveElement = this._targetWindow
        ? (this._targetWindow.document.activeElement as HTMLElement)
        : undefined;
    }
  }

  // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
  public componentDidMount(): void {
    if (!this.props.hidden) {
      this._onMenuOpened();
    }

    this._mounted = true;
  }

  // Invoked immediately before a component is unmounted from the DOM.
  public componentWillUnmount() {
    if (this.props.onMenuDismissed) {
      this.props.onMenuDismissed(this.props);
    }

    this._events.dispose();
    this._async.dispose();
    this._mounted = false;
  }

  public render(): JSX.Element | null {
    let { isBeakVisible } = this.props;

    const {
      items,
      labelElementId,
      id,
      className,
      beakWidth,
      directionalHint,
      directionalHintForRTL,
      alignTargetEdge,
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
      styles,
      theme,
      calloutProps,
      onRenderSubMenu = this._onRenderSubMenu,
      onRenderMenuList = this._onRenderMenuList,
      focusZoneProps,
      // eslint-disable-next-line deprecation/deprecation
      getMenuClassNames,
    } = this.props;

    this._classNames = getMenuClassNames
      ? getMenuClassNames(theme!, className)
      : getClassNames(styles, {
          theme: theme!,
          className: className,
        });

    const hasIcons = itemsHaveIcons(items);

    function itemsHaveIcons(contextualMenuItems: IContextualMenuItem[]): boolean {
      for (const item of contextualMenuItems) {
        if (item.iconProps) {
          return true;
        }

        if (
          item.itemType === ContextualMenuItemType.Section &&
          item.sectionProps &&
          itemsHaveIcons(item.sectionProps.items)
        ) {
          return true;
        }
      }

      return false;
    }

    this._adjustedFocusZoneProps = { ...focusZoneProps, direction: this._getFocusZoneDirection() };

    const hasCheckmarks = canAnyMenuItemsCheck(items);
    const submenuProps = this.state.expandedMenuItemKey && this.props.hidden !== true ? this._getSubmenuProps() : null;

    isBeakVisible = isBeakVisible === undefined ? this.props.responsiveMode! <= ResponsiveMode.medium : isBeakVisible;
    /**
     * When useTargetWidth is true, get the width of the target element and apply it for the context menu container
     */
    let contextMenuStyle;
    const targetAsHtmlElement = this._target as HTMLElement;
    if ((useTargetWidth || useTargetAsMinWidth) && targetAsHtmlElement && targetAsHtmlElement.offsetWidth) {
      const targetBoundingRect = targetAsHtmlElement.getBoundingClientRect();
      const targetWidth = targetBoundingRect.width - 2; /* Accounts for 1px border */

      if (useTargetWidth) {
        contextMenuStyle = {
          width: targetWidth,
        };
      } else if (useTargetAsMinWidth) {
        contextMenuStyle = {
          minWidth: targetWidth,
        };
      }
    }

    // The menu should only return if items were provided, if no items were provided then it should not appear.
    if (items && items.length > 0) {
      let totalItemCount = 0;
      for (const item of items) {
        if (item.itemType !== ContextualMenuItemType.Divider && item.itemType !== ContextualMenuItemType.Header) {
          const itemCount = item.customOnRenderListLength ? item.customOnRenderListLength : 1;
          totalItemCount += itemCount;
        }
      }

      const calloutStyles = this._classNames.subComponentStyles
        ? (this._classNames.subComponentStyles.callout as IStyleFunctionOrObject<
            ICalloutContentStyleProps,
            ICalloutContentStyles
          >)
        : undefined;

      return (
        <Callout
          styles={calloutStyles}
          onRestoreFocus={this._tryFocusPreviousActiveElement}
          {...calloutProps}
          target={target}
          isBeakVisible={isBeakVisible}
          beakWidth={beakWidth}
          directionalHint={directionalHint}
          directionalHintForRTL={directionalHintForRTL}
          gapSpace={gapSpace}
          coverTarget={coverTarget}
          doNotLayer={doNotLayer}
          className={css('ms-ContextualMenu-Callout', calloutProps && calloutProps.className)}
          setInitialFocus={shouldFocusOnMount}
          onDismiss={this.props.onDismiss}
          onScroll={this._onScroll}
          bounds={bounds}
          directionalHintFixed={directionalHintFixed}
          alignTargetEdge={alignTargetEdge}
          hidden={this.props.hidden}
        >
          <div
            style={contextMenuStyle}
            ref={(host: HTMLDivElement) => (this._host = host)}
            id={id}
            className={this._classNames.container}
            tabIndex={shouldFocusOnContainer ? 0 : -1}
            onKeyDown={this._onMenuKeyDown}
            onKeyUp={this._onKeyUp}
            onFocusCapture={this._onMenuFocusCapture}
            aria-label={ariaLabel}
            aria-labelledby={labelElementId}
            role={'menu'}
          >
            {title && <div className={this._classNames.title}> {title} </div>}
            {items && items.length ? (
              <FocusZone
                className={this._classNames.root}
                isCircularNavigation={true}
                handleTabKey={FocusZoneTabbableElements.all}
                {...this._adjustedFocusZoneProps}
              >
                {onRenderMenuList(
                  {
                    ariaLabel,
                    items,
                    totalItemCount,
                    hasCheckmarks,
                    hasIcons,
                    defaultMenuItemRenderer: this._defaultMenuItemRenderer,
                    labelElementId,
                  },
                  this._onRenderMenuList,
                )}
              </FocusZone>
            ) : null}
            {submenuProps && onRenderSubMenu(submenuProps, this._onRenderSubMenu)}
          </div>
        </Callout>
      );
    } else {
      return null;
    }
  }

  /**
   * Return whether the contextual menu is hidden.
   * Undefined value for hidden is equivalent to hidden being false.
   * @param props - Props for the component
   */
  private _isHidden(props: IContextualMenuProps) {
    return !!props.hidden;
  }

  private _onMenuOpened() {
    this._events.on(this._targetWindow, 'resize', this.dismiss);
    this._shouldUpdateFocusOnMouseEvent = !this.props.delayUpdateFocusOnHover;
    this._gotMouseMove = false;
    this.props.onMenuOpened && this.props.onMenuOpened(this.props);
  }

  private _onMenuClosed() {
    this._events.off(this._targetWindow, 'resize', this.dismiss);

    // This is kept for backwards compatability with hidden for right now.
    // This preserves the way that this behaved in the past
    // TODO find a better way to handle this by using the same conventions that
    // Popup uses to determine if focus is contained when dismissal occurs
    this._tryFocusPreviousActiveElement({
      containsFocus: this._focusingPreviousElement,
      documentContainsFocus: this._targetWindow.document.hasFocus(),
      originalElement: this._previousActiveElement,
    });

    this._focusingPreviousElement = false;

    if (this.props.onMenuDismissed) {
      this.props.onMenuDismissed(this.props);
    }

    this._shouldUpdateFocusOnMouseEvent = !this.props.delayUpdateFocusOnHover;

    // We need to dismiss any submenu related state properties,
    // so that when the menu is shown again, the submenu is collapsed
    this.setState({
      expandedByMouseClick: undefined,
      dismissedMenuItemKey: undefined,
      expandedMenuItemKey: undefined,
      submenuTarget: undefined,
    });
  }

  private _tryFocusPreviousActiveElement = (options: {
    containsFocus: boolean;
    documentContainsFocus: boolean;
    originalElement: HTMLElement | Window | undefined;
  }) => {
    if (this.props.onRestoreFocus) {
      this.props.onRestoreFocus(options);
    } else {
      if (options && options.containsFocus && this._previousActiveElement) {
        // Make sure that the focus method actually exists
        // In some cases the object might exist but not be a real element.
        // This is primarily for IE 11 and should be removed once IE 11 is no longer in use.
        if (this._previousActiveElement.focus) {
          this._previousActiveElement.focus();
        }
      }
    }
  };

  /**
   * Gets the focusZoneDirection by using the arrowDirection if specified,
   * the direction specificed in the focusZoneProps, or defaults to FocusZoneDirection.vertical
   */
  private _getFocusZoneDirection() {
    const { focusZoneProps } = this.props;
    return focusZoneProps && focusZoneProps.direction !== undefined
      ? focusZoneProps.direction
      : FocusZoneDirection.vertical;
  }

  private _onRenderSubMenu(
    subMenuProps: IContextualMenuProps,
    defaultRender?: IRenderFunction<IContextualMenuProps>,
  ): JSX.Element {
    throw Error(
      'ContextualMenuBase: onRenderSubMenu callback is null or undefined. ' +
        'Please ensure to set `onRenderSubMenu` property either manually or with `styled` helper.',
    );
  }

  private _onRenderMenuList = (
    menuListProps: IContextualMenuListProps,
    defaultRender?: IRenderFunction<IContextualMenuListProps>,
  ): JSX.Element => {
    let indexCorrection = 0;
    const { items, totalItemCount, hasCheckmarks, hasIcons } = menuListProps;

    return (
      <ul className={this._classNames.list} onKeyDown={this._onKeyDown} onKeyUp={this._onKeyUp} role={'presentation'}>
        {items.map((item, index) => {
          const menuItem = this._renderMenuItem(item, index, indexCorrection, totalItemCount, hasCheckmarks, hasIcons);
          if (item.itemType !== ContextualMenuItemType.Divider && item.itemType !== ContextualMenuItemType.Header) {
            const indexIncrease = item.customOnRenderListLength ? item.customOnRenderListLength : 1;
            indexCorrection += indexIncrease;
          }
          return menuItem;
        })}
      </ul>
    );
  };

  /**
   * !!!IMPORTANT!!! Avoid mutating `item: IContextualMenuItem` argument. It will
   * cause the menu items to always re-render because the component update is based on shallow comparison.
   */
  private _renderMenuItem = (
    item: IContextualMenuItem,
    index: number,
    focusableElementIndex: number,
    totalItemCount: number,
    hasCheckmarks: boolean,
    hasIcons: boolean,
  ): JSX.Element => {
    const renderedItems: React.ReactNode[] = [];
    const iconProps = item.iconProps || { iconName: 'None' };
    const {
      getItemClassNames, // eslint-disable-line deprecation/deprecation
      itemProps,
    } = item;
    const styles = itemProps ? itemProps.styles : undefined;

    // We only send a dividerClassName when the item to be rendered is a divider.
    // For all other cases, the default divider style is used.
    const dividerClassName = item.itemType === ContextualMenuItemType.Divider ? item.className : undefined;
    const subMenuIconClassName = item.submenuIconProps ? item.submenuIconProps.className : '';

    // eslint-disable-next-line deprecation/deprecation
    let itemClassNames: IMenuItemClassNames;

    // IContextualMenuItem#getItemClassNames for backwards compatibility
    // otherwise uses mergeStyles for class names.
    if (getItemClassNames) {
      itemClassNames = getItemClassNames(
        this.props.theme!,
        isItemDisabled(item),
        this.state.expandedMenuItemKey === item.key,
        !!getIsChecked(item),
        !!item.href,
        iconProps.iconName !== 'None',
        item.className,
        dividerClassName,
        iconProps.className,
        subMenuIconClassName,
        item.primaryDisabled,
      );
    } else {
      const itemStyleProps: IContextualMenuItemStyleProps = {
        theme: this.props.theme!,
        disabled: isItemDisabled(item),
        expanded: this.state.expandedMenuItemKey === item.key,
        checked: !!getIsChecked(item),
        isAnchorLink: !!item.href,
        knownIcon: iconProps.iconName !== 'None',
        itemClassName: item.className,
        dividerClassName,
        iconClassName: iconProps.className,
        subMenuClassName: subMenuIconClassName,
        primaryDisabled: item.primaryDisabled,
      };

      // We need to generate default styles then override if styles are provided
      // since the ContextualMenu currently handles item classNames.
      itemClassNames = getContextualMenuItemClassNames(
        _getMenuItemStylesFunction(this._classNames.subComponentStyles?.menuItem, styles),
        itemStyleProps,
      );
    }

    // eslint-disable-next-line deprecation/deprecation
    if (item.text === '-' || item.name === '-') {
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
        const menuItem = this._renderNormalItem(
          item,
          itemClassNames,
          index,
          focusableElementIndex,
          totalItemCount,
          hasCheckmarks,
          hasIcons,
        );
        renderedItems.push(this._renderListItem(menuItem, item.key || index, itemClassNames, item.title));
        break;
    }

    // Since multiple nodes *could* be rendered, wrap them all in a fragment with this item's key.
    // This ensures the reconciler handles multi-item output per-node correctly and does not re-mount content.
    return <React.Fragment key={item.key}>{renderedItems}</React.Fragment>;
  };

  private _defaultMenuItemRenderer = (item: IContextualMenuItemRenderProps): React.ReactNode => {
    const { index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons } = item;
    return this._renderMenuItem(item, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons);
  };

  private _renderSectionItem(
    sectionItem: IContextualMenuItem,
    // eslint-disable-next-line deprecation/deprecation
    menuClassNames: IMenuItemClassNames,
    index: number,
    hasCheckmarks: boolean,
    hasIcons: boolean,
  ) {
    const sectionProps = sectionItem.sectionProps;
    if (!sectionProps) {
      return;
    }

    let headerItem;
    let groupProps;
    if (sectionProps.title) {
      let headerContextualMenuItem: IContextualMenuItem | undefined = undefined;
      let ariaLabellledby = '';
      if (typeof sectionProps.title === 'string') {
        // Since title is a user-facing string, it needs to be stripped
        // of whitespace in order to build a valid element ID
        const id = this._id + sectionProps.title.replace(/\s/g, '');
        headerContextualMenuItem = {
          key: `section-${sectionProps.title}-title`,
          itemType: ContextualMenuItemType.Header,
          text: sectionProps.title,
          id: id,
        };
        ariaLabellledby = id;
      } else {
        const id = sectionProps.title.id || this._id + sectionProps.title.key.replace(/\s/g, '');
        headerContextualMenuItem = { ...sectionProps.title, id };
        ariaLabellledby = id;
      }

      if (headerContextualMenuItem) {
        groupProps = {
          role: 'group',
          'aria-labelledby': ariaLabellledby,
        };
        headerItem = this._renderHeaderMenuItem(
          headerContextualMenuItem,
          menuClassNames,
          index,
          hasCheckmarks,
          hasIcons,
        );
      }
    }

    if (sectionProps.items && sectionProps.items.length > 0) {
      return (
        <li role="presentation" key={sectionProps.key || sectionItem.key || `section-${index}`}>
          <div {...groupProps}>
            <ul className={this._classNames.list} role="presentation">
              {sectionProps.topDivider && this._renderSeparator(index, menuClassNames, true, true)}
              {headerItem &&
                this._renderListItem(headerItem, sectionItem.key || index, menuClassNames, sectionItem.title)}
              {sectionProps.items.map((contextualMenuItem, itemsIndex) =>
                this._renderMenuItem(
                  contextualMenuItem,
                  itemsIndex,
                  itemsIndex,
                  sectionProps.items.length,
                  hasCheckmarks,
                  hasIcons,
                ),
              )}
              {sectionProps.bottomDivider && this._renderSeparator(index, menuClassNames, false, true)}
            </ul>
          </div>
        </li>
      );
    }
  }

  private _renderListItem(
    content: React.ReactNode,
    key: string | number,
    classNames: IMenuItemClassNames, // eslint-disable-line deprecation/deprecation
    title?: string,
  ) {
    return (
      <li role="presentation" title={title} key={key} className={classNames.item}>
        {content}
      </li>
    );
  }

  private _renderSeparator(
    index: number,
    classNames: IMenuItemClassNames, // eslint-disable-line deprecation/deprecation
    top?: boolean,
    fromSection?: boolean,
  ): React.ReactNode {
    if (fromSection || index > 0) {
      return (
        <li
          role="separator"
          key={'separator-' + index + (top === undefined ? '' : top ? '-top' : '-bottom')}
          className={classNames.divider}
          aria-hidden="true"
        />
      );
    }
    return null;
  }

  private _renderNormalItem(
    item: IContextualMenuItem,
    classNames: IMenuItemClassNames, // eslint-disable-line deprecation/deprecation
    index: number,
    focusableElementIndex: number,
    totalItemCount: number,
    hasCheckmarks: boolean,
    hasIcons: boolean,
  ): React.ReactNode {
    if (item.onRender) {
      return item.onRender(
        { 'aria-posinset': focusableElementIndex + 1, 'aria-setsize': totalItemCount, ...item },
        this.dismiss,
      );
    }
    if (item.href) {
      return this._renderAnchorMenuItem(
        item,
        classNames,
        index,
        focusableElementIndex,
        totalItemCount,
        hasCheckmarks,
        hasIcons,
      );
    }

    if (item.split && hasSubmenu(item)) {
      return this._renderSplitButton(
        item,
        classNames,
        index,
        focusableElementIndex,
        totalItemCount,
        hasCheckmarks,
        hasIcons,
      );
    }

    return this._renderButtonItem(
      item,
      classNames,
      index,
      focusableElementIndex,
      totalItemCount,
      hasCheckmarks,
      hasIcons,
    );
  }

  private _renderHeaderMenuItem(
    item: IContextualMenuItem,
    // eslint-disable-next-line deprecation/deprecation
    classNames: IMenuItemClassNames,
    index: number,
    hasCheckmarks: boolean,
    hasIcons: boolean,
  ): React.ReactNode {
    const { contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem } = this.props;
    const { itemProps, id } = item;
    const divHtmlProperties =
      itemProps && getNativeProps<React.HTMLAttributes<HTMLDivElement>>(itemProps, divProperties);
    return (
      // eslint-disable-next-line deprecation/deprecation
      <div id={id} className={this._classNames.header} {...divHtmlProperties} style={item.style}>
        <ChildrenRenderer
          item={item}
          classNames={classNames}
          index={index}
          onCheckmarkClick={hasCheckmarks ? this._onItemClick : undefined}
          hasIcons={hasIcons}
          {...itemProps}
        />
      </div>
    );
  }

  private _renderAnchorMenuItem(
    item: IContextualMenuItem,
    // eslint-disable-next-line deprecation/deprecation
    classNames: IMenuItemClassNames,
    index: number,
    focusableElementIndex: number,
    totalItemCount: number,
    hasCheckmarks: boolean,
    hasIcons: boolean,
  ): React.ReactNode {
    const { contextualMenuItemAs } = this.props;
    const { expandedMenuItemKey } = this.state;
    return (
      <ContextualMenuAnchor
        item={item}
        classNames={classNames}
        index={index}
        focusableElementIndex={focusableElementIndex}
        totalItemCount={totalItemCount}
        hasCheckmarks={hasCheckmarks}
        hasIcons={hasIcons}
        contextualMenuItemAs={contextualMenuItemAs}
        onItemMouseEnter={this._onItemMouseEnterBase}
        onItemMouseLeave={this._onMouseItemLeave}
        onItemMouseMove={this._onItemMouseMoveBase}
        onItemMouseDown={this._onItemMouseDown}
        executeItemClick={this._executeItemClick}
        onItemClick={this._onAnchorClick}
        onItemKeyDown={this._onItemKeyDown}
        expandedMenuItemKey={expandedMenuItemKey}
        openSubMenu={this._onItemSubMenuExpand}
        dismissSubMenu={this._onSubMenuDismiss}
        dismissMenu={this.dismiss}
      />
    );
  }

  private _renderButtonItem(
    item: IContextualMenuItem,
    // eslint-disable-next-line deprecation/deprecation
    classNames: IMenuItemClassNames,
    index: number,
    focusableElementIndex: number,
    totalItemCount: number,
    hasCheckmarks?: boolean,
    hasIcons?: boolean,
  ) {
    const { contextualMenuItemAs } = this.props;
    const { expandedMenuItemKey } = this.state;

    return (
      <ContextualMenuButton
        item={item}
        classNames={classNames}
        index={index}
        focusableElementIndex={focusableElementIndex}
        totalItemCount={totalItemCount}
        hasCheckmarks={hasCheckmarks}
        hasIcons={hasIcons}
        contextualMenuItemAs={contextualMenuItemAs}
        onItemMouseEnter={this._onItemMouseEnterBase}
        onItemMouseLeave={this._onMouseItemLeave}
        onItemMouseMove={this._onItemMouseMoveBase}
        onItemMouseDown={this._onItemMouseDown}
        executeItemClick={this._executeItemClick}
        onItemClick={this._onItemClick}
        onItemClickBase={this._onItemClickBase}
        onItemKeyDown={this._onItemKeyDown}
        expandedMenuItemKey={expandedMenuItemKey}
        openSubMenu={this._onItemSubMenuExpand}
        dismissSubMenu={this._onSubMenuDismiss}
        dismissMenu={this.dismiss}
      />
    );
  }

  private _renderSplitButton(
    item: IContextualMenuItem,
    // eslint-disable-next-line deprecation/deprecation
    classNames: IMenuItemClassNames,
    index: number,
    focusableElementIndex: number,
    totalItemCount: number,
    hasCheckmarks?: boolean,
    hasIcons?: boolean,
  ): JSX.Element {
    const { contextualMenuItemAs } = this.props;
    const { expandedMenuItemKey } = this.state;

    return (
      <ContextualMenuSplitButton
        item={item}
        classNames={classNames}
        index={index}
        focusableElementIndex={focusableElementIndex}
        totalItemCount={totalItemCount}
        hasCheckmarks={hasCheckmarks}
        hasIcons={hasIcons}
        contextualMenuItemAs={contextualMenuItemAs}
        onItemMouseEnter={this._onItemMouseEnterBase}
        onItemMouseLeave={this._onMouseItemLeave}
        onItemMouseMove={this._onItemMouseMoveBase}
        onItemMouseDown={this._onItemMouseDown}
        executeItemClick={this._executeItemClick}
        onItemClick={this._onItemClick}
        onItemClickBase={this._onItemClickBase}
        onItemKeyDown={this._onItemKeyDown}
        openSubMenu={this._onItemSubMenuExpand}
        dismissSubMenu={this._onSubMenuDismiss}
        dismissMenu={this.dismiss}
        expandedMenuItemKey={expandedMenuItemKey}
        onTap={this._onPointerAndTouchEvent}
      />
    );
  }

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): boolean => {
    // Take note if we are processing an alt (option) or meta (command) keydown.
    // See comment in _shouldHandleKeyUp for reasoning.
    this._lastKeyDownWasAltOrMeta = this._isAltOrMeta(ev);

    // On Mac, pressing escape dismisses all levels of native context menus
    const dismissAllMenus = ev.which === KeyCodes.escape && (isMac() || isIOS());

    return this._keyHandler(ev, this._shouldHandleKeyDown, dismissAllMenus);
  };

  private _shouldHandleKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    return (
      ev.which === KeyCodes.escape ||
      this._shouldCloseSubMenu(ev) ||
      (ev.which === KeyCodes.up && (ev.altKey || ev.metaKey))
    );
  };

  private _onMenuFocusCapture = (ev: React.FocusEvent<HTMLElement>) => {
    if (this.props.delayUpdateFocusOnHover) {
      this._shouldUpdateFocusOnMouseEvent = true;
    }
  };

  private _onKeyUp = (ev: React.KeyboardEvent<HTMLElement>): boolean => {
    return this._keyHandler(ev, this._shouldHandleKeyUp, true /* dismissAllMenus */);
  };

  /**
   * We close the menu on key up only if ALL of the following are true:
   * - Most recent key down was alt or meta (command)
   * - The alt/meta key down was NOT followed by some other key (such as down/up arrow to
   *   expand/collapse the menu)
   * - We're not on a Mac (or iOS)
   *
   * This is because on Windows, pressing alt moves focus to the application menu bar or similar,
   * closing any open context menus. There is not a similar behavior on Macs.
   */
  private _shouldHandleKeyUp = (ev: React.KeyboardEvent<HTMLElement>) => {
    const keyPressIsAltOrMetaAlone = this._lastKeyDownWasAltOrMeta && this._isAltOrMeta(ev);
    this._lastKeyDownWasAltOrMeta = false;
    return !!keyPressIsAltOrMetaAlone && !(isIOS() || isMac());
  };

  /**
   * Returns true if the key for the event is alt (Mac option) or meta (Mac command).
   */
  private _isAltOrMeta(ev: React.KeyboardEvent<HTMLElement>): boolean {
    return ev.which === KeyCodes.alt || ev.key === 'Meta';
  }

  /**
   * Calls `shouldHandleKey` to determine whether the keyboard event should be handled;
   * if so, stops event propagation and dismisses menu(s).
   * @param ev - The keyboard event.
   * @param shouldHandleKey - Returns whether we should handle this keyboard event.
   * @param dismissAllMenus - If true, dismiss all menus. Otherwise, dismiss only the current menu.
   * Only does anything if `shouldHandleKey` returns true.
   * @returns Whether the event was handled.
   */
  private _keyHandler = (
    ev: React.KeyboardEvent<HTMLElement>,
    shouldHandleKey: (ev: React.KeyboardEvent<HTMLElement>) => boolean,
    dismissAllMenus?: boolean,
  ): boolean => {
    let handled = false;

    if (shouldHandleKey(ev)) {
      this._focusingPreviousElement = true;
      this.dismiss(ev, dismissAllMenus);
      ev.preventDefault();
      ev.stopPropagation();
      handled = true;
    }

    return handled;
  };

  /**
   * Checks if the submenu should be closed
   */
  private _shouldCloseSubMenu = (ev: React.KeyboardEvent<HTMLElement>): boolean => {
    const submenuCloseKey = getRTL(this.props.theme) ? KeyCodes.right : KeyCodes.left;

    if (ev.which !== submenuCloseKey || !this.props.isSubMenu) {
      return false;
    }

    return (
      this._adjustedFocusZoneProps.direction === FocusZoneDirection.vertical ||
      (!!this._adjustedFocusZoneProps.checkForNoWrap &&
        !shouldWrapFocus(ev.target as HTMLElement, 'data-no-horizontal-wrap'))
    );
  };

  private _onMenuKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    // Mark as handled if onKeyDown returns true (for handling collapse cases)
    // or if we are attempting to expand a submenu
    const handled = this._onKeyDown(ev);

    if (handled || !this._host) {
      return;
    }

    // If we have a modifier key being pressed, we do not want to move focus.
    // Otherwise, handle up and down keys.
    const hasModifier = !!(ev.altKey || ev.metaKey);
    const isUp = ev.which === KeyCodes.up;
    const isDown = ev.which === KeyCodes.down;
    if (!hasModifier && (isUp || isDown)) {
      const elementToFocus = isUp
        ? getLastFocusable(this._host, this._host.lastChild as HTMLElement, true)
        : getFirstFocusable(this._host, this._host.firstChild as HTMLElement, true);

      if (elementToFocus) {
        elementToFocus.focus();
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  };

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

    this._scrollIdleTimeoutId = this._async.setTimeout(() => {
      this._isScrollIdle = true;
    }, NavigationIdleDelay);
  };

  private _onItemMouseEnterBase = (item: any, ev: React.MouseEvent<HTMLElement>, target?: HTMLElement): void => {
    if (this._shouldIgnoreMouseEvent()) {
      return;
    }

    this._updateFocusOnMouseEvent(item, ev, target);
  };

  private _onItemMouseMoveBase = (item: any, ev: React.MouseEvent<HTMLElement>, target: HTMLElement): void => {
    const targetElement = ev.currentTarget as HTMLElement;

    // Always do this check to make sure we record a mouseMove if needed (even if we are timed out)
    if (this._shouldUpdateFocusOnMouseEvent) {
      this._gotMouseMove = true;
    } else {
      return;
    }

    if (
      !this._isScrollIdle ||
      this._enterTimerId !== undefined ||
      targetElement === (this._targetWindow.document.activeElement as HTMLElement)
    ) {
      return;
    }

    this._updateFocusOnMouseEvent(item, ev, target);
  };

  private _shouldIgnoreMouseEvent(): boolean {
    return !this._isScrollIdle || !this._gotMouseMove;
  }

  private _onMouseItemLeave = (item: any, ev: React.MouseEvent<HTMLElement>): void => {
    if (this._shouldIgnoreMouseEvent()) {
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
      try {
        (this._host as any).setActive();
      } catch (e) {
        /* no-op */
      }
    } else {
      this._host.focus();
    }
  };

  /**
   * Handles updating focus when mouseEnter or mouseMove fire.
   * As part of updating focus, This function will also update
   * the expand/collapse state accordingly.
   */
  private _updateFocusOnMouseEvent(item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>, target?: HTMLElement) {
    const targetElement = target ? target : (ev.currentTarget as HTMLElement);
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
          expandedByMouseClick: true,
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
  };

  private _onItemClick = (
    item: IContextualMenuItem,
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ): void => {
    this._onItemClickBase(item, ev, ev.currentTarget as HTMLElement);
  };

  private _onItemClickBase = (
    item: IContextualMenuItem,
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    target: HTMLElement,
  ): void => {
    const items = getSubmenuItems(item);

    // Cancel a async menu item hover timeout action from being taken and instead
    // just trigger the click event instead.
    this._cancelSubMenuTimer();

    if (!hasSubmenu(item) && (!items || !items.length)) {
      // This is an item without a menu. Click it.
      this._executeItemClick(item, ev);
    } else {
      if (item.key !== this.state.expandedMenuItemKey) {
        // This has a collapsed sub menu. Expand it.
        this.setState({
          // When Edge + Narrator are used together (regardless of if the button is in a form or not), pressing
          // "Enter" fires this method and not _onMenuKeyDown. Checking ev.nativeEvent.detail differentiates
          // between a real click event and a keypress event (detail should be the number of mouse clicks).
          // ...Plot twist! For a real click event in IE 11, detail is always 0 (Edge sets it properly to 1).
          // So we also check the pointerType property, which both Edge and IE set to "mouse" for real clicks
          // and "" for pressing "Enter" with Narrator on.
          expandedByMouseClick: ev.nativeEvent.detail !== 0 || (ev.nativeEvent as PointerEvent).pointerType === 'mouse',
        });
        this._onItemSubMenuExpand(item, target);
      }
    }

    ev.stopPropagation();
    ev.preventDefault();
  };

  private _onAnchorClick = (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) => {
    this._executeItemClick(item, ev);
    ev.stopPropagation();
  };

  private _executeItemClick = (
    item: IContextualMenuItem,
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ): void => {
    if (item.disabled || item.isDisabled) {
      return;
    }

    let dismiss = false;
    if (item.onClick) {
      dismiss = !!item.onClick(ev, item);
    } else if (this.props.onItemClick) {
      dismiss = !!this.props.onItemClick(ev, item);
    }

    if (dismiss || !ev.defaultPrevented) {
      this.dismiss(ev, true);

      // This should be removed whenever possible.
      // This ensures that the hidden dismissal action maintains the same behavior.
      // If the menu is being dismissed then the previously focused element should
      // get focused since the dismiss was triggered by a user click on an item
      // Rather than focus being lost.
      this._focusingPreviousElement = true;
    }
  };

  private _onItemKeyDown = (item: any, ev: React.KeyboardEvent<HTMLElement>): void => {
    const openKey = getRTL(this.props.theme) ? KeyCodes.left : KeyCodes.right;

    if (
      !item.disabled &&
      (ev.which === openKey || ev.which === KeyCodes.enter || (ev.which === KeyCodes.down && (ev.altKey || ev.metaKey)))
    ) {
      this.setState({
        expandedByMouseClick: false,
      });
      this._onItemSubMenuExpand(item, ev.currentTarget as HTMLElement);
      ev.preventDefault();
    }
  };

  // Cancel a async menu item hover timeout action from being taken and instead
  // do new upcoming behavior
  private _cancelSubMenuTimer = () => {
    if (this._enterTimerId !== undefined) {
      this._async.clearTimeout(this._enterTimerId);
      this._enterTimerId = undefined;
    }
  };

  private _onItemSubMenuExpand = (item: IContextualMenuItem, target: HTMLElement): void => {
    if (this.state.expandedMenuItemKey !== item.key) {
      if (this.state.expandedMenuItemKey) {
        this._onSubMenuDismiss();
      }

      // Focus the target to ensure when we close it, we're focusing on the correct element.
      target.focus();
      this.setState({
        expandedMenuItemKey: item.key,
        submenuTarget: target,
      });
    }
  };

  private _getSubmenuProps() {
    const { submenuTarget, expandedMenuItemKey } = this.state;
    const item = this._findItemByKey(expandedMenuItemKey!);
    let submenuProps: IContextualMenuProps | null = null;

    if (item) {
      submenuProps = {
        items: getSubmenuItems(item)!,
        target: submenuTarget,
        onDismiss: this._onSubMenuDismiss,
        isSubMenu: true,
        id: this.state.subMenuId,
        shouldFocusOnMount: true,
        shouldFocusOnContainer: this.state.expandedByMouseClick,
        directionalHint: getRTL(this.props.theme) ? DirectionalHint.leftTopEdge : DirectionalHint.rightTopEdge,
        className: this.props.className,
        gapSpace: 0,
        isBeakVisible: false,
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
   * @param key - The key of the item to match
   * @param items - The items to look for the key
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

  /**
   * This function is called ASYNCHRONOUSLY, and so there is a chance it is called
   * after the component is unmounted. The _mounted property is added to prevent
   * from calling setState() after unmount. Do NOT copy this pattern in synchronous
   * code.
   */
  private _onSubMenuDismiss = (ev?: any, dismissAll?: boolean): void => {
    if (dismissAll) {
      this.dismiss(ev, dismissAll);
    } else if (this._mounted) {
      this.setState({
        dismissedMenuItemKey: this.state.expandedMenuItemKey,
        expandedMenuItemKey: undefined,
        submenuTarget: undefined,
      });
    }
  };

  private _setTargetWindowAndElement(target: Target): void {
    const currentElement = this._host;

    if (target) {
      if (typeof target === 'string') {
        const currentDoc: Document = getDocument(currentElement)!;
        this._target = currentDoc ? (currentDoc.querySelector(target) as Element) : null;
        this._targetWindow = getWindow(currentElement)!;
        // Cast to any prevents error about stopPropagation always existing
      } else if ((target as any).stopPropagation) {
        this._targetWindow = getWindow((target as MouseEvent).target as HTMLElement)!;
        this._target = target as MouseEvent;
      } else if (
        // eslint-disable-next-line deprecation/deprecation
        ((target as Point).left !== undefined || (target as Point).x !== undefined) &&
        // eslint-disable-next-line deprecation/deprecation
        ((target as Point).top !== undefined || (target as Point).y !== undefined)
      ) {
        this._targetWindow = getWindow(currentElement)!;
        this._target = target as Point;
      } else if ((target as React.RefObject<Element>).current !== undefined) {
        this._target = (target as React.RefObject<Element>).current;
        this._targetWindow = getWindow(this._target)!;
      } else {
        const targetElement: Element = target as Element;
        this._targetWindow = getWindow(targetElement)!;
        this._target = target as Element;
      }
    } else {
      this._targetWindow = getWindow(currentElement)!;
    }
  }

  private _onPointerAndTouchEvent = (ev: React.TouchEvent<HTMLElement> | PointerEvent) => {
    this._cancelSubMenuTimer();
  };
}
