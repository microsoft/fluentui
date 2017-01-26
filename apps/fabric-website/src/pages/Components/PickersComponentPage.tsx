import * as React from 'react';
import { PickersPage } from 'office-ui-fabric-react/lib/demo/pages/PickersPage/PickersPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class PickersComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='Pickers' backgroundColor='#038387'
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
          <PickersPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
