import * as React from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ColorsPage } from '@uifabric/fabric-website-resources/lib/components/pages/ColorsPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class ColorsCustomizationPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={pageStyles.basePage}>
        <PageHeader
          pageTitle="Colors"
          backgroundColor="#038387"
          links={[
            {
              text: 'Overview',
              location: 'Overview'
            },
            {
              text: 'Output',
              location: 'Output'
            },
            {
              text: 'Fabric palette',
              location: 'Fabric palette'
            },
            {
              text: 'Samples',
              location: 'Samples'
            },
            {
              text: 'Accessibility',
              location: 'Accessibility'
            }
          ]}
        />

        <ColorsPage />
      </div>
    );
  }
}
