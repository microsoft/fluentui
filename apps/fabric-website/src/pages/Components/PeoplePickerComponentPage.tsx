import * as React from 'react';
import { PeoplePickerPage } from 'fabric-examples/lib/pages/PeoplePickerPage/PeoplePickerPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class PeoplePickerComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='PeoplePicker' backgroundColor='#038387'
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
            } />
          <PeoplePickerPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
