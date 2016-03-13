import * as React from 'react';
import './Pivot.scss';
import { css } from '../../utilities/css';

export interface IPivotItem {
  key: string;
  text: string;
  selected?: boolean;
}

export interface IPivotProps {
  items: IPivotItem[];
  onChange?: (item: IPivotItem) => void;
  largeformat?: boolean;
}

export interface IPivotState {
  selectedIndex: number;
}

export default class Pivot extends React.Component<IPivotProps, any> {
  public static defaultProps = {
    items: []
  };

  constructor(props?: IPivotProps) {
    super(props);

    let selectedIndex = 0;

    for (let i = 0; i < props.items.length; i++) {
      if (props.items[i].selected) {
        selectedIndex = i;
        break;
      }
    }

    this.state = {
        selectedIndex: selectedIndex
    };

    this._onItemClick = this._onItemClick.bind(this);
  }

  public render() {
    let { items, largeformat } = this.props;
    let { selectedIndex } = this.state;
    let selectedOption = items[selectedIndex];

    return (
      <ul className={ css('ms-Pivot', {
        'ms-Pivot--large': largeformat
        })}>
          { items.map(item => (
            <li
              key={ item.key }
              onClick={ this._onItemClick.bind(this, item) }
              className={ css('ms-Pivot-link', {
                'is-selected': !!selectedOption
              })}>
                { item.text }
            </li>
          )) }

          <li className='ms-Pivot-link ms-Pivot-link--overflow'>
            <i className='ms-Pivot-ellipsis ms-Icon ms-Icon--ellipsis'></i>
          </li>
      </ul>
    );
  }

  private _onItemClick(item) {
    let selectedOptionIndex;

    // Iterate through all of the Pivot items, finding the one the matches they selected key.
    for (let i = 0; i < this.props.items.length; i++) {
      if (item.key === this.props.items[i].key) {
        selectedOptionIndex = i;
      }
    }

    // Set the selected index to the matching option.
    this.setState({ selectedIndex: selectedOptionIndex });
  }
}
