import * as React from 'react';
import { ButtonPage } from '@uifabric/fabric-website-resources/lib/components/pages/ButtonPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class ButtonComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={pageStyles.basePage}>
        <ComponentPage>
          <PageHeader
            pageTitle="Button"
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
          <ButtonPage isHeaderVisible={false} />
        </ComponentPage>
      </div>
    );
  }
}
