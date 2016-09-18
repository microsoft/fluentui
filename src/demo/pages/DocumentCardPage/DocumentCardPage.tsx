import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { DocumentCardBasicExample } from './examples/DocumentCard.Basic.Example';
import { DocumentCardCompleteExample } from './examples/DocumentCard.Complete.Example';
import { DocumentCardCompactExample } from './examples/DocumentCard.Compact.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const DocumentCardBasicExampleCode = require('./examples/DocumentCard.Basic.Example.tsx');
const DocumentCardCompleteExampleCode = require('./examples/DocumentCard.Complete.Example.tsx');
// const DocumentCardCompactExampleCode = require('./examples/DocumentCard.Compact.Example.tsx');

export class DocumentCardPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'DocumentCard');
  }

  public render() {
    return (
      <ComponentPage
        title='DocumentCard'
        componentName='DocumentCardExample'
        exampleCards={
          [
            <ExampleCard title='DocumentCard Basic' code={ DocumentCardBasicExampleCode }>
              <DocumentCardBasicExample />
            </ExampleCard>,
            <ExampleCard title='DocumentCard Complete' code={ DocumentCardCompleteExampleCode }>
              <DocumentCardCompleteExample />
            </ExampleCard>,
            <ExampleCard title='DocumentCard Compact Layout'>
              <DocumentCardCompactExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='DocumentCard' />
          ]
        }
        overview={
          <div>
             A card representation of a document. Can be configured with various card parts, including a preview, title, and location.
          </div>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
