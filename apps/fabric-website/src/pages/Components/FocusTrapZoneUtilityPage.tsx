import * as React from 'react';
import { FocusTrapZonePage } from '@uifabric/fabric-website-resources/lib/components/pages/FocusTrapZonePage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class FocusTrapZoneUtilityPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={pageStyles.basePage}>
        <ComponentPage>
          <PageHeader
            pageTitle="FocusTrapZone"
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
          <FocusTrapZonePage isHeaderVisible={false} />
        </ComponentPage>
      </div>
    );
  }
}
