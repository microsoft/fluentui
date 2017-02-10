import * as React from 'react';
import { MarqueeSelectionPage } from 'fabric-examples/lib/pages/MarqueeSelectionPage/MarqueeSelectionPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class MarqueeSelectionUtilityPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='MarqueeSelection' backgroundColor='#038387'
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
          <MarqueeSelectionPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
