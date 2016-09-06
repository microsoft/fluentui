import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';
import { BreadcrumbBasicExample } from './examples/Breadcrumb.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';

const BreadcrumbBasicExampleCode = require('./examples/Breadcrumb.Basic.Example.tsx');

export class BreadcrumbPage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Breadcrumb');
  }

  public render() {
    return (
      <ComponentPage
        title='Breadcrumb'
        componentName='BreadcrumbExample'
        exampleCards={
          [
            <ExampleCard
              title='Simple breadcrumb'
              code={ BreadcrumbBasicExampleCode }>
              <BreadcrumbBasicExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Breadcrumb' />
          ]
        }
        overview={
          <div>
            <span>Breadcrumbs should be used as a navigational aid in your app or site. They indicate the current page’s location within a hierarchy and help the user understand where they are in relation to the rest of that hierarchy. They also afford one-click access to higher levels of that hierarchy. Breadcrumbs are typically placed, in horizontal form, under the masthead or navigation of an experience, above the primary content area.</span> View <Link target='_blank' href='http://dev.office.com/fabric/components/breadcrumb'>Breadcrumbs</Link> on our website.
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Place Breadcrumbs at the top of a page, above a list of items, or above the main content of a page.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don't use Breadcrumbs as a primary way to navigate an app or site.</li>
            </ul>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }
}
