import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import NavBarProps from './NavBarProps';

import NavBarBasicExample from './examples/NavBar.Basic.Example';
let NavBarBasicExampleCode = require('./examples/NavBar.Basic.Example.tsx');

export default class NavBarPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='NavBarExample'>
        <h1 className='ms-font-xxl'>NavBar</h1>
        <div><Link target='_blank' text='NavBars' url='http://dev.office.com/fabric/components/NavBar' /> are ...TODO</div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='NavBar' code={ NavBarBasicExampleCode }>
          <NavBarBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ NavBarProps } />
      </div>
    );
  }

}
