import * as React from 'react';
import ContextualMenu from '../../../../components/ContextualMenu';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

export default class ContextualMenuExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ContextualMenuExample'>
        <h1 className='ms-font-xxl'>ContextualMenu</h1>
        <div><Link target='_blank' text='ContextualMenus' url='http://dev.office.com/fabric/components/contextualMenu' /> provide a menu for use in context menus and dropdowns.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='ContextualMenu'>
          <ContextualMenu items={
            [
              { name: 'Item 1', key: '1' },
              { name: 'Item 2', key: '2' }
            ]
          } />
        </ExampleCard>

      </div>
    );
  }

}
