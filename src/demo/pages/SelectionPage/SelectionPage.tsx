import * as React from 'react';
import {
  ExampleCard,
  ComponentPage
} from '../../components/index';

import { SelectionBasicExample } from './examples/Selection.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const SelectionBasicExampleCode = require('./examples/Selection.Basic.Example.tsx');

export class SelectionPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Selection');
  }

  public render() {
    return (
      <ComponentPage
        title='Selection'
        componentName='SelectionExample'
        exampleCards={
          <ExampleCard title='Basic Selection Example' code={ SelectionBasicExampleCode }>
            <SelectionBasicExample />
          </ExampleCard>
        }
        overview={
          <div>
            <p>
              Selection is a store that maintains the selection state of items in an efficient way.
              It exposes methods for accessing the selection state given an item index.
              If the items change, it can resolve the selection if items move in the array.
            </p>

            <p>SelectionZone is a React component that acts as a mediator between the Selection object and elements. By providing it the Selection instance and rendering content within it, you can have it manage clicking/focus/keyboarding from the DOM and translate into selection updates. You just need to provide the right data-selection-* attributes on elements within each row/tile to give SelectionZone a hint what the intent is.</p>

            <p>SelectionZone also takes in an onItemInvoked callback for when items are invoked. Invoking occurs when a user double clicks a row, presses enter while focused on it, or clicks within an element marked by the data-selection-invoke attribute.
            </p>

            <p>Available attributes:</p>
            <ul>
              <li>
                <b>data-selection-index</b>: the index of the item being represented.This would go on the root of the tile/row.
              </li>
              <li>
                <b>data-selection-invoke</b>: this boolean flag would be set on the element which should immediately invoke the item on click.There is also a nuanced behavior where we will clear selection and select the item if mousedown occurs on an unselected item.
              </li>
              <li>
                <b>data-selection-toggle</b>: this boolean flag would be set on the element which should handle toggles.This could be a checkbox or a div.
              </li>
              <li>
                <b>data-selection-toggle-all</b>: this boolean flag indicates that clicking it should toggle all selection.
              </li>
            </ul>
          </div>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}