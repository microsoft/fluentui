import * as React from 'react';
import { TextFieldPage } from '@uifabric/fabric-website-resources/lib/components/pages/TextFieldPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class TextFieldComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={pageStyles.basePage}>
        <ComponentPage>
          <PageHeader
            pageTitle="TextField"
            backgroundColor="#038387"
            links={[
              {
                text: 'Overview',
                location: 'Overview'
              },
              {
                text: 'Best Practices',
                location: 'BestPractices'
              },
              {
                text: 'Variants',
                location: 'Variants'
              },
              {
                text: 'Implementation Examples',
                location: 'ImplementationExamples'
              },
              {
                text: 'Implementation',
                location: 'Implementation'
              }
            ]}
          />
          <TextFieldPage isHeaderVisible={false} />
        </ComponentPage>
      </div>
    );
  }
}
