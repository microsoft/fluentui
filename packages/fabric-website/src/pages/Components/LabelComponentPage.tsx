import * as React from 'react';
import { LabelPage } from 'office-ui-fabric-react/lib/demo/pages/LabelPage/LabelPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class LabelComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='Label' backgroundColor='#038387'
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
          <LabelPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
