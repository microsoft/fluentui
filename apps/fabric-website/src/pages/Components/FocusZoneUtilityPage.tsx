import * as React from 'react';
import { FocusZonePage } from 'office-ui-fabric-react/lib/demo/pages/FocusZonePage/FocusZonePage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class FocusZoneUtilityPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='FocusZone' backgroundColor='#038387'
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
          <FocusZonePage isHeaderVisible={ false }/>
        </ComponentPage>
      </div>
    );
  }
}
