import * as React from 'react';
import { PageHeader } from '../../../components/PageHeader/PageHeader';

import { ThemeGeneratorPage } from 'office-ui-fabric-react/lib/components/ThemeGenerator/ThemeGeneratorPage';

export class ThemeGeneratorToolPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <PageHeader
          pageTitle='Theme Generator'
          backgroundColor='#006f94'
        />

        <ThemeGeneratorPage />

      </div>
    );
  }
}
