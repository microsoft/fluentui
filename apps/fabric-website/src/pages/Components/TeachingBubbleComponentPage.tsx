import * as React from 'react';
import { TeachingBubblePage } from 'office-ui-fabric-react/lib/components/TeachingBubble/TeachingBubblePage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class TeachingBubbleComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement' className={ pageStyles.basePage }>
        <ComponentPage>
          <PageHeader pageTitle='TeachingBubble' backgroundColor='#038387'
            links={
              [
                {
                  'text': 'Overview',
                  'location': 'Overview'
                },
                {
                  'text': 'Best Practices',
                  'location': 'BestPractices'
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
          <TeachingBubblePage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}