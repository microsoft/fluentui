import * as React from 'react';
import { IThemePage } from '@uifabric/fabric-website-resources/lib/components/pages/IThemePage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class IThemeComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={pageStyles.basePage}>
        <ComponentPage>
          <PageHeader pageTitle="ITheme" backgroundColor="#038387" />
          <IThemePage isHeaderVisible={false} />
        </ComponentPage>
      </div>
    );
  }
}
