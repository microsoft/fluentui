import * as React from 'react';
import './CommandBar.scss';
import { FocusZone, FocusZoneDirection } from '../../utilities/focus/index';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import ContextualMenuHost from '../ContextualMenu/ContextualMenuHost';

export interface ICommandBarItem {
  key: string;
  name: string;
  icon?: string;
  onClick?: (ev: React.MouseEvent) => void;

  // Child items
  items?: ICommandBarItem[];
}

export interface ICommandBarProps {
  isSearchBoxVisible?: boolean;
  searchPlaceholderText?: string;

  items: ICommandBarItem[];
  overflowItems?: ICommandBarItem[];
  farItems?: ICommandBarItem[];
}

export interface ICommandBarState {
  renderedItems?: ICommandBarItem[];
  renderedOverflowItems?: ICommandBarItem[];
  contextualMenuItems?: ICommandBarItem[];
  contextualMenuTarget?: HTMLElement;
}

export default class CommandBar extends React.Component<ICommandBarProps, ICommandBarState> {
  public static defaultProps = {
    items: [],
    overflowItems: [],
    farItems: []
  };

  private _overflowWidth: number;
  private _commandItemWidths: { [key: string]: number };
  private _events: EventGroup;

  constructor(props: ICommandBarProps) {
    super(props);

    this.state = {
      renderedItems: props.items || [],
      renderedOverflowItems: null,
      contextualMenuItems: null
    };

    this._events = new EventGroup(this);
    this._commandItemWidths = {};

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

  public render() {
    const { isSearchBoxVisible, searchPlaceholderText, items, farItems } = this.props;
    const { renderedItems, contextualMenuItems, renderedOverflowItems, contextualMenuTarget } = this.state;
    let searchBox;

    if (isSearchBoxVisible) {
      searchBox = (
        <div className='ms-CommandBarSearch'>
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
      <div className='ms-CommandBar'>
        { searchBox }
        <FocusZone direction={ FocusZoneDirection.horizontal }>
          <div className='ms-CommandBar-primaryCommands' ref='commandSurface'>
            { renderedItems.map((item, index) => (
            <div className={'ms-CommandBarItem' } key={ item.key } ref={ item.key }>
              <button className='ms-CommandBarItem-link' onClick={ this._onItemClick } data-command-key={ index } >
                <span className={ `ms-CommandBarItem-icon ms-Icon ms-Icon--${ item.icon }` }></span>
                <span className='ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular'>{ item.name }</span>
                { (item.items && item.items.length) ? (
                <i className='ms-CommandBarItem-chevronDown ms-Icon ms-Icon--chevronDown' />
                ) : ( null ) }
              </button>
            </div>
            )).concat((!renderedOverflowItems || renderedOverflowItems.length) ? [
            <div className='ms-CommandBarItem' key={ 'overflow' } ref={ 'overflow' }>
              <button className='ms-CommandBarItem-link' onClick={ this._onOverflowClick }>
                <i className='ms-CommandBarItem-overflow ms-Icon ms-Icon--ellipsis' />
              </button>
            </div>
            ] : []) }
          </div>
        </FocusZone>
        <ContextualMenuHost className='ms-CommandBar-menuHost' items={ contextualMenuItems } targetElement={ contextualMenuTarget } onDismiss={ this._onContextMenuDismiss }/>
      </div>
    );
  }

  private _updateItemMeasurements() {
    this._overflowWidth = (this.refs['overflow'] as HTMLElement).getBoundingClientRect().width;

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
    let commandSurface = this.refs['commandSurface'] as HTMLElement;
    let renderedItems = [].concat(items);
    let renderedOverflowItems = overflowItems;
    let availableWidth = commandSurface.getBoundingClientRect().width;
    let consumedWidth = 0;

    for (let i = 0; i < renderedItems.length; i++) {
      let item = renderedItems[i];
      let itemWidth = this._commandItemWidths[item.key];

      if ((consumedWidth + itemWidth) >= availableWidth) {
        if ((availableWidth - consumedWidth) < this._overflowWidth) {
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
      contextualMenuItems: null,
      contextualMenuTarget: null
    });
  }

  private _onItemClick(ev) {
    let item = this.state.renderedItems[Number(ev.currentTarget.getAttribute('data-command-key'))];

    if (item.items) {
      this.setState({
        contextualMenuItems: item.items,
        contextualMenuTarget: ev.currentTarget
      });
    }
  }

  private _onOverflowClick(ev) {
    this.setState({
      contextualMenuItems: this.state.renderedOverflowItems,
      contextualMenuTarget: ev.currentTarget
    });

  }

  private _onContextMenuDismiss() {
    this.setState({
      contextualMenuItems: null,
      contextualMenuTarget: null
    });
  }

}