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
import { AppState } from '../../components/app/AppState';
import { getPageRouteFromState } from '../../utilities/pageroute';

const BreadcrumbBasicExampleCode = require('./examples/Breadcrumb.Basic.Example.tsx');

export class BreadcrumbPage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState('Basic components', 'Breadcrumb');
  }

  public render() {
    return (
      <ComponentPage
        title='Breadcrumb'
        componentName='BreadcrumbExample'
        exampleCards={
          [
            <ExampleCard title='Simple breadcrumb' code={ BreadcrumbBasicExampleCode }>
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
            <Link target='_blank' href='http://dev.office.com/fabric/components/breadcrumb'>Breadcrumbs</Link>
            <span> are used to represent a given path.</span>
          </div>
        }
        bestPractices={
          <div>
            <p>30 words -- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed sem in nunc imperdiet vestibulum. Maecenas vulputate dapibus nisl, in varius nunc fermentum vitae. Aenean cursus leo eget pharetra aliquam.</p>
            <p>30 words -- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed sem in nunc imperdiet vestibulum. Maecenas vulputate dapibus nisl, in varius nunc fermentum vitae. Aenean cursus leo eget pharetra aliquam.</p>
          </div>
        }
        do={
          <div>
            <ul>
              <li>15 to 30 words -- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed sem in nunc imperdiet vestibulum. Maecenas vulputate dapibus nisl, in varius nunc fermentum vitae. Aenean cursus leo eget pharetra aliquam.</li>
              <li>15 to 30 words -- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed sem in nunc imperdiet vestibulum. Maecenas vulputate dapibus nisl, in varius nunc fermentum vitae. Aenean cursus leo eget pharetra aliquam.</li>
            </ul>
          </div>
        }
        dont={
          <div>
            <ul>
              <li>15 to 30 words -- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed sem in nunc imperdiet vestibulum. Maecenas vulputate dapibus nisl, in varius nunc fermentum vitae. Aenean cursus leo eget pharetra aliquam.</li>
              <li>15 to 30 words -- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed sem in nunc imperdiet vestibulum. Maecenas vulputate dapibus nisl, in varius nunc fermentum vitae. Aenean cursus leo eget pharetra aliquam.</li>
            </ul>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }
}
