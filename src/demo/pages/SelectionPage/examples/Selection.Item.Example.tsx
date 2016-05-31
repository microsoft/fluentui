import * as React from 'react';
import { Check } from '../../../../components/DetailsList/Check';
import { css } from '../../../../utilities/css';
import {
  ISelection,
  SelectionMode
  } from '../../../../utilities/selection/index';

export interface ISelectionItemExampleProps {
  item?: any;
  itemIndex?: number;
  selection?: ISelection;
  selectionMode?: SelectionMode;
}

export interface ISelectionItemExampleState {
  isSelected?: boolean;
}

export class SelectionItemExample extends React.Component<ISelectionItemExampleProps, ISelectionItemExampleState> {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: this._getSelectionState(props)
    };
  }

  public forceUpdate() {
    this._onSelectionChanged();
    super.forceUpdate();
  }

  public render() {
    let {
      isSelected
    } = this.state;
    let {
      item,
      itemIndex,
      selectionMode,
    } = this.props;

    return (
      <div
        className={ css('ms-SelectionItemExample', {
          'is-selected': isSelected
        }) }
        data-selection-index={ itemIndex }
        >
          { (selectionMode !== SelectionMode.none) && (
            <button
              className='ms-SelectionItemExample-check'
              data-selection-toggle={ true }
              >
              <Check isChecked={ isSelected } />
            </button>
          ) }
          <span className='ms-SelectionItemExample-name'>
            { item.name }
          </span>
      </div>
    );
  }

  public componentWillReceiveProps(newProps: ISelectionItemExampleProps) {
    this.setState({
      isSelected: this._getSelectionState(newProps)
    });
  }

  private _getSelectionState(props: ISelectionItemExampleProps): boolean {
    let { itemIndex, selection } = props;

    return selection.isIndexSelected(itemIndex);
  }

  private _onSelectionChanged() {
    let selectionState = this._getSelectionState(this.props);

    if (selectionState !== this.state.isSelected) {
      this.setState({
        isSelected: selectionState
      });
    }
  }
}
