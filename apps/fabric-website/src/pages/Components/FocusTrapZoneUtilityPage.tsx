import * as React from 'react';
import { FocusTrapZonePage } from 'fabric-examples/lib/pages/FocusTrapZonePage/FocusTrapZonePage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class FocusTrapZoneUtilityPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='FocusTrapZone' backgroundColor='#038387'
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
          <FocusTrapZonePage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
