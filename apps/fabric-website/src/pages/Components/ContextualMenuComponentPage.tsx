import * as React from 'react';
import { ContextualMenuPage } from 'office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenuPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class ContextualMenuComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement' className={ pageStyles.pageTypography }>
        <ComponentPage>
          <PageHeader pageTitle='ContextualMenu' backgroundColor='#038387'
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
          <ContextualMenuPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
