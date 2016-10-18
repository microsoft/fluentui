import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { ListBasicExample } from './examples/List.Basic.Example';
import { ListMailExample } from './examples/List.Mail.Example';
import { ListGridExample } from './examples/List.Grid.Example';
import { createListItems } from '../../utilities/data';

const ListBasicExampleCode = require('./examples/List.Basic.Example.tsx');
const ListMailExampleCode = require('./examples/List.Mail.Example.tsx');
const ListGridExampleCode = require('./examples/List.Grid.Example.tsx');

import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

let _cachedItems;

export class ListPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'List');

    if (!_cachedItems) {
      _cachedItems = createListItems(5000);
    }
  }

  public render() {
    return (
      <ComponentPage
        title='List'
        componentName='ListExample'
        exampleCards={
          <div>
            <ExampleCard title='List of 5000 grid items' isOptIn={ true } code={ ListGridExampleCode }>
              <ListGridExample items={ _cachedItems } />
            </ExampleCard>
            <ExampleCard title='List of 5000 variable height items' isOptIn={ true } code={ ListBasicExampleCode }>
              <ListBasicExample items={ _cachedItems } />
            </ExampleCard>
            <ExampleCard title='Fixed list of 5000 email tiles' isOptIn={ true } code={ ListMailExampleCode }>
              <ListMailExample items={ _cachedItems } />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet componentName='List' />
        }
        overview={
          <div>
            <p>
              <span>List provides a base component for rendering large sets of items. It is agnostic of layout, the tile component used, and selection management. These concerns can be layered separately.</span>
            </p>
            <p>
              <b>Performance is important, and DOM content is expensive. Therefore limit what you render.</b> Unlike a simple for loop that renders all items in a set, a List uses ui virtualization. It only renders a subset of items, and as you scroll around, the subset of rendered content is shifted to what you're looking at. This gives a much better experience for large sets, especially when the per-item components are complex/render intensive/network intensive.
            </p>
            <p>
              Lists break down the set of items passed in into pages. Only pages within a "materialized window" are actually rendered. As that window changes due to scroll events, pages that fall outside that window are removed, and their layout space is remembered and pushed into spacer elements. This gives the user the experience of browsing massive amounts of content but only using a small number of actual elements. This gives the browser much less layout to resolve, and gives React DOM diffing much less content to worry about.
            </p>
          </div>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
