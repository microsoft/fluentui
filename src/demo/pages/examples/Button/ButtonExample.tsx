import * as React from 'react';
import { default as Button, ButtonType } from '../../../../components/Button/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';
import ButtonProperties from './ButtonProperties';

import BasicExample from './examples/BasicButtons.Example';
let BasicExampleCode = require('./examples/BasicButtons.Example.tsx');

export default class ButtonExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ButtonExample'>
        <h1 className='ms-font-xxl'>Button</h1>
        <div><Link  target='_blank' text='Buttons' url='http://dev.office.com/fabric/components/button' /> are used typically in dialogs and for starting an operation.</div>
        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard
          title='Various button types'
          code={ BasicExampleCode }
        >
          <BasicExample />
        </ExampleCard>

        <PropertiesTable properties={ ButtonProperties } />
      </div>
    );
  }

}
