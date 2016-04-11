import * as React from 'react';
import { IContextualMenuItem, DirectionalHint } from './interfaces';
import FocusZone from '../../utilities/focus/FocusZone';
import './ContextualMenu.scss';
import KeyCodes from '../../utilities/KeyCodes';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import { css } from '../../utilities/css';

import { IContextualMenuProps } from './ContextualMenu.Props';

const BUFFER_ZONE = 5;
const BEAK_WIDTH = 16;
const BEAK_PADDING = 5;

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
const OFF_SCREEN_POSITION = { top: 0, left: -9999 };
const SLIDE_ANIMATIONS = {
  up: 'slideUpIn20',
  down: 'slideDownIn20',
  left: 'slideLeftIn20',
  right: 'slideRightIn20'
};

export interface IContextualMenuState {
  expandedMenuItemKey?: string;
  contextualMenuItems?: IContextualMenuItem[];
  contextualMenuTarget?: HTMLElement;
  beakStyle?: any;
  submenuProps?: IContextualMenuProps;
  positions?: any;
  slideDirectionalClassName?: string;
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

interface IPositionInfo {
  menuPosition: any;
  beakPosition: any;
  directionalClassName: string;
}

interface IParsedDirectionalHint {
  contextualMenuType: ContextualMenuType;
  horizontalAlignmentHint: HorizontalAlignmentHint;
  verticalAlignmentHint: VerticalAlignmentHint;
};

export default class ContextualMenu extends React.Component<IContextualMenuProps, IContextualMenuState> {
  // The default ContextualMenu properities have no items and beak, the default submenu direction is right and top.
  public static defaultProps = {
    items: [],
    shouldFocusOnMount: true,
    isBeakVisible: false,
    gapSpace: 0,
    directionalHint: DirectionalHint.rightBottomEdge
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

    this.dismiss = this.dismiss.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onClickCapture = this._onClickCapture.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
    this._onSubMenuDismiss = this._onSubMenuDismiss.bind(this);
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
    this._events.on(window, 'scroll', this.dismiss);
    this._events.on(window, 'resize', this.dismiss);
    this._events.on(window, 'click', this._onClickCapture, true);
    this._events.on(window, 'touchstart', this._onClickCapture, true);
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
    let { className, items, isBeakVisible, labelElementId, targetElement } = this.props;
    let { expandedMenuItemKey, submenuProps, positions, slideDirectionalClassName } = this.state;

    let hasIcons = !!(items && items.some(item => !!item.icon));
    let hasCheckmarks = !!(items && items.some(item => !!item.canCheck));

    return (
      <div ref='host' className={ css('ms-ContextualMenu-container', className) }>
        { (items && items.length) ? (
          <FocusZone
            className={ 'ms-ContextualMenu is-open' + ((slideDirectionalClassName) ? (` ms-u-${slideDirectionalClassName}`) : '') }
            ref='focusZone'
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

  private _onClickCapture(ev: React.MouseEvent) {
    if (!this.refs.host.contains(ev.target as HTMLElement)) {
      this.dismiss();
    }
  }

  private _onItemClick(item: any, ev: MouseEvent) {
    if (!item.items || !item.items.length) { // This is an item without a menu. Click it.
      if (item.onClick) {
        item.onClick(item, ev);
        this.dismiss();
      }
    } else {
      if (item.key === this.state.expandedMenuItemKey) { // This has an expanded sub menu. collapse it.
        this._onSubMenuDismiss();
      } else { // This has a collapsed sub menu. Expand it.
        this.setState({
          expandedMenuItemKey: item.key,
          submenuProps: {
            items: item.items,
            targetElement: ev.currentTarget as HTMLElement,
            onDismiss: this._onSubMenuDismiss
          }
        });
      }
    }
  }

  private _onSubMenuDismiss(ev?: any) {
    this.setState({
      expandedMenuItemKey: null,
      submenuProps: null
    });
  }

  private _getRelativePositions(props: IContextualMenuProps, state: IContextualMenuState) {
    let { targetElement, directionalHint, gapSpace } = props;
    let { positions } = state;
    let hostElement = this.refs.host;
    let menuElement = this.refs.menu;
    let windowSize: { width: number, height: number } = { width: window.innerWidth, height: window.innerHeight };
    let directionalClassName: string;
    let parsedDirectionalHint: IParsedDirectionalHint = this._getDirectionalHint(directionalHint);
    let { contextualMenuType, horizontalAlignmentHint, verticalAlignmentHint } = parsedDirectionalHint;

    let menuPosition = {
      top: 0,
      left: 0,
    };

    let beakPosition = {
      display: 'block',
      left: 0,
      top: - (BEAK_WIDTH / 2),
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
      let actualHorizontalDirection: HorizontalAlignmentHint;
      let actualVerticalDirection: VerticalAlignmentHint;

      let menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo = { hostRect, targetRect, menuRect, windowSize, gapSpace };

      // Check if it is necessary to switch contextualMenuType based on the menu size and window size.
      contextualMenuType = this._switchContextualMenuType(parsedDirectionalHint, menuSizeWindowSizeInfo);

      // ContextualMenu submenu render type: vertical
      if (contextualMenuType === ContextualMenuType.vertical) {
        // Set actualHorizontalDirection based on window space and menu size
        actualHorizontalDirection = this._getActualHorizontalDirectionforVerticalContextualMenu(horizontalAlignmentHint, menuSizeWindowSizeInfo);

        // Set the actualVerticalDirection based on the window space
        actualVerticalDirection = this._getActualVerticalDirectionforVerticalContextualMenu(verticalAlignmentHint, menuSizeWindowSizeInfo);

        // Calculate position based on actualHorizontalDirection and actualVerticalDirection
        positionInfo = this._calculatePositionsforVerticalContextualMenu(actualVerticalDirection, actualHorizontalDirection, menuSizeWindowSizeInfo, positionInfo);

        // ContextualMenu submenu render type: horizontal
      } else if (contextualMenuType === ContextualMenuType.horizontal) {
        // Set actualHorizontalDirection based on window space
        actualHorizontalDirection = this._getActualHorizontalDirectionforHorizontalContextualMenu(horizontalAlignmentHint, menuSizeWindowSizeInfo);

        // Set the actualVerticalDirection based on the window space
        actualVerticalDirection = this._getActualVerticalDirectionforHorizontalContextualMenu(verticalAlignmentHint, menuSizeWindowSizeInfo);

        // Calculate position based on actualHorizontalDirection and actualVerticalDirection
        positionInfo = this._calculatePositionsforHorizontalContextualMenu(actualVerticalDirection, actualHorizontalDirection, menuSizeWindowSizeInfo, positionInfo);
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
  private _getDirectionalHint(directionalHint: DirectionalHint) {

    let parsedDirectionalHint: IParsedDirectionalHint = {
      contextualMenuType: null,
      horizontalAlignmentHint: null,
      verticalAlignmentHint: null
    };
    let { contextualMenuType, horizontalAlignmentHint, verticalAlignmentHint } = parsedDirectionalHint;

    // Get the contextual menu type, vertical means the submenu will be display on the top or bottom of host menu. While horizontal means
    // the submenuw will be display on the left or right edge of host menu.
    if (directionalHint === DirectionalHint.topCenter || directionalHint === DirectionalHint.topLeftEdge ||
      directionalHint === DirectionalHint.topRightEdge || directionalHint === DirectionalHint.bottomCenter ||
      directionalHint === DirectionalHint.bottomLeftEdge || directionalHint === DirectionalHint.bottomRightEdge ||
      directionalHint === DirectionalHint.topAutoEdge || directionalHint === DirectionalHint.bottomAutoEdge) {
      contextualMenuType = ContextualMenuType.vertical;
    } else {
      contextualMenuType = ContextualMenuType.horizontal;
    }

    // Get the horizontalAlignmentHint, for horizontal contextual menu, it will only be either left or right; for vertical contextual menu, center and auto is also an option.
    // auto means taht if the target is in the left half of host, the submenu will be align to left edge, if the target is in the right half of host, the submenu will be
    // align to right edge.
    if (directionalHint === DirectionalHint.bottomLeftEdge || directionalHint === DirectionalHint.leftBottomEdge ||
      directionalHint === DirectionalHint.leftCenter || directionalHint === DirectionalHint.leftTopEdge ||
      directionalHint === DirectionalHint.topLeftEdge) {
      horizontalAlignmentHint = HorizontalAlignmentHint.left;
    } else if (contextualMenuType === ContextualMenuType.vertical && (directionalHint === DirectionalHint.topCenter ||
      directionalHint === DirectionalHint.bottomCenter)) {
      horizontalAlignmentHint = HorizontalAlignmentHint.center;
    } else if (contextualMenuType === ContextualMenuType.vertical && (directionalHint === DirectionalHint.topAutoEdge ||
      directionalHint === DirectionalHint.bottomAutoEdge)) {
      horizontalAlignmentHint = HorizontalAlignmentHint.auto;
    } else {
      horizontalAlignmentHint = HorizontalAlignmentHint.right;
    }

    // Get the verticalAlignmentHint, for vertical contextual menu, it will only be either top or buttom; for horizontal contextual menu, center is also an option.
    if (directionalHint === DirectionalHint.leftTopEdge || directionalHint === DirectionalHint.rightTopEdge ||
      directionalHint === DirectionalHint.topCenter || directionalHint === DirectionalHint.topLeftEdge ||
      directionalHint === DirectionalHint.topRightEdge || directionalHint === DirectionalHint.topAutoEdge) {
      verticalAlignmentHint = VerticalAlignmentHint.top;
    } else if (contextualMenuType === ContextualMenuType.horizontal && (directionalHint === DirectionalHint.leftCenter ||
      directionalHint === DirectionalHint.rightCenter)) {
      verticalAlignmentHint = VerticalAlignmentHint.center;
    } else {
      verticalAlignmentHint = VerticalAlignmentHint.bottom;
    }

    parsedDirectionalHint = { contextualMenuType, horizontalAlignmentHint, verticalAlignmentHint };

    return parsedDirectionalHint;
  }

  // Check if it is necessary to switch contextualMenuType based on the menu size and window size. For horizontal contextual menu, if no
  // enough space on both left and right, then the contextualMenu type will be switch to vertical. For vertical contextual menu, if no
  // enough space on both top and bottom, then the contextualMenu type will be switch to horizontal.
  private _switchContextualMenuType(parsedDirectionalHint: IParsedDirectionalHint, menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo) {
    let { contextualMenuType } = parsedDirectionalHint;
    let { targetRect, menuRect, windowSize, gapSpace } = menuSizeWindowSizeInfo;

    if (contextualMenuType === ContextualMenuType.horizontal) {
      let hasEnoughSpaceLeft = targetRect.left > (menuRect.width + BUFFER_ZONE);
      let hasEnoughSpaceRight = (windowSize.width - targetRect.right) > (menuRect.width + BUFFER_ZONE);
      if (!hasEnoughSpaceLeft && !hasEnoughSpaceRight) {
        contextualMenuType = ContextualMenuType.vertical;
      }
    } else {
      let hasEnoughSpaceTop = targetRect.top > (menuRect.height + BUFFER_ZONE + gapSpace);
      let hasEnoughSpaceBottom = (windowSize.height - targetRect.bottom) > (menuRect.height + BUFFER_ZONE + gapSpace);
      if (!hasEnoughSpaceTop && !hasEnoughSpaceBottom) {
        contextualMenuType = ContextualMenuType.horizontal;
      }
    }

    return  contextualMenuType;
  }

  // Get actualHorizontalDirection for vertical contextual menu based on window space and menu size
  private _getActualHorizontalDirectionforVerticalContextualMenu(horizontalAlignmentHint: HorizontalAlignmentHint, menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo) {
    let { hostRect, targetRect, menuRect, windowSize } = menuSizeWindowSizeInfo;
    let actualHorizontalDirection: HorizontalAlignmentHint;

    if (horizontalAlignmentHint === HorizontalAlignmentHint.left) {
      let hasEnoughSpace = (windowSize.width - targetRect.left) > (menuRect.width + BUFFER_ZONE);

      if (hasEnoughSpace) {
        actualHorizontalDirection = HorizontalAlignmentHint.left;
      } else {
        actualHorizontalDirection = HorizontalAlignmentHint.right;
      }
    } else if (horizontalAlignmentHint === HorizontalAlignmentHint.center) {
      let hasEnoughSpaceLeft = targetRect.left > ((menuRect.width / 2) - (targetRect.width / 2) + BUFFER_ZONE);
      let hasEnoughSpaceRight = (windowSize.width - targetRect.right) > ((menuRect.width / 2) - (targetRect.width / 2) + BUFFER_ZONE);

      if (hasEnoughSpaceLeft && hasEnoughSpaceRight) {
        actualHorizontalDirection = HorizontalAlignmentHint.center;
      } else if (!hasEnoughSpaceLeft) {
        actualHorizontalDirection = HorizontalAlignmentHint.left;
      } else {
        actualHorizontalDirection = HorizontalAlignmentHint.right;
      }
    } else if (horizontalAlignmentHint === HorizontalAlignmentHint.right) {
      let hasEnoughSpace = targetRect.right > (menuRect.width + BUFFER_ZONE);

      if (hasEnoughSpace) {
        actualHorizontalDirection = HorizontalAlignmentHint.right;
      } else {
        actualHorizontalDirection = HorizontalAlignmentHint.left;
      }
    } else if (horizontalAlignmentHint === HorizontalAlignmentHint.auto) {
      let isLeftAligned = (targetRect.left - hostRect.left + (targetRect.width / 2)) < (hostRect.width / 2);
      if (isLeftAligned) {
        actualHorizontalDirection = HorizontalAlignmentHint.left;
      } else {
        actualHorizontalDirection = HorizontalAlignmentHint.right;
      }
    }

    return actualHorizontalDirection;
  }

  // Get actualVerticalDirection for vertical contextual menu based on window space and menu size
  private _getActualVerticalDirectionforVerticalContextualMenu(verticalAlignmentHint: VerticalAlignmentHint, menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo) {
    let { targetRect, menuRect, windowSize, gapSpace } = menuSizeWindowSizeInfo;
    let actualVerticalDirection: VerticalAlignmentHint;

    if (verticalAlignmentHint === VerticalAlignmentHint.bottom) {
      let hasEnoughSpace = (windowSize.height - targetRect.bottom) > (menuRect.height + gapSpace + BUFFER_ZONE);

      if (hasEnoughSpace) {
        actualVerticalDirection = VerticalAlignmentHint.bottom;
      } else {
        actualVerticalDirection = VerticalAlignmentHint.top;
      }
    } else if (verticalAlignmentHint === VerticalAlignmentHint.top) {
      let hasEnoughSpace = targetRect.top > (menuRect.height + gapSpace + BUFFER_ZONE);

      if (hasEnoughSpace) {
        actualVerticalDirection = VerticalAlignmentHint.top;
      } else {
        actualVerticalDirection = VerticalAlignmentHint.bottom;
      }
    }

    return actualVerticalDirection;
  }

  // Calculate positions based on actualHorizontalDirection and actualVerticalDirection for vertical contextual menu
  private _calculatePositionsforVerticalContextualMenu(
    actualVerticalDirection: VerticalAlignmentHint,
    actualHorizontalDirection: HorizontalAlignmentHint,
    menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo,
    positionInfo: IPositionInfo
  ) {
    let { hostRect, targetRect, menuRect, gapSpace } = menuSizeWindowSizeInfo;
    let { menuPosition, beakPosition, directionalClassName } = positionInfo;

    // Calculate the horizontal position based on actualHorizontalDirection
    if (actualHorizontalDirection === HorizontalAlignmentHint.left) {
      menuPosition.left = targetRect.left - hostRect.left;
      beakPosition.left = Math.max(
        BEAK_PADDING,
        Math.min(
          menuRect.width - BEAK_PADDING - BEAK_WIDTH,
          (targetRect.width / 2) - (BEAK_WIDTH / 2)
        ));
    } else if (actualHorizontalDirection === HorizontalAlignmentHint.center) {
      let targetCenter = targetRect.left - hostRect.left + (targetRect.width / 2);
      menuPosition.left = targetCenter - menuRect.width / 2;
      beakPosition.left = (menuRect.width / 2) - (BEAK_WIDTH / 2);
    } else {
      menuPosition.left = targetRect.right - hostRect.left - menuRect.width;
      beakPosition.left = Math.max(
        BEAK_PADDING,
        Math.min(
          menuRect.width - BEAK_PADDING - BEAK_WIDTH,
          menuRect.width - (targetRect.width / 2) - (BEAK_WIDTH / 2)
        ));
    }

    // Calculate the vertical position based on actualVerticalDirection
    if (actualVerticalDirection === VerticalAlignmentHint.top) {
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
  private _getActualHorizontalDirectionforHorizontalContextualMenu(horizontalAlignmentHint: HorizontalAlignmentHint, menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo) {
    let { targetRect, menuRect, windowSize, gapSpace } = menuSizeWindowSizeInfo;
    let actualHorizontalDirection: HorizontalAlignmentHint;

    if (horizontalAlignmentHint === HorizontalAlignmentHint.right) {
      let hasEnoughSpace = (windowSize.width - targetRect.right) > (menuRect.width + gapSpace + BUFFER_ZONE);

      if (hasEnoughSpace) {
        actualHorizontalDirection = HorizontalAlignmentHint.right;
      } else {
        actualHorizontalDirection = HorizontalAlignmentHint.left;
      }
    } else if (horizontalAlignmentHint === HorizontalAlignmentHint.left) {
      let hasEnoughSpace = targetRect.left > menuRect.width + gapSpace + BUFFER_ZONE;

      if (hasEnoughSpace) {
        actualHorizontalDirection = HorizontalAlignmentHint.left;
      } else {
        actualHorizontalDirection = HorizontalAlignmentHint.right;
      }
    }

    return actualHorizontalDirection;
  }

  // Get actualVerticalDirection for horizontal contextual menu based on window space and menu size
  private _getActualVerticalDirectionforHorizontalContextualMenu(verticalAlignmentHint: VerticalAlignmentHint, menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo) {
    let { targetRect, menuRect, windowSize } = menuSizeWindowSizeInfo;
    let actualVerticalDirection: VerticalAlignmentHint;

    if (verticalAlignmentHint === VerticalAlignmentHint.top) {
      let hasEnoughSpace = targetRect.bottom > (menuRect.height + BUFFER_ZONE);

      if (hasEnoughSpace) {
        actualVerticalDirection = VerticalAlignmentHint.top;
      } else {
        actualVerticalDirection = VerticalAlignmentHint.bottom;
      }
    } else if (verticalAlignmentHint === VerticalAlignmentHint.center) {
      let hasEnoughSpaceTop = (targetRect.top + targetRect.height / 2) > (menuRect.height / 2 + BUFFER_ZONE);
      let hasEnoughSpaceBottom = (windowSize.height - targetRect.top - targetRect.height / 2) > (menuRect.height / 2 + BUFFER_ZONE);

      if (hasEnoughSpaceTop && hasEnoughSpaceBottom) {
        actualVerticalDirection = VerticalAlignmentHint.center;
      } else if (!hasEnoughSpaceTop) {
        actualVerticalDirection = VerticalAlignmentHint.bottom;
      } else {
        actualVerticalDirection = VerticalAlignmentHint.top;
      }
    } else if (verticalAlignmentHint === VerticalAlignmentHint.bottom) {
      let hasEnoughSpace = (windowSize.height - targetRect.top) > (menuRect.height + BUFFER_ZONE);

      if (hasEnoughSpace) {
        actualVerticalDirection = VerticalAlignmentHint.bottom;
      } else {
        actualVerticalDirection = VerticalAlignmentHint.top;
      }
    }

    return actualVerticalDirection;
  }

  // Calculate positions based on actualHorizontalDirection and actualVerticalDirection for horizontal contextual menu
  private _calculatePositionsforHorizontalContextualMenu(
    actualVerticalDirection: VerticalAlignmentHint,
    actualHorizontalDirection: HorizontalAlignmentHint,
    menuSizeWindowSizeInfo: IMenuSizeWindowSizeInfo,
    positionInfo: IPositionInfo
  ) {
    let { hostRect, targetRect, menuRect, gapSpace } = menuSizeWindowSizeInfo;
    let { menuPosition, beakPosition, directionalClassName } = positionInfo;

    // Calculate horizontal position based on actualHorizontalDirection
    if (actualHorizontalDirection === HorizontalAlignmentHint.left) {
      menuPosition.left = targetRect.left - hostRect.left - gapSpace - menuRect.width;
      beakPosition.left = menuRect.width - (BEAK_WIDTH / 2);
      directionalClassName = SLIDE_ANIMATIONS.left;
    } else {
      menuPosition.left = targetRect.right - hostRect.left + gapSpace;
      beakPosition.left = - (BEAK_WIDTH / 2);
      directionalClassName = SLIDE_ANIMATIONS.right;
    }

    // Calculate vertical position based on actualVerticalDirection
    if (actualVerticalDirection === VerticalAlignmentHint.top) {
      menuPosition.top = targetRect.bottom - hostRect.top - menuRect.height;
      beakPosition.top = menuRect.height - (targetRect.height / 2) - (BEAK_WIDTH / 2);
    } else if (actualVerticalDirection === VerticalAlignmentHint.center) {
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
