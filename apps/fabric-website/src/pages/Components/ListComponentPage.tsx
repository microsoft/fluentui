import * as React from 'react';
import { ListPage } from 'fabric-samples/lib/pages/ListPage/ListPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class ListComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='List' backgroundColor='#038387'
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
          <ListPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
