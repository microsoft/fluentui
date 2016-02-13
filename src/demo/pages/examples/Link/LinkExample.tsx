import * as React from 'react';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

export default class LinkExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='LinkExample'>
        <h1 className='ms-font-xxl'>Link</h1>
        <div><Link text='Links' url='http://dev.office.com/fabric/components/link' /> are used as a styled replacement for A tags.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Link'>
          <Link text='I am a link' url='http://dev.office.com/fabric/components/link' />
        </ExampleCard>

      </div>
    );
  }

}
