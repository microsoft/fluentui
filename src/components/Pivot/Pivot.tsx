import * as React from 'react';
import './Pivot.scss';
import { css } from '../../utilities/css';
import { IPivotProps } from './Pivot.Props';

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

    if (props.items
      && props.initialSelectedIndex
      && props.initialSelectedIndex < props.items.length) {
        selectedIndex = props.initialSelectedIndex;
      }

    this.state = {
        selectedIndex: selectedIndex
    };

    this._onItemClick = this._onItemClick.bind(this);
  }

  public render() {
    let { items, largeformat } = this.props;
    let { selectedIndex } = this.state;

    return (
      <ul className={ css('ms-Pivot', {
        'ms-Pivot--large': largeformat
        })}>
          { items.map((item, index) => (
            <li
              key={ item.key }
              onClick={ this._onItemClick.bind(this, index) }
              className={ css('ms-Pivot-link', {
                'is-selected': selectedIndex === index
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

  private _onItemClick(index) {
    // Set the selected index to the matching option.
    this.setState({ selectedIndex: index });
  }
}
