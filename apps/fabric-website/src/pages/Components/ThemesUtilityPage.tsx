import * as React from 'react';
import { ThemePage } from '@uifabric/fabric-website-resources/lib/components/pages/ThemePage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class ThemesUtilityPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={pageStyles.basePage}>
        <ComponentPage>
          <PageHeader
            pageTitle="Themes"
            backgroundColor="#038387"
            links={[
              {
                text: 'Overview',
                location: 'Overview'
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
          <ThemePage isHeaderVisible={false} />
        </ComponentPage>
      </div>
    );
  }
}
