import * as React from 'react';
import CommandBar from '../../../../components/CommandBar';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

export default class CommandBarExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='CommandBarExample'>
        <h1 className='ms-font-xxl'>CommandBar</h1>
        <div><Link text='CommandBars' url='http://dev.office.com/fabric/components/commandBar' /> provide a menu system for commands to exist.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='CommandBar'>
          <CommandBar />
        </ExampleCard>

      </div>
    );
  }

}
