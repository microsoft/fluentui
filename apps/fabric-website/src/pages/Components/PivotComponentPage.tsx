import * as React from 'react';
import { PivotPage } from 'office-ui-fabric-react/lib/demo/pages/PivotPage/PivotPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class PivotComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='Pivot' backgroundColor='#038387'
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
          <PivotPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
