import * as React from 'react';
import { DetailsListPage } from 'fabric-samples/lib/pages/DetailsListPage/DetailsListPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class DetailsListComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='DetailsList' backgroundColor='#038387'
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
          <DetailsListPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
