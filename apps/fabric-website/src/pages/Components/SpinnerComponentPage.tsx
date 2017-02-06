import * as React from 'react';
import { SpinnerPage } from 'fabric-samples/lib/pages/SpinnerPage/SpinnerPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class SpinnerComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='Spinner' backgroundColor='#038387'
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
          <SpinnerPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
