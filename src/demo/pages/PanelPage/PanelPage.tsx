import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import PanelProps from './PanelProps';

import PanelBasicExample from './examples/Panel.Basic.Example';
let PanelBasicExampleCode = require('./examples/Panel.Basic.Example.tsx');

export default class PanelPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>Panel</h1>
        <div><Link target='_blank' text='Panels' url='http://dev.office.com/fabric/components/panel' /> are used to render an org chart.</div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Panel' code={ PanelBasicExampleCode }>
          <PanelBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ PanelProps } />
      </div>
    );
  }

}
