import * as React from 'react';
import FocusZone from '../../utilities/focus/FocusZone';
import './ContextualMenu.scss';
import KeyCodes from '../../utilities/KeyCodes';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import { css } from '../../utilities/css';

const BUFFER_ZONE = 5;
const BEAK_WIDTH = 16;
const BEAK_OFFSET = 6;
const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
const OFF_SCREEN_POSITION = { top: 0, left: -9999 };
const SLIDE_ANIMATIONS = {
  up: 'slideUpIn20',
  down: 'slideDownIn20',
  left: 'slideLeftIn20',
  right: 'slideRightIn20'
};

export interface IContextualMenuProps {
  items: IContextualMenuItem[];
  targetElement?: HTMLElement;
  menuKey?: string;
  directionalHint?: DirectionalHints;
  gapSpace?: number;
  labelElementId?: string;
  shouldFocusOnMount?: boolean;
  isBeakVisible?: boolean;
  onDismiss?: (ev?: any) => void;
  description?: string;
  className?: string;
}

export interface IContextualMenuState {
  expandedMenuItemKey?: string;
  contextualMenuItems?: IContextualMenuItem[];
  contextualMenuTarget?: HTMLElement;
  beakStyle?: any;
  submenuProps?: IContextualMenuProps;
  positions?: any;
  slideDirectionalClassName?: string;
}

export enum ContextualMenuTypes {
  vertical,
  horizontal
}

export enum HorizontalAlignmentHints {
  auto,
  left,
  center,
  right
}

export enum VerticalAlignmentHints {
  top,
  center,
  bottom
}

export enum DirectionalHints {
  topLeftEdge,
  topCenter,
  topRightEdge,
  topAutoEdge,
  bottomLeftEdge,
  bottomCenter,
  bottomRightEdge,
  bottomAutoEdge,
  leftTopEdge,
  leftCenter,
  leftBottomEdge,
  rightTopEdge,
  rightCenter,
  rightBottomEdge
};

export interface IMenuSizeWindowSizeInfo {
  hostRect: any;
  targetRect: any;
  menuRect: any;
  windowSize: any;
  gapSpace: number;
}

export interface IPositionInfo {
  menuPosition: any;
  beakPosition: any;
  directionalClassName: string;
}

export interface IParsedDirectionalHints {
  contextualMenuType: ContextualMenuTypes;
  horizontalAlignmentHint: HorizontalAlignmentHints;
  verticalAlignmentHint: VerticalAlignmentHints;
};

export interface IContextualMenuItem {
  key?: string;
  name: string;
  icon?: string;
  isEnabled?: boolean;
  shortCut?: string;
  canCheck?: boolean;
  isChecked?: boolean;
  onClick?: (item?: IContextualMenuItem, ev?: React.MouseEvent) => void;
  items?: IContextualMenuItem[];
}

export default class ContextualMenu extends React.Component<IContextualMenuProps, IContextualMenuState> {
  // The default ContextualMenu properities have no items and beak, the default submenu direction is right and top.
  public static defaultProps = {
    items: [],
    shouldFocusOnMount: true,
    isBeakVisible: false,
    gapSpace: 0,
    directionalHint: DirectionalHints.rightBottomEdge
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
  private _events: EventGroup;

  constructor(props: IContextualMenuProps) {
    super(props);

    this.state = {
      contextualMenuItems: null
    };

    this._isFocusingPreviousElement = false;
    this._didSetInitialFocus = false;
    this._events = new EventGroup(this);

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
    this._onContextMenuDismiss = this._onContextMenuDismiss.bind(this);
    this._getRelativePositions = this._getRelativePositions.bind(this);
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
    this._getRelativePositions(this.props, this.state);
    this._events.on(window, 'scroll', this._onContextMenuDismiss);
    this._events.on(window, 'resize', this._onContextMenuDismiss);
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
    this._getRelativePositions(this.props, this.state);
  }

  // Invoked immediately before a component is unmounted from the DOM.
  public componentWillUnmount() {
    if (this._isFocusingPreviousElement && this._previousActiveElement) {
      this._previousActiveElement.focus();
    }
    this._events.dispose();
  }

  public render() {
    let { className, menuKey, items, isBeakVisible, labelElementId, targetElement } = this.props;
    let { expandedMenuItemKey, submenuProps, positions, slideDirectionalClassName } = this.state;

    let hasIcons = items.some(item => !!item.icon);
    let hasCheckmarks = items.some(item => !!item.canCheck);

    return (
      <div ref='host' className={ css('ms-ContextualMenu-container', className) }>
        { (items && items.length) ? (
          <FocusZone
            className={ 'ms-ContextualMenu is-open' + ((slideDirectionalClassName) ? (` ms-u-${slideDirectionalClassName}`) : (null)) }
            key={ menuKey }
            ref='focusZone' onLostFocus={ this._onBlur }
            role='menu'
            ariaLabelledBy={ labelElementId }
            style={ ((positions) ? positions.menu : OFF_SCREEN_POSITION) }
            >
            { isBeakVisible && targetElement ? (<div className='ms-ContextualMenu-beak'  style={ ((positions) ? positions.beak : BEAK_ORIGIN_POSITION) } />) : (null) }
            <ul className='ms-ContextualMenu-list is-open ' onKeyDown={ this._onKeyDown }  ref='menu'>
              { items.map((item, index) => (
                // If the item name is equal to '-', a divider will be generated.
                item.name === '-' ? (
                  <li key={ item.key || index } className='ms-ContextualMenu-item ms-ContextualMenu-item--divider'></li>
                ) : (
                    <li key={ item.key || index } className='ms-ContextualMenu-item' ref={ item.key }>
                      <button
                        className={ css('ms-ContextualMenu-link', { 'is-expanded': (expandedMenuItemKey === item.key) }) }
                        onClick={ this._onItemClick.bind(this, item) }
                        data-command-key={ index }
                        role='menuitem'
                        >
                        { (hasCheckmarks) ? (
                          <span
                            className={ 'ms-ContextualMenu-checkmark' +
                            ((item.isChecked) ? ' ms-Icon ms-Icon--check' : ' not-selected') }
                            onClick={ this._onItemClick.bind(this, item) }
                            >
                          </span>
                        ) : (null) }
                        { (hasIcons) ? (
                          <span className={ 'ms-ContextualMenu-icon' +
                            ((item.icon) ? ` ms-Icon ms-Icon--${item.icon}` : ' no-icon') }>
                          </span>
                        ) : (null) }
                        <span className='ms-ContextualMenu-itemText ms-font-m ms-font-weight-regular'>{ item.name }</span>
                        { (item.items && item.items.length) ? (
                          <i className='ms-ContextualMenu-chevronRight ms-Icon ms-Icon--chevronRight' />
                        ) : (null) }
                      </button>
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

  private _onKeyDown(ev: React.KeyboardEvent) {
    if (ev.which === KeyCodes.escape) {

      // When a user presses escape, we will try to refocus the previous focused element.
      this._isFocusingPreviousElement = true;
      this.dismiss();
    }
  }

  private _onBlur(ev: React.FocusEvent) {
    if (!this.state.submenuProps && !(ev.currentTarget as HTMLElement).contains(ev.relatedTarget as HTMLElement)) {
      // When the user clicks on something unrelated, we won't make an attempt to reset focus back to the originating focused element.
      this.dismiss(ev);
    }
  }

  private _onItemClick(item: any, ev: MouseEvent) {
    if (!item.items || !item.items.length) { // This is an item without a menu. Click it.
      if (item.onClick) {
        item.onClick(item, ev);
      }
      this._onContextMenuDismiss();
    } else {
      if (item.key === this.state.expandedMenuItemKey) { // This has an expanded sub menu. collapse it.
        this._onContextMenuDismiss();
      } else { // This has a collapsed sub menu. Expand it.
        this.setState({
          expandedMenuItemKey: item.key,
          submenuProps: {
            items: item.items,
            targetElement: ev.currentTarget as HTMLElement,
            menuKey: item.key,
            onDismiss: this._onContextMenuDismiss
          }
        });
      }
    }
  }

  private _onContextMenuDismiss(ev?: any) {
    if (!ev || !ev.relatedTarget || !this.refs.host.contains(ev.relatedTarget as HTMLElement)) {
      this.setState({
        expandedMenuItemKey: null,
        submenuProps: null
      });
    } else {
      ev.stopPropagation();
      ev.preventDefault();
    }
  }

  private _getRelativePositions(props: IContextualMenuProps, state: IContextualMenuState) {
    let { targetElement, directionalHint, gapSpace } = props;
    let { positions } = state;
    let hostElement = this.refs.host;
    let menuElement = this.refs.menu;
    let windowSize: { width: number, height: number } = { width: window.innerWidth, height: window.innerHeight };
    let directionalClassName: string;
    let parsedDirectionalHints: IParsedDirectionalHints = this._getDirectionalHint(directionalHint);
    let { contextualMenuType, horizontalAlignmentHint, verticalAlignmentHint } = parsedDirectionalHints;

    let menuPosition = {
      top: 0,
      left: 0,
    };

    let beakPosition = {
      display: 'block',
      left: 0,
      top: -BEAK_OFFSET,
    };

    let positionInfo: IPositionInfo = {
      menuPosition: menuPosition,
      beakPosition: beakPosition,
      directionalClassName: directionalClassName
    };

    if (hostElement && targetElement && menuElement) {
      let hostRect = hostElement.getBoundingClientRect();
      let targetRect = targetElement.getBoundingClientRect();
      let menuRect = menuElement.getBoundingClientRect();
      let actualHorizontalDirection: HorizontalAlignmentHints;
      let actualVerticalDirection: VerticalAlignmentHints;

      let menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo = {
        hostRect: hostRect,
        targetRect: targetRect,
        menuRect: menuRect,
        windowSize: windowSize,
        gapSpace: gapSpace
      };

      // ContextualMenu submenu render type: vertical
      if (contextualMenuType === ContextualMenuTypes.vertical) {
        // Set actualHorizontalDirection based on window space and menu size
        actualHorizontalDirection = this._getActualHorizontalDirectionforVerticalContextualMenu(horizontalAlignmentHint, menuSizeWindowSizeInfo);

        // Set the actualVerticalDirection based on the window space
        actualVerticalDirection = this._getActualVerticalDirectionforVerticalContextualMenu(verticalAlignmentHint, menuSizeWindowSizeInfo);

        // Calculate position based on actualHorizontalDirection and actualVerticalDirection
        positionInfo = this._calculatePositionsforVerticalContextualMenu( actualVerticalDirection, actualHorizontalDirection, menuSizeWindowSizeInfo, positionInfo);

      // ContextualMenu submenu render type: horizontal
      } else if (contextualMenuType === ContextualMenuTypes.horizontal) {
        // Set actualHorizontalDirection based on window space
        actualHorizontalDirection = this._getActualHorizontalDirectionforHorizontalContextualMenu(horizontalAlignmentHint, menuSizeWindowSizeInfo);

        // Set the actualVerticalDirection based on the window space
        actualVerticalDirection = this._getActualVerticalDirectionforHorizontalContextualMenu(verticalAlignmentHint, menuSizeWindowSizeInfo);

        // Calculate position based on actualHorizontalDirection and actualVerticalDirection
        positionInfo = this._calculatePositionsforHorizontalContextualMenu( actualVerticalDirection, actualHorizontalDirection, menuSizeWindowSizeInfo, positionInfo);
      }
    }

    // Set the new position only when the positions are not exists or one of the new menupositions are different
    if ((!positions && positionInfo) ||
      (positions && positionInfo && (positions.menu.top !== positionInfo.menuPosition.top || positions.menu.left !== positionInfo.menuPosition.left))) {
      this.setState({
        positions: {
          menu: positionInfo.menuPosition,
          beak: positionInfo.beakPosition,
        },
        slideDirectionalClassName: positionInfo.directionalClassName,
      });
    }
  }

  // Get the three parameter directional hint, which include contextual menu type, horizontal alignment hint and verticalAlignmentHint
  private _getDirectionalHint(directionalHint: DirectionalHints) {

    let parsedDirectionalHints: IParsedDirectionalHints = {
      contextualMenuType: null,
      horizontalAlignmentHint: null,
      verticalAlignmentHint: null
    };
    let { contextualMenuType, horizontalAlignmentHint, verticalAlignmentHint } = parsedDirectionalHints;

    // Get the contextual menu type, vertical means the submenu will be display on the top or bottom of host menu. While horizontal means
    // the submenuw will be display on the left or right edge of host menu.
    if (directionalHint === DirectionalHints.topCenter || directionalHint === DirectionalHints.topLeftEdge ||
    directionalHint === DirectionalHints.topRightEdge || directionalHint === DirectionalHints.bottomCenter ||
    directionalHint === DirectionalHints.bottomLeftEdge || directionalHint === DirectionalHints.bottomRightEdge ||
    directionalHint === DirectionalHints.topAutoEdge || directionalHint === DirectionalHints.bottomAutoEdge) {
      contextualMenuType = ContextualMenuTypes.vertical;
    } else {
      contextualMenuType = ContextualMenuTypes.horizontal;
    }

    // Get the horizontalAlignmentHints, for horizontal contextual menu, it will only be either left or right; for vertical contextual menu, center and auto is also an option.
    // auto means taht if the target is in the left half of host, the submenu will be align to left edge, if the target is in the right half of host, the submenu will be
    // align to right edge.
    if (directionalHint === DirectionalHints.bottomLeftEdge || directionalHint === DirectionalHints.leftBottomEdge ||
    directionalHint === DirectionalHints.leftCenter || directionalHint === DirectionalHints.leftTopEdge ||
    directionalHint === DirectionalHints.topLeftEdge) {
      horizontalAlignmentHint = HorizontalAlignmentHints.left;
    } else if (contextualMenuType === ContextualMenuTypes.vertical && (directionalHint === DirectionalHints.topCenter ||
    directionalHint === DirectionalHints.bottomCenter)) {
      horizontalAlignmentHint = HorizontalAlignmentHints.center;
    } else if (contextualMenuType === ContextualMenuTypes.vertical && (directionalHint === DirectionalHints.topAutoEdge ||
    directionalHint === DirectionalHints.bottomAutoEdge)) {
      horizontalAlignmentHint = HorizontalAlignmentHints.auto;
    } else {
      horizontalAlignmentHint = HorizontalAlignmentHints.right;
    }

    // Get the verticalAlignmentHints, for vertical contextual menu, it will only be either top or buttom; for horizontal contextual menu, center is also an option.
    if (directionalHint === DirectionalHints.leftTopEdge || directionalHint === DirectionalHints.rightTopEdge ||
    directionalHint === DirectionalHints.topCenter || directionalHint === DirectionalHints.topLeftEdge ||
    directionalHint === DirectionalHints.topRightEdge || directionalHint === DirectionalHints.topAutoEdge) {
      verticalAlignmentHint = VerticalAlignmentHints.top;
    } else if (contextualMenuType === ContextualMenuTypes.horizontal && (directionalHint === DirectionalHints.leftCenter ||
    directionalHint === DirectionalHints.rightCenter)) {
      verticalAlignmentHint = VerticalAlignmentHints.center;
    } else {
      verticalAlignmentHint = VerticalAlignmentHints.bottom;
    }

    parsedDirectionalHints = { contextualMenuType, horizontalAlignmentHint, verticalAlignmentHint };

    return parsedDirectionalHints;
  }

  // Get actualHorizontalDirection for vertical contextual menu based on window space and menu size
  private _getActualHorizontalDirectionforVerticalContextualMenu(horizontalAlignmentHint: HorizontalAlignmentHints, menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo) {
    let { hostRect, targetRect: targetRect, menuRect, windowSize } = menuSizeWindowSizeInfo;
    let actualHorizontalDirection: HorizontalAlignmentHints;

    if (horizontalAlignmentHint === HorizontalAlignmentHints.left) {
      let hasEnoughSpace = (windowSize.width - targetRect.left) > (menuRect.width + BUFFER_ZONE);

      if (hasEnoughSpace) {
        actualHorizontalDirection = HorizontalAlignmentHints.left;
      } else {
        actualHorizontalDirection = HorizontalAlignmentHints.right;
      }
    } else if (horizontalAlignmentHint === HorizontalAlignmentHints.center) {
      let hasEnoughSpaceLeft = targetRect.left > ((menuRect.width / 2) - (targetRect.width / 2) + BUFFER_ZONE);
      let hasEnoughSpaceRight = (windowSize.width - targetRect.right) > ((menuRect.width / 2) - (targetRect.width / 2) + BUFFER_ZONE);

      if (hasEnoughSpaceLeft && hasEnoughSpaceRight) {
        actualHorizontalDirection = HorizontalAlignmentHints.center;
      } else if (!hasEnoughSpaceLeft) {
        actualHorizontalDirection = HorizontalAlignmentHints.left;
      } else {
        actualHorizontalDirection = HorizontalAlignmentHints.right;
      }
    } else if (horizontalAlignmentHint === HorizontalAlignmentHints.right) {
      let hasEnoughSpace = targetRect.right > (menuRect.width + BUFFER_ZONE);

      if (hasEnoughSpace) {
        actualHorizontalDirection = HorizontalAlignmentHints.right;
      } else {
        actualHorizontalDirection = HorizontalAlignmentHints.left;
      }
    } else if (horizontalAlignmentHint === HorizontalAlignmentHints.auto) {
      let isLeftAligned = (targetRect.left - hostRect.left + (targetRect.width / 2)) < (hostRect.width / 2);
      if (isLeftAligned) {
        actualHorizontalDirection = HorizontalAlignmentHints.left;
      } else {
        actualHorizontalDirection = HorizontalAlignmentHints.right;
      }
    }

    return actualHorizontalDirection;
  }

  // Get actualVerticalDirection for vertical contextual menu based on window space and menu size
  private _getActualVerticalDirectionforVerticalContextualMenu(verticalAlignmentHint: VerticalAlignmentHints, menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo) {
    let { targetRect: targetRect, menuRect, windowSize, gapSpace } = menuSizeWindowSizeInfo;
    let actualVerticalDirection: VerticalAlignmentHints;

    if (verticalAlignmentHint === VerticalAlignmentHints.bottom) {
      let hasEnoughSpace = (windowSize.height - targetRect.bottom) > (menuRect.height + gapSpace + BUFFER_ZONE);

        if (hasEnoughSpace) {
          actualVerticalDirection = VerticalAlignmentHints.bottom;
        } else {
          actualVerticalDirection = VerticalAlignmentHints.top;
        }
      } else if (verticalAlignmentHint === VerticalAlignmentHints.top) {
        let hasEnoughSpace = targetRect.top > (menuRect.height + gapSpace + BUFFER_ZONE);

        if (hasEnoughSpace) {
          actualVerticalDirection = VerticalAlignmentHints.top;
        } else {
          actualVerticalDirection = VerticalAlignmentHints.bottom;
        }
      }

    return actualVerticalDirection;
  }

  // Calculate positions based on actualHorizontalDirection and actualVerticalDirection for vertical contextual menu
  private _calculatePositionsforVerticalContextualMenu(
    actualVerticalDirection: VerticalAlignmentHints,
    actualHorizontalDirection: HorizontalAlignmentHints,
    menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo,
    positionInfo: IPositionInfo
  ) {
    let { hostRect, targetRect: targetRect, menuRect, gapSpace } = menuSizeWindowSizeInfo;
    let { menuPosition, beakPosition, directionalClassName } = positionInfo;

    // Calculate the horizontal position based on actualHorizontalDirection
    if (actualHorizontalDirection === HorizontalAlignmentHints.left) {
      menuPosition.left = targetRect.left - hostRect.left;
      beakPosition.left = (targetRect.width / 2) - (BEAK_WIDTH / 2);
    } else if (actualHorizontalDirection === HorizontalAlignmentHints.center) {
      let targetCenter = targetRect.left - hostRect.left + (targetRect.width / 2);
      menuPosition.left = targetCenter - menuRect.width / 2;
      beakPosition.left = (menuRect.width / 2) - (BEAK_WIDTH / 2);
    } else {
      menuPosition.left = targetRect.right - hostRect.left - menuRect.width;
      beakPosition.left = menuRect.width - (targetRect.width / 2) - (BEAK_WIDTH / 2);
    }

    // Calculate the vertical position based on actualVerticalDirection
    if (actualVerticalDirection === VerticalAlignmentHints.top) {
      menuPosition.top = targetRect.top - hostRect.top - gapSpace - menuRect.height;
      beakPosition.top = menuRect.height - BEAK_WIDTH / 2;
      directionalClassName = SLIDE_ANIMATIONS.up;
    } else {
      menuPosition.top = targetRect.bottom - hostRect.top + gapSpace;
      // Beak vertical position is in default position
      directionalClassName = SLIDE_ANIMATIONS.down;
    }

    positionInfo = { menuPosition, beakPosition, directionalClassName };

    return positionInfo;
  }

  // Get actualHorizontalDirection for horizontal contextual menu based on window space and menu size
  private _getActualHorizontalDirectionforHorizontalContextualMenu(horizontalAlignmentHint: HorizontalAlignmentHints, menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo) {
    let { targetRect: targetRect, menuRect, windowSize, gapSpace } = menuSizeWindowSizeInfo;
    let actualHorizontalDirection: HorizontalAlignmentHints;

    if (horizontalAlignmentHint === HorizontalAlignmentHints.right) {
      let hasEnoughSpace = (windowSize.width - targetRect.right) > (menuRect.width + gapSpace + BUFFER_ZONE);

      if (hasEnoughSpace) {
        actualHorizontalDirection = HorizontalAlignmentHints.right;
      } else {
        actualHorizontalDirection = HorizontalAlignmentHints.left;
      }
    } else if (horizontalAlignmentHint === HorizontalAlignmentHints.left) {
      let hasEnoughSpace = targetRect.left > menuRect.width + gapSpace + BUFFER_ZONE;

      if (hasEnoughSpace) {
        actualHorizontalDirection = HorizontalAlignmentHints.left;
      } else {
        actualHorizontalDirection = HorizontalAlignmentHints.right;
      }
    }

    return actualHorizontalDirection;
  }

  // Get actualVerticalDirection for horizontal contextual menu based on window space and menu size
  private _getActualVerticalDirectionforHorizontalContextualMenu(verticalAlignmentHint: VerticalAlignmentHints,  menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo) {
    let { targetRect: targetRect, menuRect, windowSize } = menuSizeWindowSizeInfo;
    let actualVerticalDirection: VerticalAlignmentHints;

    if (verticalAlignmentHint === VerticalAlignmentHints.top) {
      let hasEnoughSpace = targetRect.bottom > (menuRect.height + BUFFER_ZONE);

      if (hasEnoughSpace) {
        actualVerticalDirection = VerticalAlignmentHints.top;
      } else {
        actualVerticalDirection = VerticalAlignmentHints.bottom;
      }
    } else if (verticalAlignmentHint === VerticalAlignmentHints.center) {
      let hasEnoughSpaceTop = (targetRect.top + targetRect.height / 2) > (menuRect.height / 2 + BUFFER_ZONE);
      let hasEnoughSpaceBottom = (windowSize.height - targetRect.top - targetRect.height / 2) > (menuRect.height / 2 + BUFFER_ZONE);

      if (hasEnoughSpaceTop && hasEnoughSpaceBottom) {
        actualVerticalDirection = VerticalAlignmentHints.center;
      } else if (!hasEnoughSpaceTop) {
        actualVerticalDirection = VerticalAlignmentHints.bottom;
      } else {
        actualVerticalDirection = VerticalAlignmentHints.top;
      }
    } else if (verticalAlignmentHint === VerticalAlignmentHints.bottom) {
      let hasEnoughSpace = (windowSize.height - targetRect.top) > (menuRect.height + BUFFER_ZONE);

      if (hasEnoughSpace) {
        actualVerticalDirection = VerticalAlignmentHints.bottom;
      } else {
        actualVerticalDirection = VerticalAlignmentHints.top;
      }
    }

    return actualVerticalDirection;
  }

  // Calculate positions based on actualHorizontalDirection and actualVerticalDirection for horizontal contextual menu
  private _calculatePositionsforHorizontalContextualMenu(
    actualVerticalDirection: VerticalAlignmentHints,
    actualHorizontalDirection: HorizontalAlignmentHints,
    menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo,
    positionInfo: IPositionInfo
  ) {
    let { hostRect, targetRect: targetRect, menuRect, gapSpace } = menuSizeWindowSizeInfo;
    let { menuPosition, beakPosition, directionalClassName } = positionInfo;

    // Calculate horizontal position based on actualHorizontalDirection
    if (actualHorizontalDirection === HorizontalAlignmentHints.left) {
      menuPosition.left = targetRect.left - hostRect.left - gapSpace - menuRect.width;
      beakPosition.left = menuRect.width - 2 * BEAK_OFFSET;
      directionalClassName = SLIDE_ANIMATIONS.left;
    } else {
      menuPosition.left = targetRect.right - hostRect.left + gapSpace;
      beakPosition.left = -BEAK_OFFSET;
      directionalClassName = SLIDE_ANIMATIONS.right;
    }

    // Calculate vertical position based on actualVerticalDirection
    if (actualVerticalDirection === VerticalAlignmentHints.top) {
      menuPosition.top = targetRect.bottom - hostRect.top - menuRect.height;
      beakPosition.top = menuRect.height - (targetRect.height / 2) - (BEAK_WIDTH / 2);
    } else if (actualVerticalDirection === VerticalAlignmentHints.center) {
      menuPosition.top = targetRect.bottom - hostRect.top + (menuRect.height / 2 - targetRect.height / 2) - menuRect.height;
      beakPosition.top = (menuRect.height / 2) - (BEAK_WIDTH / 2);
    } else {
      menuPosition.top = targetRect.top - hostRect.top;
      beakPosition.top = (targetRect.height / 2) - (BEAK_WIDTH / 2);
    }

    positionInfo = { menuPosition, beakPosition, directionalClassName };

    return positionInfo;
  }
}
