import * as React from 'react';
import { ButtonPage } from 'fabric-samples/lib/pages/ButtonPage/ButtonPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class ButtonComponentPage extends React.Component<any, any> {
  public render() {
    return (

      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='Button' backgroundColor='#038387'
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
          <ButtonPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
