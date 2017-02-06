import * as React from 'react';
import { MessageBarPage } from 'fabric-samples/lib/pages/MessageBarPage/MessageBarPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class MessageBarComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='MessageBar' backgroundColor='#038387'
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
          <MessageBarPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}