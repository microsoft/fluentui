import * as React from 'react';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { ThemeGeneratorPage } from 'office-ui-fabric-react/lib/components/ThemeGenerator/ThemeGeneratorPage';
const pageStyles: any = require('../../PageStyles.module.scss');

export class ThemeGeneratorToolPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div
        className={ pageStyles.basePage }
      >
        <PageHeader
          pageTitle='Theme Generator'
          backgroundColor='#006f94'
          links={
            [
              {
                'text': 'Overview',
                'location': 'Overview'
              },
              {
                'text': 'Output',
                'location': 'Output'
              },
              {
                'text': 'Fabric palette',
                'location': 'Fabric palette'
              },
              {
                'text': 'Samples',
                'location': 'Samples'
              },
              {
                'text': 'Accessibility',
                'location': 'Accessibility'
              }
            ]
          }
        />

        <ThemeGeneratorPage />

      </div>
    );
  }
}
