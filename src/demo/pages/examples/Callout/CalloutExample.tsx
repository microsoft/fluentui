import * as React from 'react';
import Callout from '../../../../components/Callout';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

export default class CalloutExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='CalloutExample'>
        <h1 className='ms-font-xxl'>Callout</h1>
        <div><Link text='Callouts' url='http://dev.office.com/fabric/components/callout' /> are used to notify the user of something special.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Simple callout'>
          <Callout
            title='All of your favorite people'
            subText='Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.'
          />
        </ExampleCard>

      </div>
    );
  }

}
