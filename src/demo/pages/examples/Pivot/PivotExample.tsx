import * as React from 'react';
import Pivot from '../../../../components/Pivot/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';

export default class PivotExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='PivotExample'>
        <h1 className='ms-font-xxl'>Pivot</h1>
        <div><Link target='_blank' text='Pivots' url='http://dev.office.com/fabric/components/Pivot' /> are ...TODO</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Pivot'>

          <Pivot
            items={
              [
                { key: 'A', text: 'Item 1' },
                { key: 'B', text: 'Item 2' },
                { key: 'C', text: 'Item 3', selected: true },
                { key: 'D', text: 'Item 4' },
                { key: 'E', text: 'Item 5' }
              ]
            }
          />

        </ExampleCard>

        <ExampleCard title='Pivot Large'>

          <Pivot
            largeformat
            items={
              [
                { key: 'A', text: 'Item 1' },
                { key: 'B', text: 'Item 2' },
                { key: 'C', text: 'Item 3', selected: true },
                { key: 'D', text: 'Item 4' },
                { key: 'E', text: 'Item 5' }
              ]
            }
          />

        </ExampleCard>
      </div>
    );
  }

}
