import * as React from 'react';
import { ICommandBar, ICommandBarProps } from './CommandBar.Props';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { ContextualMenu, IContextualMenuItem } from '../../ContextualMenu';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { DirectionalHint } from '../../common/DirectionalHint';
import { autobind } from '../../utilities/autobind';
import { css } from '../../utilities/css';
import { getId } from '../../utilities/object';
import { buttonProperties, divProperties, getNativeProps } from '../../utilities/properties';
import './CommandBar.scss';

const OVERFLOW_KEY = 'overflow';
const OVERFLOW_WIDTH = 41.5;

export interface ICommandBarState {
  renderedItems?: IContextualMenuItem[];
  renderedOverflowItems?: IContextualMenuItem[];
  expandedMenuItemKey?: string;
  expandedMenuId?: string;
  contextualMenuItems?: IContextualMenuItem[];
  contextualMenuTarget?: HTMLElement;
  renderedFarItems?: IContextualMenuItem[];
}

export class CommandBar extends React.Component<ICommandBarProps, ICommandBarState> implements ICommandBar {
  public static defaultProps = {
    items: [],
    overflowItems: [],
    farItems: []
  };

  public refs: {
    [key: string]: React.ReactInstance;
    commandSurface: HTMLElement;
    farCommandSurface: HTMLElement;
    commandBarRegion: HTMLElement;
    searchSurface: HTMLElement;
    focusZone: FocusZone;
  };

  private _id: string;
  private _overflowWidth: number;
  private _commandItemWidths: { [key: string]: number };
  private _events: EventGroup;

  constructor(props: ICommandBarProps) {
    super(props);

    this.state = this._getStateFromProps(props);

    this._id = getId('CommandBar');
    this._events = new EventGroup(this);
  }

  public componentDidMount() {
    this._updateItemMeasurements();
    this._updateRenderedItems();

    this._events.on(window, 'resize', this._updateRenderedItems);
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public componentWillReceiveProps(nextProps: ICommandBarProps) {
    this.setState(this._getStateFromProps(nextProps));
    this._commandItemWidths = null;
  }

  public componentDidUpdate(prevProps: ICommandBarProps, prevStates: ICommandBarState) {
    if (!this._commandItemWidths) {
      this._updateItemMeasurements();
      this._updateRenderedItems();
    }
  }

  public render() {
    const { isSearchBoxVisible, searchPlaceholderText, className } = this.props;
    const { renderedItems, contextualMenuItems, expandedMenuItemKey, expandedMenuId, renderedOverflowItems, contextualMenuTarget, renderedFarItems } = this.state;
    let searchBox;

    if (isSearchBoxVisible) {
      searchBox = (
        <div className='ms-CommandBarSearch' ref='searchSurface'>
          <input className='ms-CommandBarSearch-input' type='text' placeholder={ searchPlaceholderText } />
          <div className='ms-CommandBarSearch-iconWrapper ms-CommandBarSearch-iconSearchWrapper'>
            <i className='ms-Icon ms-Icon--Search'></i>
          </div>
          <div className='ms-CommandBarSearch-iconWrapper ms-CommandBarSearch-iconClearWrapper ms-font-s'>
            <i className='ms-Icon ms-Icon--Cancel'></i>
          </div>
        </div>
      );
    }

    return (
      <div className={ css('ms-CommandBar', className) } ref='commandBarRegion'>
        { searchBox }
        <FocusZone ref='focusZone' direction={ FocusZoneDirection.horizontal } rootProps={ { role: 'menubar' } }>
          <div className='ms-CommandBar-primaryCommands' ref='commandSurface'>
            { renderedItems.map((item, index) => (
              this._renderItemInCommandBar(item, index, expandedMenuItemKey)
            )).concat((renderedOverflowItems && renderedOverflowItems.length) ? [
            <div className='ms-CommandBarItem' key={ OVERFLOW_KEY } ref={ OVERFLOW_KEY }>
              <button
                id={ this._id + OVERFLOW_KEY }
                className={ css('ms-CommandBarItem-link', { 'is-expanded': (expandedMenuItemKey === OVERFLOW_KEY) }) }
                onClick={ this._onOverflowClick }
                role='menuitem'
                aria-label={ this.props.elipisisAriaLabel || '' }
                aria-haspopup={ true }
                data-automation-id='commandBarOverflow'
              >
                <i className='ms-CommandBarItem-overflow ms-Icon ms-Icon--More' />
              </button>
            </div>
            ] : []) }
          </div>
          <div className='ms-CommandBar-sideCommands' ref='farCommandSurface'>
            { renderedFarItems.map((item, index) => (
              this._renderItemInCommandBar(item, index, expandedMenuItemKey, true)
            )) }
          </div>
        </FocusZone>
        { (contextualMenuItems) ?
        (<ContextualMenu
          labelElementId={ expandedMenuId }
          className='ms-CommandBar-menuHost'
          items={ contextualMenuItems }
          targetElement={ contextualMenuTarget }
          onDismiss={ this._onContextMenuDismiss }
          isBeakVisible={ true }
          directionalHint={ DirectionalHint.bottomAutoEdge }
        />
        ) : (null)}
      </div>
    );
  }

  public focus() {
    this.refs.focusZone.focus();
  }

  private _renderItemInCommandBar(item: IContextualMenuItem, index: number, expandedMenuItemKey: string, isFarItem?: boolean) {
    const itemKey = item.key || index;
    const className = css(item.onClick ? 'ms-CommandBarItem-link' : 'ms-CommandBarItem-text', !item.name && 'ms-CommandBarItem--noName');
    const classNameValue = css(className, { 'is-expanded': (expandedMenuItemKey === item.key) });

    return <div className={ css('ms-CommandBarItem', item.className) } key={ itemKey } ref={ itemKey }>
             {(() => {
               if (item.onClick || item.items) {
                 return <button
                         { ...getNativeProps(item, buttonProperties) }
                         id={ this._id + item.key }
                         className={ classNameValue }
                         onClick={ this._onItemClick.bind(this, item) }
                         data-command-key={ index }
                         aria-haspopup={ !!(item.items && item.items.length) }
                         role='menuitem'
                         aria-label={ item.ariaLabel || item.name }
                       >
                         { (!!item.icon) && <span className={ `ms-CommandBarItem-icon ms-Icon ms-Icon--${ item.icon }` }></span> }
                         { (!!item.name) && <span className='ms-CommandBarItem-commandText'>{ item.name }</span> }
                         { (item.items && item.items.length) ? (
                           <i className='ms-CommandBarItem-chevronDown ms-Icon ms-Icon--ChevronDown' />
                         ) : ( null ) }
                       </button>;
               } else {
                 return <div
                         { ...getNativeProps(item, divProperties) }
                         id={ this._id + item.key }
                         className={ classNameValue }
                         data-command-key={ index }
                         aria-haspopup={ !!(item.items && item.items.length) }
                       >
                         <span className={ `ms-CommandBarItem-icon ms-Icon ms-Icon--${ item.icon }` }></span>
                         <span className='ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular' aria-hidden='true' role='presentation'>{ item.name }</span>
                       </div>;
               }
             })()}
           </div>;
  }

  private _updateItemMeasurements() {
    // the generated width for overflow is 35 in chrome, 38 in IE, but the actual value is 41.5
    if (this.refs[OVERFLOW_KEY] || (this.props.overflowItems && this.props.overflowItems.length)) {
      this._overflowWidth = OVERFLOW_WIDTH;
    } else {
      this._overflowWidth = 0;
    }

    if (!this._commandItemWidths) {
      this._commandItemWidths = {};
    }

    for (let i = 0; i < this.props.items.length; i++) {
      let item = this.props.items[i];

      if (!this._commandItemWidths[item.key]) {
        let el = this.refs[item.key] as HTMLElement;

        if (el) {
          this._commandItemWidths[item.key] = el.getBoundingClientRect().width;
        }
      }
    }
  }

  private _updateRenderedItems() {
    let { items, overflowItems } = this.props;
    let commandSurface = this.refs.commandSurface;
    let farCommandSurface = this.refs.farCommandSurface;
    let commandBarRegion = this.refs.commandBarRegion;
    let searchSurface = this.refs.searchSurface;
    let renderedItems = [].concat(items);
    let renderedOverflowItems = overflowItems;
    let consumedWidth = 0;
    let isOverflowVisible = overflowItems && overflowItems.length;

    let style = window.getComputedStyle(commandSurface);
    let availableWidth = commandBarRegion.clientWidth - parseInt(style.marginLeft, 10) - parseInt(style.marginRight, 10);
    if (searchSurface) {
      availableWidth -= searchSurface.getBoundingClientRect().width;
    }
    if (farCommandSurface) {
      availableWidth -= farCommandSurface.getBoundingClientRect().width;
    }

    if (isOverflowVisible) {
      availableWidth -= this._overflowWidth;
    }

    for (let i = 0; i < renderedItems.length; i++) {
      let item = renderedItems[i];
      let itemWidth = this._commandItemWidths[item.key];

      if ((consumedWidth + itemWidth) >= availableWidth) {
        if (i > 0 && !isOverflowVisible && (availableWidth - consumedWidth) < OVERFLOW_WIDTH) {
          i--;
        }

        renderedOverflowItems = renderedItems.splice(i).concat(overflowItems);
        break;
      } else {
        consumedWidth += itemWidth;
      }

    }

    this.setState({
      renderedItems: renderedItems,
      renderedOverflowItems: renderedOverflowItems,
      expandedMenuItemKey: null,
      contextualMenuItems: null,
      contextualMenuTarget: null
    });
  }

  private _onItemClick(item, ev) {
    if (item.key === this.state.expandedMenuItemKey || !item.items || !item.items.length) {
      this._onContextMenuDismiss();
    } else {
      this.setState({
        expandedMenuId: ev.currentTarget.id,
        expandedMenuItemKey: item.key,
        contextualMenuItems: item.items,
        contextualMenuTarget: ev.currentTarget
      });
    }
    if (item.onClick) {
      item.onClick(item, ev);
    }
  }

  @autobind
  private _onOverflowClick(ev) {
    if (this.state.expandedMenuItemKey === OVERFLOW_KEY) {
      this._onContextMenuDismiss();
    } else {
      this.setState({
        expandedMenuId: ev.currentTarget.id,
        expandedMenuItemKey: OVERFLOW_KEY,
        contextualMenuItems: this.state.renderedOverflowItems,
        contextualMenuTarget: ev.currentTarget
      });
    }
  }

  @autobind
  private _onContextMenuDismiss(ev?: any) {
    if (!ev || !ev.relatedTarget || !this.refs.commandSurface.contains(ev.relatedTarget as HTMLElement)) {
      this.setState({
        expandedMenuItemKey: null,
        contextualMenuItems: null,
        contextualMenuTarget: null
      });
    } else {
      ev.stopPropagation();
      ev.preventDefault();
    }
  }

  private _getStateFromProps(nextProps: ICommandBarProps) {
    return {
      renderedItems: nextProps.items || [],
      renderedOverflowItems: null,
      contextualMenuItems: null,
      renderedFarItems: nextProps.farItems || null
    };
  }
}
