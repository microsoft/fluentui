import * as React from 'react';
import Dialog from '../../../../components/Dialog';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

export default class DialogExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='DialogExample'>
        <h1 className='ms-font-xxl'>Dialog</h1>
        <div><Link target='_blank' text='Dialogs' url='http://dev.office.com/fabric/components/dialog' /> are used to render a modal window.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Dialog'>
          <Dialog />
        </ExampleCard>

      </div>
    );
  }

}
