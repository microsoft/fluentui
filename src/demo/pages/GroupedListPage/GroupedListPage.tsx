import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { GroupedListBasicExample } from './examples/GroupedList.Basic.Example';
import { GroupedListCustomExample } from './examples/GroupedList.Custom.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const GroupedListBasicExampleCode = require('./examples/GroupedList.Basic.Example.tsx');
const GroupedListCustomExampleCode = require('./examples/GroupedList.Custom.Example.tsx');

export class GroupedListPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'GroupedList');
  }

  public render() {
    return (
      <ComponentPage
        title='GroupedList'
        componentName='GroupedListExample'
        exampleCards={
          <div>
            <ExampleCard title='GroupedList basic example' isOptIn={ true } code={ GroupedListBasicExampleCode }>
              <GroupedListBasicExample />
            </ExampleCard>
            <ExampleCard title='GroupedList example with custom header and footer' isOptIn={ true } code={ GroupedListCustomExampleCode }>
              <GroupedListCustomExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
            <PropertiesTableSet componentName='GroupedList' />
        }
        overview={
          <p>Allows you to render a set of items as multiple lists with various grouping properties.</p>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
