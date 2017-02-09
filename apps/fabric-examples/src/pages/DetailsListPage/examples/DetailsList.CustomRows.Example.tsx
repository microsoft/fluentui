/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { DetailsList, DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import { autobind, css } from 'office-ui-fabric-react/lib/Utilities';
import { createListItems } from '@uifabric/example-app-base';
import './DetailsListExample.scss';

let _items: any[];

export class DetailsListCustomRowsExample extends React.Component<any, any> {
  constructor() {
    super();

    _items = _items || createListItems(500);
  }

  public render() {
    return (
      <DetailsList
        items={ _items }
        setKey='set'
        onRenderRow={ this._onRenderRow }
      />
    );
  }

  @autobind
  private _onRenderRow(props) {
    return <DetailsRow { ...props } onRenderCheck={ this._onRenderCheck } />;
  }

  @autobind
  private _onRenderCheck(props) {
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
