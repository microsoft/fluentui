import * as React from 'react';
import { AnnouncedBulkOperationsPage } from '@uifabric/fabric-website-resources/lib/components/pages/Announced/AnnouncedBulkOperationsPage';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../../PageStyles.module.scss');

export class AnnouncedBulkOperationsComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={pageStyles.basePage}>
        <ComponentPage>
          <AnnouncedBulkOperationsPage isHeaderVisible={false} />
        </ComponentPage>
      </div>
    );
  }
}
