import * as React from 'react';
import { ISchemePage } from '@uifabric/fabric-website-resources/lib/components/pages/ISchemePage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class ISchemeComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={pageStyles.basePage}>
        <ComponentPage>
          <PageHeader pageTitle="IScheme" backgroundColor="#038387" />
          <ISchemePage isHeaderVisible={false} />
        </ComponentPage>
      </div>
    );
  }
}
