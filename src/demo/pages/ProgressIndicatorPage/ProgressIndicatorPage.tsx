import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';
import { ProgressIndicatorBasicExample } from './examples/ProgressIndicator.Basic.Example';
const ProgressIndicatorBasicExampleCode = require('./examples/ProgressIndicator.Basic.Example.tsx');

export class ProgressIndicatorPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'ProgressIndicator');
  }

  public render() {
    return (
     <ComponentPage
        title='ProgressIndicator'
        componentName='ProgressIndicatorExample'
        exampleCards={
          [
            <ExampleCard title='ProgressIndicator' code={ ProgressIndicatorBasicExampleCode }>
              <ProgressIndicatorBasicExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='ProgressIndicator' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/ProgressIndicator'>ProgressIndicators</Link>
            <span> allow the user to see the status of activities. Unlike the Spinner, ProgressIndicator should accurately display the progress of the activity while the Spinner is used when the time is indeterminate.</span>
          </div>
        }
        route={ this._url }
         showHeader={ this.props.showHeader }>
      </ComponentPage>
    );
  }
}
