import * as React from 'react';
import './CommandBar.scss';

export interface ICommandBarItem {
  name: string;
  icon?: string;
  measuredWidth?: number;
}

export interface ICommandBarProps {
  isSearchBoxVisible?: boolean;
  searchPlaceholderText?: string;

  items: ICommandBarItem[];
  farItems?: ICommandBarItem[];
}

export interface ICommandBarState {
  renderedItems: ICommandBarItem[];
}

export default class CommandBar extends React.Component<ICommandBarProps, ICommandBarState> {
  public static defaultProps = {
    items: [],
    farItems: []
  };

  private _commandItemWidths: { [key: string]: number };

  constructor() {
    super();

    this._commandItemWidths = {};
    this.state = {
      renderedItems: []
    };
  }

  public render() {
    const { isSearchBoxVisible, searchPlaceholderText, items, farItems } = this.props;
    const { renderedItems } = this.state;
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
        <div className='ms-CommandBar-mainArea' ref='commandSurface'>

          { items.map((item, index) => (
          <div className='ms-CommandBarItem' key={ index } ref={ 'item-' + index }>
            <div className='ms-CommandBarItem-linkWrapper'>
              <a className='ms-CommandBarItem-link'>
                <span className={ `ms-CommandBarItem-icon ms-Icon ms-Icon--${ item.icon }` }></span>
                <span className='ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular'>{ item.name }</span>
                <i className='ms-CommandBarItem-chevronDown ms-Icon ms-Icon--chevronDown' />
              </a>
            </div>
          </div>
          )) }

        </div>
      </div>
    );
  }

  public componentDidMount() {
    let commandSurface = this.refs['commandSurface'] as HTMLElement;

    for (let i = 0; i < this.props.items.length; i++) {
      let item = this.props.items[i];
      let el = this.refs['item-' + i] as HTMLElement;

      console.log(item.name + ' - ' + el.getBoundingClientRect().width + 'px, ' + el.clientWidth + 'px');
    }
    console.log('surface - ' + commandSurface.getBoundingClientRect().width + 'px');
  }
}