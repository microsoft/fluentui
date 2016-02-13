import * as React from 'react';
import NavBar from '../../../../components/NavBar';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

export default class NavBarExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='NavBarExample'>
        <h1 className='ms-font-xxl'>NavBar</h1>
        <div><Link text='NavBars' url='http://dev.office.com/fabric/components/NavBar' /> are ...TODO</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='NavBar'>
          <NavBar />
        </ExampleCard>
      </div>
    );
  }

}
