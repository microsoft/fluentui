import * as React from 'react';
import PersonaCard from '../../../../components/PersonaCard';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

export default class PersonaCardExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='PersonaCardExample'>
        <h1 className='ms-font-xxl'>PersonaCard</h1>
        <div><Link target='_blank' text='PersonaCards' url='http://dev.office.com/fabric/components/PersonaCard' /> render a details for an individual.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='PersonaCard'>
          <PersonaCard />
        </ExampleCard>
      </div>
    );
  }

}
