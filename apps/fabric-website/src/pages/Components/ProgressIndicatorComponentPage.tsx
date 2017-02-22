import * as React from 'react';
import { ProgressIndicatorPage } from 'fabric-examples/lib/pages/ProgressIndicatorPage/ProgressIndicatorPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class ProgressIndicatorComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='ProgressIndicator' backgroundColor='#038387'
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
          <ProgressIndicatorPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
