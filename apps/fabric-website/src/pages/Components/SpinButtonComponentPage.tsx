import * as React from 'react';
import { SpinButtonPage } from 'office-ui-fabric-react/lib/components/SpinButton/SpinButtonPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class SpinButtonComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='SpinButton' backgroundColor='#038387'
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
          <SpinButtonPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
