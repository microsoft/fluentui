import * as React from 'react';
import List from '../../../../components/List/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';

export default class ListExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ListExample'>
        <h1 className='ms-font-xxl'>List</h1>
        <div><Link target='_blank' text='Lists' url='http://dev.office.com/fabric/components/List' /> are ...TODO</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='List'>
          <List />
        </ExampleCard>

      </div>
    );
  }

}
