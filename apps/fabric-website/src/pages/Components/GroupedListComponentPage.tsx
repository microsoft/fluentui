import * as React from 'react';
import { GroupedListPage } from 'fabric-examples/lib/pages/GroupedListPage/GroupedListPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class GroupedListComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='GroupedList' backgroundColor='#038387'
            links={
              [
                {
                  'text': 'Overview',
                  'location': 'Overview'
                },
                {
                  'text': 'Best Practices',
                  'location': 'Best Practices'
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
          <GroupedListPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
