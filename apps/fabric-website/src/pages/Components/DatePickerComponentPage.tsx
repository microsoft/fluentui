import * as React from 'react';
import { DatePickerPage } from 'office-ui-fabric-react/lib/demo/pages/DatePickerPage/DatePickerPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class DatePickerComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='DatePicker' backgroundColor='#038387'
          links={
            [
              {
                'text': 'Overview',
                'location': 'Overview'
              },
              {
                'text': 'Variants',
                'location': 'Variants'
              },
              {
                'text': 'Implementation',
                'location': 'Implementation'
              }
            ]
          }/>
          <DatePickerPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
