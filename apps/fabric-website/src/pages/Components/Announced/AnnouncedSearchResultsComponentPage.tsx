import * as React from 'react';
import { AnnouncedSearchResultsPage } from '@uifabric/fabric-website-resources/lib/components/pages/Announced/AnnouncedSearchResultsPage';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../../PageStyles.module.scss');

export class AnnouncedSearchResultsComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={pageStyles.basePage}>
        <ComponentPage>
          <AnnouncedSearchResultsPage isHeaderVisible={false} />
        </ComponentPage>
      </div>
    );
  }
}
