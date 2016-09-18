import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { SearchBoxSmallExample } from './examples/SearchBox.Small.Example';
import { SearchBoxFullSizeExample } from './examples/SearchBox.FullSize.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const SearchBoxSmallExampleCode = require('./examples/SearchBox.Small.Example.tsx');
const SearchBoxFullSizeExampleCode = require('./examples/SearchBox.FullSize.Example.tsx');

export class SearchBoxPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'SearchBox');
  }

  public render() {
    return (
      <ComponentPage
        title='SearchBox'
        componentName='SearchBoxExample'
        exampleCards={
          [
            <ExampleCard title='SearchBox' code={ SearchBoxSmallExampleCode }>
              <SearchBoxSmallExample />
            </ExampleCard>,
            <ExampleCard title='SearchBox - No Parent Container' code={ SearchBoxFullSizeExampleCode }>
              <SearchBoxFullSizeExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='SearchBox' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/SearchBox'>SearchBoxes</Link>
            <span> provide a box for searching, complete with auto complete callbacks and suggestions.</span>
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/SearchBox.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
