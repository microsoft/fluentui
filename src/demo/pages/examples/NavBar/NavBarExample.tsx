import * as React from 'react';
import NavBar from '../../../../components/NavBar/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';

export default class NavBarExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='NavBarExample'>
        <h1 className='ms-font-xxl'>NavBar</h1>
        <div><Link target='_blank' text='NavBars' url='http://dev.office.com/fabric/components/NavBar' /> are ...TODO</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='NavBar'>
          <NavBar />
        </ExampleCard>
      </div>
    );
  }

}
