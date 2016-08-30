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

const BreadcrumbBasicExampleCode = require('./examples/Breadcrumb.Basic.Example.tsx');

export class BreadcrumbPage extends React.Component<any, any> {
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
        }>
      </ComponentPage>
    );
  }
}
