import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import BreadcrumbProps from './BreadcrumbProps';
import { BreadcrumbBasicExample } from './examples/Breadcrumb.Basic.Example';
let BreadcrumbBasicExampleCode = require('./examples/Breadcrumb.Basic.Example.tsx');

export default class BreadcrumbExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='BreadcrumbExample'>
        <h1 className='ms-font-xxl'>Breadcrumb</h1>
        <div><Link target='_blank' text='Breadcrumbs' url='http://dev.office.com/fabric/components/breadcrumb' /> are used to represent a given path.</div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Simple breadcrumb' code={ BreadcrumbBasicExampleCode }>
          <BreadcrumbBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ BreadcrumbProps } />
      </div>
    );
  }

}
