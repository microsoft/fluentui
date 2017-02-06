import * as React from 'react';
import { DocumentCardPage } from 'fabric-samples/lib/pages/DocumentCardPage/DocumentCardPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class DocumentCardComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='DocumentCard' backgroundColor='#038387'
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
          <DocumentCardPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
