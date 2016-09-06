/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  DetailsList,
  DetailsRow,
  IDetailsRowCheckProps,
  css
} from '../../../../index';
import { createListItems } from '../../../utilities/data';
import './DetailsListExample.scss';

let _items: any[];

class CustomDetailsRow extends DetailsRow {
  protected _onRenderCheck(props: IDetailsRowCheckProps) {
    return (
      <div
        className={ css(
          'ms-DetailsRow-check DetailsListExample-customCheck', {
          'is-any-selected': props.anySelected
        }) }
        role='button'
        aria-pressed={ props.isSelected }
        data-selection-toggle={ true }
        aria-label={ props.ariaLabel }
      >
        <input
          type='checkbox'
          checked={ props.isSelected }
          />
      </div>
    );
  }
}

export class DetailsListCustomRowsExample extends React.Component<any, any> {
  constructor() {
    super();

    _items = _items || createListItems(500);
  }

  public render() {
    return (
        <DetailsList
          items={ _items }
          initialFocusedIndex={ 0 }
          setKey='set'
          onRenderRow={ this._onRenderRow }
          />
    );
  }

  private _onRenderRow(props) {
    return <CustomDetailsRow { ...props } />;
  }
}
