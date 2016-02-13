import * as React from 'react';
import ListItem from '../../../../components/ListItem';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

export default class ListItemExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ListItemExample'>
        <h1 className='ms-font-xxl'>ListItem</h1>
        <div><Link text='ListItems' url='http://dev.office.com/fabric/components/ListItem' /> are ...TODO</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='ListItem'>
          <ListItem />
        </ExampleCard>
      </div>
    );
  }

}
