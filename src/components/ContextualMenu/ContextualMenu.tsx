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

export enum DirectionalHint {
  auto,
  left,
  center,
  right,
  top,
  bottom,
  vertical,
  horizontal
};

export interface IContextualMenuItem {
  key?: string;
  name: string;
  icon?: string;
  isEnabled?: boolean;
  shortCut?: string;
  canCheck?: boolean;
  isChecked?: boolean;
  onClick?: (ev: React.MouseEvent) => void;
  items?: IContextualMenuItem[];
}

export interface IContextualMenuProps {
  items: IContextualMenuItem[];
  targetElement?: HTMLElement;
  menuKey?: string;
  typeAlignmentHint?: DirectionalHint;
  horizontalAlignmentHint?: DirectionalHint;
  verticalAlignmentHint?: DirectionalHint;
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

export default class ContextualMenu extends React.Component<IContextualMenuProps, IContextualMenuState> {
  // The default ContextualMenu properities have no items and beak, the default submenu direction is right and top.
  public static defaultProps = {
    items: [],
    shouldFocusOnMount: true,
    isBeakVisible: false,
    gapSpace: 0,
    typeAlignmentHint: DirectionalHint.horizontal,
    horizontalAlignmentHint: DirectionalHint.right,
    verticalAlignmentHint: DirectionalHint.bottom
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
    if (!this._didSetInitialFocus) {
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
    let areAnyIconsVisible = items.some(item => !!item.icon);

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
                        { (areAnyIconsVisible) ? (
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

  private _onItemClick(item: any, ev) {
    if (!item.items || !item.items.length) { // This is an item without a menu. Click it.
      if (item.onClick) {
        item.onClick(item);
        this._onContextMenuDismiss();
      }
    } else {
      if (item.key === this.state.expandedMenuItemKey) { // This has an expanded sub menu. collapse it.
        this._onContextMenuDismiss();
      } else { // This has a collapsed sub menu. Expand it.
        this.setState({
          expandedMenuItemKey: item.key,
          submenuProps: {
            items: item.items,
            targetElement: ev.currentTarget,
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
    let { targetElement, typeAlignmentHint, horizontalAlignmentHint, verticalAlignmentHint, gapSpace } = props;
    let { positions } = state;
    let hostElement = this.refs.host;
    let menuElement = this.refs.menu;
    let windowSize: { width: number, height: number } = { width: window.innerWidth, height: window.innerHeight };
    let directionalClassName: string;

    let position = {
      top: 0,
      left: 0,
    };

    let beakPosition = {
      display: 'block',
      left: 0,
      top: -BEAK_OFFSET,
    };

    if (hostElement && targetElement && menuElement) {
      let hostRect = hostElement.getBoundingClientRect();
      let targetRect = targetElement.getBoundingClientRect();
      let menuRect = menuElement.getBoundingClientRect();

      // ContextualMenu submenu render type: vertical
      if (typeAlignmentHint === DirectionalHint.vertical) {
        let actualHorizontalDirection: DirectionalHint;
        let actualVerticalDirection: DirectionalHint;

        // Set actualHorizontalDirection based on window space
        if (horizontalAlignmentHint === DirectionalHint.left) {
          let hasEnoughSpace = windowSize.width - targetRect.left > menuRect.width + BUFFER_ZONE;

          if (hasEnoughSpace) {
            actualHorizontalDirection = DirectionalHint.left;
          } else {
            actualHorizontalDirection = DirectionalHint.right;
          }
        } else if (horizontalAlignmentHint === DirectionalHint.center) {
          let hasEnoughSpaceLeft = targetRect.left > (menuRect.width / 2) - (targetRect.width / 2) + BUFFER_ZONE;
          let hasEnoughSpaceRight = windowSize.width - targetRect.right > (menuRect.width / 2) - (targetRect.width / 2) + BUFFER_ZONE;

          if (hasEnoughSpaceLeft && hasEnoughSpaceRight) {
            actualHorizontalDirection = DirectionalHint.center;
          } else if (!hasEnoughSpaceLeft) {
            actualHorizontalDirection = DirectionalHint.left;
          } else {
            actualHorizontalDirection = DirectionalHint.right;
          }
        } else if (horizontalAlignmentHint === DirectionalHint.right) {
          let hasEnoughSpace = targetRect.right > menuRect.width + BUFFER_ZONE;

          if (hasEnoughSpace) {
            actualHorizontalDirection = DirectionalHint.right;
          } else {
            actualHorizontalDirection = DirectionalHint.left;
          }
        } else if (horizontalAlignmentHint === DirectionalHint.auto) {
          let isLeftAligned = (targetRect.left - hostRect.left + (targetRect.width / 2)) < (hostRect.width / 2);
          if (isLeftAligned) {
            actualHorizontalDirection = DirectionalHint.left;
          } else {
            actualHorizontalDirection = DirectionalHint.right;
          }

        }

        // Set the actualVerticalDirection based on the window space
        if (verticalAlignmentHint === DirectionalHint.bottom) {
          let hasEnoughSpace = (windowSize.height - targetRect.bottom) > menuRect.height + gapSpace + BUFFER_ZONE;

          if (hasEnoughSpace) {
            actualVerticalDirection = DirectionalHint.bottom;
          } else {
            actualVerticalDirection = DirectionalHint.top;
          }
        } else if (verticalAlignmentHint === DirectionalHint.top) {
          let hasEnoughSpace = targetRect.top > menuRect.height + gapSpace + BUFFER_ZONE;

          if (hasEnoughSpace) {
            actualVerticalDirection = DirectionalHint.top;
          } else {
            actualVerticalDirection = DirectionalHint.bottom;
          }
        }

        // Calculate the horizontal position based on actualHorizontalDirection
        if (actualHorizontalDirection === DirectionalHint.left) {
          position.left = targetRect.left - hostRect.left;
          beakPosition.left = (targetRect.width / 2) - (BEAK_WIDTH / 2);
        } else if (actualHorizontalDirection === DirectionalHint.center) {
          let targetCenter = targetRect.left - hostRect.left + (targetRect.width / 2);
          position.left = targetCenter - menuRect.width / 2;
          beakPosition.left = (menuRect.width / 2) - (BEAK_WIDTH / 2);
        } else {
          position.left = targetRect.right - hostRect.left - menuRect.width;
          beakPosition.left = menuRect.width - (targetRect.width / 2) - (BEAK_WIDTH / 2);
        }

        // Calculate the vertical position based on actualVerticalDirection
        if (actualVerticalDirection === DirectionalHint.top) {
          position.top = targetRect.top - hostRect.top - gapSpace - menuRect.height;
          beakPosition.top = menuRect.height - BEAK_WIDTH / 2;
          directionalClassName = SLIDE_ANIMATIONS.up;
        } else {
          position.top = targetRect.bottom - hostRect.top + gapSpace;
          // Beak vertical position is in default position
          directionalClassName = SLIDE_ANIMATIONS.down;
        }

        // ContextualMenu submenu render type: horizontal
      } else if (typeAlignmentHint === DirectionalHint.horizontal) {
        let actualHorizontalDirection: DirectionalHint;
        let actualVerticalDirection: DirectionalHint;

        // Set actualHorizontalDirection based on window space
        if (horizontalAlignmentHint === DirectionalHint.right) {
          let hasEnoughSpace = (windowSize.width - targetRect.right) > menuRect.width + gapSpace + BUFFER_ZONE;

          if (hasEnoughSpace) {
            actualHorizontalDirection = DirectionalHint.right;
          } else {
            actualHorizontalDirection = DirectionalHint.left;
          }
        } else if (horizontalAlignmentHint === DirectionalHint.left) {
          let hasEnoughSpace = targetRect.left > menuRect.width + gapSpace + BUFFER_ZONE;

          if (hasEnoughSpace) {
            actualHorizontalDirection = DirectionalHint.left;
          } else {
            actualHorizontalDirection = DirectionalHint.right;
          }
        }

        // Set actualVerticalDirection based on window space
        if (verticalAlignmentHint === DirectionalHint.top) {
          let hasEnoughSpace = targetRect.bottom > menuRect.height + BUFFER_ZONE;

          if (hasEnoughSpace) {
            actualVerticalDirection = DirectionalHint.top;
          } else {
            actualVerticalDirection = DirectionalHint.bottom;
          }
        } else if (verticalAlignmentHint === DirectionalHint.center) {
          let hasEnoughSpaceTop = targetRect.top + targetRect.height / 2 > menuRect.height / 2 + BUFFER_ZONE;
          let hasEnoughSpaceBottom = windowSize.height - targetRect.top - targetRect.height / 2 > menuRect.height / 2 + BUFFER_ZONE;

          if (hasEnoughSpaceTop && hasEnoughSpaceBottom) {
            actualVerticalDirection = DirectionalHint.center;
          } else if (!hasEnoughSpaceTop) {
            actualVerticalDirection = DirectionalHint.bottom;
          } else {
            actualVerticalDirection = DirectionalHint.top;
          }
        } else if (verticalAlignmentHint === DirectionalHint.bottom) {
          let hasEnoughSpace = windowSize.height - targetRect.top > menuRect.height + BUFFER_ZONE;

          if (hasEnoughSpace) {
            actualVerticalDirection = DirectionalHint.bottom;
          } else {
            actualVerticalDirection = DirectionalHint.top;
          }
        }

        // Calculate horizontal position based on actualHorizontalDirection
        if (actualHorizontalDirection === DirectionalHint.left) {
          position.left = targetRect.left - hostRect.left - gapSpace - menuRect.width;
          beakPosition.left = menuRect.width - 2 * BEAK_OFFSET;
          directionalClassName = SLIDE_ANIMATIONS.left;
        } else {
          position.left = targetRect.right - hostRect.left + gapSpace;
          beakPosition.left = -BEAK_OFFSET;
          directionalClassName = SLIDE_ANIMATIONS.right;
        }

        // Calculate vertical position based on actualVerticalDirection
        if (actualVerticalDirection === DirectionalHint.top) {
          position.top = targetRect.bottom - hostRect.top - menuRect.height;
          beakPosition.top = menuRect.height - (targetRect.height / 2) - (BEAK_WIDTH / 2);
        } else if (actualVerticalDirection === DirectionalHint.center) {
          position.top = targetRect.bottom - hostRect.top + (menuRect.height / 2 - targetRect.height / 2) - menuRect.height;
          beakPosition.top = (menuRect.height / 2) - (BEAK_WIDTH / 2);
        } else {
          position.top = targetRect.top - hostRect.top;
          beakPosition.top = (targetRect.height / 2) - (BEAK_WIDTH / 2);
        }
      }
    }

    let newPositions = {
      menu: position,
      beak: beakPosition
    };

    // Set the new position only when the positions are not exists or one of the newPositions are different
    if ((!positions && newPositions) ||
      (positions && newPositions && (positions.menu.top !== newPositions.menu.top || positions.menu.left !== newPositions.menu.left))) {
      this.setState({
        positions: {
          menu: newPositions.menu,
          beak: newPositions.beak
        },
        slideDirectionalClassName: directionalClassName,
      });
    }
  }
}
