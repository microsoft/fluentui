import * as React from 'react';
import FocusZone from '../../utilities/focus/FocusZone';
import './ContextualMenu.scss';
import KeyCodes from '../../utilities/KeyCodes';
import { css } from '../../utilities/css';

const BEAK_WIDTH = 16;

export enum DirectionalHint {
  left,
  center,
  right,
  top,
  bottom
};

export interface IContextualMenuItem {
  key: string;
  name: string;
  icon?: string;
  isEnabled?: boolean;
  shortCut?: string;
  checkMark?: boolean;
  onClick?: (ev: React.MouseEvent) => void;
  items?: IContextualMenuItem[];
}

export interface IContextualMenuProps {
  items: IContextualMenuItem[];
  targetElement?: HTMLElement;
  menuKey?: string;
  horizontalAlignmentHint?: DirectionalHint;
  verticalAlignmentHint?: DirectionalHint;
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
}

export default class ContextualMenu extends React.Component<IContextualMenuProps, IContextualMenuState> {
  //The default ContextualMenu properities have no items and beak, the default submenu direction is right and top.
  public static defaultProps = {
    items: [],
    shouldFocusOnMount: true,
    isBeakVisible: false,
    horizontalAlignmentHint: DirectionalHint.right,
    verticalAlignmentHint: DirectionalHint.top
  };

  private _previousActiveElement: HTMLElement;
  private _isFocusingPreviousElement;
  private _didSetInitialFocus;

  constructor(props: IContextualMenuProps) {
    super(props);

    this.state = {
      contextualMenuItems: null
    };

    this._isFocusingPreviousElement = false;
    this._didSetInitialFocus = false;

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
    this._onContextMenuDismiss = this._onContextMenuDismiss.bind(this);
  }

  public dismiss(ev?: any) {
    let { onDismiss } = this.props;

    if (onDismiss) {
      onDismiss(ev);
    }
  }

  //Invoked once, both on the client and server, immediately before the initial rendering occurs.
  public componentWillMount() {
    this._previousActiveElement = document.activeElement as HTMLElement;
  }

  //Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
  public componentDidMount() {
    this.setState({
      positions: this._getRelativePositions(this.props)
    });
  }


  //Invoked when a component is receiving new props.
  public componentWillReceiveProps(newProps: IContextualMenuProps) {
    if (newProps.targetElement !== this.props.targetElement) {
      this._didSetInitialFocus = false;
    }

    this.setState({
      positions: this._getRelativePositions(newProps)
    });
  }

  //Invoked immediately after the component's updates are flushed to the DOM.
  public componentDidUpdate() {
    if (!this._didSetInitialFocus) {
      let focusZone = this.refs['focusZone'] as FocusZone;

      if (focusZone) {
        focusZone.focus();
        this._didSetInitialFocus = true;
      }
    }
  }

  //Invoked immediately before a component is unmounted from the DOM.
  public componentWillUnmount() {
    if (this._isFocusingPreviousElement && this._previousActiveElement) {
      this._previousActiveElement.focus();
    }
  }

  public render() {
    let { className, menuKey, items, isBeakVisible, labelElementId, targetElement, horizontalAlignmentHint, verticalAlignmentHint } = this.props;
    let { contextualMenuItems, expandedMenuItemKey, contextualMenuTarget, submenuProps, positions } = this.state;
    let left = 0;

    if (!positions) {
      return (
        <div ref='host' className={ css('ms-ContextualMenu-container', className) } />
      );
    }

    return (
      <div ref='host' className={ css('ms-ContextualMenu-container', className) }>
        { (items && items.length) ? (
        <FocusZone
          key={ menuKey }
          className='ms-ContextualMenu is-open ms-u-slideDownIn10'
          ref='focusZone' onLostFocus={ this._onBlur }
          role='menu'
          ariaLabelledBy={ labelElementId }
          style={ positions.menu }
        >
        { isBeakVisible ? (<div className='ms-ContextualMenu-beak'  style={ positions.beak } />) : (null)}
        <ul className='ms-ContextualMenu-list is-open ' onKeyDown={ this._onKeyDown } >
          { items.map((item, index) => (
            //If the item name is equal to '-', a divider will be generated.
            item.name === '-' ? (
            <li key={ item.key || index } className="ms-ContextualMenu-item ms-ContextualMenu-item--divider"></li>
            ) : (
            <li key={ item.key || index } className='ms-ContextualMenu-item' ref={ item.key }>
              <button
                className={ css('ms-ContextualMenu-link', { 'is-expanded': (expandedMenuItemKey === item.key) }) }
                onClick={ this._onItemClick }
                data-command-key={ index }
                role='menuitem'
              >
                <span className={ `ms-ContextualMenu-icon ms-Icon ms-Icon--${ item.icon }` }></span>
                <span className='ms-ContextualMenu-itemText ms-font-m ms-font-weight-regular'>{ item.name }</span>
                { (item.items && item.items.length) ? (
                <i className='ms-ContextualMenu-chevronRight ms-Icon ms-Icon--chevronRight' />
                ) : ( null ) }
              </button>
            </li>
            )
            )) }
          </ul>
        </FocusZone>
        ) : ( null ) }
        { submenuProps ? ( //If a submenu properities exists, the submenu will be rendered.
        <ContextualMenu { ...submenuProps } />
        ) : ( null ) }
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

  private _onClick(ev: React.MouseEvent, item: IContextualMenuItem) {
    if (item.onClick) {
      item.onClick(ev);
    }

    // When a user clicks on an item, we will try to refocus the previous focused element.
    this._isFocusingPreviousElement = true;
    this.dismiss();
  }

  private _onBlur(ev: React.FocusEvent) {
    if (!this.state.submenuProps && !(ev.currentTarget as HTMLElement).contains(ev.relatedTarget as HTMLElement)) {
      // When the user clicks on something unrelated, we won't make an attempt to reset focus back to the originating focused element.
      this.dismiss(ev);
    }
  }

  private _onItemClick(ev) {
    let item = this.props.items[Number(ev.currentTarget.getAttribute('data-command-key'))];

    if (item.key === this.state.expandedMenuItemKey || !item.items || !item.items.length) {
      this._onContextMenuDismiss();
    } else {
      this.setState({
        submenuProps: {
          items: item.items,
          targetElement: ev.currentTarget,
          menuKey: item.key,
          onDismiss: this._onContextMenuDismiss
        }
      });
    }
  }

  private _onContextMenuDismiss(ev?: any) {
    if (!ev || !ev.relatedTarget || !(this.refs['host'] as HTMLElement).contains(ev.relatedTarget as HTMLElement)) {
      this.setState({
        submenuProps: null
      });
    } else {
      ev.stopPropagation();
      ev.preventDefault();
    }
  }

  //Get the position of submenu and beak
  private _getRelativePositions(props: IContextualMenuProps) {
    let { targetElement, horizontalAlignmentHint, verticalAlignmentHint } = props;
    let hostElement = (this.refs['host'] as HTMLElement);
    let position = {
      top: 0,
    };
    let beakPosition = {
      display: 'block',
    };

    if (hostElement && targetElement) {

      let hostRect = hostElement.getBoundingClientRect();
      let targetRect = targetElement.getBoundingClientRect();

      if (horizontalAlignmentHint == DirectionalHint.left) {
        //Check if the target is on left half of screen or right half of screen
        let isLeftAligned = (targetRect.left - hostRect.left + (targetRect.width / 2)) < (hostRect.width / 2);

        //If on the left half of screen, the submenu position will be on left aligned, otherwise right aligned.
        if (isLeftAligned) {
          position['left'] = targetRect.left - hostRect.left;
          beakPosition['left'] = (targetRect.width / 2) - (BEAK_WIDTH / 2);
        } else {
          position['right'] = hostRect.right - targetRect.right;
          beakPosition['right'] = (targetRect.width / 2) - (BEAK_WIDTH / 2);
        }

      } else if (horizontalAlignmentHint == DirectionalHint.right) {
        //Check if there is enough space on the right to fit the target
        let isRightAligned = (hostRect.right - targetRect.right) > targetRect.width;

        //If the space is enough, the submenu will be display at target right, otherwise on the target left.
        if (isRightAligned) {
          position['left'] = targetRect.right - hostRect.left;
        } else {
          position['right'] = targetRect.left - hostRect.left;
        }

      }

      //If the vertical direction hint is top, the submenu will be display on the top of target; if center, display on the
      //vertical middle of target; if bottom, display on the bottom of target.
      //Becasue the host is in the bottom of the contextualMenu, so the relative position is actually negative to host.
      if (verticalAlignmentHint == DirectionalHint.top) {
        position['top'] = targetRect.top - hostRect.top;
      } else if (verticalAlignmentHint == DirectionalHint.center) {
        position['top'] = targetRect.top - hostRect.top + (targetRect.height) / 2;
      } else if (verticalAlignmentHint == DirectionalHint.center) {
        position['top'] = targetRect.bottom - hostRect.top;
      }

    }

    return {
      menu: position,
      beak: beakPosition
    };
  }

}