import * as React from 'react';
import { ResizeGroupPage } from '@uifabric/fabric-website-resources/lib/components/pages/ResizeGroupPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class ResizeGroupComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={pageStyles.basePage}>
        <ComponentPage>
          <PageHeader
            pageTitle="ResizeGroupPage"
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
                text: 'Implementation',
                location: 'Implementation'
              }
            ]}
          />
          <ResizeGroupPage isHeaderVisible={false} />
        </ComponentPage>
      </div>
    );
  }
}
