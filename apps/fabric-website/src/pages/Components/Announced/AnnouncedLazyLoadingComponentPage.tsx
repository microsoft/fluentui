import * as React from 'react';
import { AnnouncedLazyLoadingPage } from '@uifabric/fabric-website-resources/lib/components/pages/Announced/AnnouncedLazyLoadingPage';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../../PageStyles.module.scss');

export class AnnouncedLazyLoadingComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={pageStyles.basePage}>
        <ComponentPage>
          <AnnouncedLazyLoadingPage isHeaderVisible={false} />
        </ComponentPage>
      </div>
    );
  }
}
