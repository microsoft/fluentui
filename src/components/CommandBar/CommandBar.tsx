import * as React from 'react';
import './CommandBar.scss';
import { FocusZone, FocusZoneDirection } from '../../utilities/focus/index';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import { default as ContextualMenu } from '../ContextualMenu/index';
import { css } from '../../utilities/css';
import { IContextualMenuItem } from '../index';
import { ICommandBarProps } from './CommandBar.Props';
import { DirectionalHint } from '../index';

const OVERFLOW_KEY = 'overflow';
const OVERFLOW_WIDTH = 41.5;

let _instance = 0;

export interface ICommandBarState {
  renderedItems?: IContextualMenuItem[];
  renderedOverflowItems?: IContextualMenuItem[];
  expandedMenuItemKey?: string;
  expandedMenuId?: string;
  contextualMenuItems?: IContextualMenuItem[];
  contextualMenuTarget?: HTMLElement;
  renderedFarItems?: IContextualMenuItem[];
}

export class CommandBar extends React.Component<ICommandBarProps, ICommandBarState> {
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
  };

  private _instanceId: string;
  private _overflowWidth: number;
  private _commandItemWidths: { [key: string]: number };
  private _events: EventGroup;

  constructor(props: ICommandBarProps) {
    super(props);

    this.state = this._getStateFromProps(props);

    this._instanceId = 'CommandBar-' + (_instance++) + '-';
    this._events = new EventGroup(this);

    this._onItemClick = this._onItemClick.bind(this);
    this._onOverflowClick = this._onOverflowClick.bind(this);
    this._onContextMenuDismiss = this._onContextMenuDismiss.bind(this);
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
    const { isSearchBoxVisible, searchPlaceholderText } = this.props;
    const { renderedItems, contextualMenuItems, expandedMenuItemKey, expandedMenuId, renderedOverflowItems, contextualMenuTarget, renderedFarItems } = this.state;
    let searchBox;

    if (isSearchBoxVisible) {
      searchBox = (
        <div className='ms-CommandBarSearch' ref='searchSurface'>
          <input className='ms-CommandBarSearch-input' type='text' placeholder={ searchPlaceholderText } />
          <div className='ms-CommandBarSearch-iconWrapper ms-CommandBarSearch-iconSearchWrapper'>
            <i className='ms-Icon ms-Icon--search'></i>
          </div>
          <div className='ms-CommandBarSearch-iconWrapper ms-CommandBarSearch-iconClearWrapper ms-font-s'>
            <i className='ms-Icon ms-Icon--x'></i>
          </div>
        </div>
      );
    }

    return (
      <div className='ms-CommandBar' ref='commandBarRegion'>
        { searchBox }
        <FocusZone direction={ FocusZoneDirection.horizontal }>
          <div className='ms-CommandBar-primaryCommands' ref='commandSurface'>
            { renderedItems.map((item, index) => (
            <div className='ms-CommandBarItem' key={ item.key } ref={ item.key }>
              <button
                id={ this._instanceId + item.key }
                className={ css('ms-CommandBarItem-link', { 'is-expanded': (expandedMenuItemKey === item.key) }) }
                onClick={ this._onItemClick.bind(this, item) }
                data-command-key={ index }
                aria-haspopup={ !!(item.items && item.items.length) }
              >
                <span className={ `ms-CommandBarItem-icon ms-Icon ms-Icon--${ item.icon }` }></span>
                <span className='ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular'>{ item.name }</span>
                { (item.items && item.items.length) ? (
                <i className='ms-CommandBarItem-chevronDown ms-Icon ms-Icon--chevronDown' />
                ) : ( null ) }
              </button>
            </div>
            )).concat((renderedOverflowItems && renderedOverflowItems.length) ? [
            <div className='ms-CommandBarItem' key={ OVERFLOW_KEY } ref={ OVERFLOW_KEY }>
              <button id={ this._instanceId + OVERFLOW_KEY } className={ css('ms-CommandBarItem-link', { 'is-expanded': (expandedMenuItemKey === OVERFLOW_KEY) }) } onClick={ this._onOverflowClick }>
                <i className='ms-CommandBarItem-overflow ms-Icon ms-Icon--ellipsis' />
              </button>
            </div>
            ] : []) }
          </div>
          <div className='ms-CommandBar-sideCommands' ref='farCommandSurface'>
            { renderedFarItems.map((item, index) => (
            <div className='ms-CommandBarItem' key={ item.key || String(index) } ref={ item.key || String(index) }>
              <button
                id={ this._instanceId + item.key }
                className={ css('ms-CommandBarItem-link', { 'is-expanded': (expandedMenuItemKey === item.key) }, {'is-static': (!item.onClick && !item.items)}) }
                onClick={ this._onItemClick.bind(this, item) }
                data-command-key={ index }
                aria-haspopup={ !!(item.items && item.items.length) }
              >
                <span className={ `ms-CommandBarItem-icon ms-Icon ms-Icon--${ item.icon }` }></span>
                <span className='ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular'>{ item.name }</span>
                { (item.items && item.items.length) ? (
                <i className='ms-CommandBarItem-chevronDown ms-Icon ms-Icon--chevronDown' />
                )  : ( null ) }
              </button>
            </div>
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
          gapSpace={ 8 }
          directionalHint={ DirectionalHint.bottomAutoEdge }
        />
        ) : (null)}
      </div>
    );
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

        this._commandItemWidths[item.key] = el.getBoundingClientRect().width;
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
      item.onClick();
    }
  }

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

export default CommandBar;
