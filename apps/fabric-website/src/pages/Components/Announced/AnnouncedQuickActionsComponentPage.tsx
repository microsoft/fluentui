import * as React from 'react';
import { AnnouncedQuickActionsPage } from '@uifabric/fabric-website-resources/lib/components/pages/Announced/AnnouncedQuickActionsPage';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../../PageStyles.module.scss');

export class AnnouncedQuickActionsComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={pageStyles.basePage}>
        <ComponentPage>
          <AnnouncedQuickActionsPage isHeaderVisible={false} />
        </ComponentPage>
      </div>
    );
  }
}
