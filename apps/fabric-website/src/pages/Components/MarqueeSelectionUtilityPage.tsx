import * as React from 'react';
import { MarqueeSelectionPage } from '@uifabric/fabric-website-resources/lib/components/pages/MarqueeSelectionPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class MarqueeSelectionUtilityPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={pageStyles.basePage}>
        <ComponentPage>
          <PageHeader
            pageTitle="MarqueeSelection"
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
          <MarqueeSelectionPage isHeaderVisible={false} />
        </ComponentPage>
      </div>
    );
  }
}
