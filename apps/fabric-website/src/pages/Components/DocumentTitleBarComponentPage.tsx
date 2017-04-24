import * as React from 'react';
import { DocumentTitleBarPage } from 'office-ui-fabric-react/lib/components/DocumentTitleBar/DocumentTitleBarPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class DocumentTitleBarComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='DocumentTitleBar' backgroundColor='#038387'
            links={
              [
                {
                  'text': 'Overview',
                  'location': 'Overview'
                },
                {
                  'text': 'Implementation',
                  'location': 'Implementation'
                }
              ]
            } />
          <DocumentTitleBarPage />
        </ComponentPage>
      </div>
    );
  }
}
