import * as React from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage, IComponentPageProps } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class ComponentUtilitiesPage extends React.Component<IComponentPageProps, any> {
  public render() {
    return (
      <div ref='pageElement' className={ pageStyles.pageTypography }>
        <ComponentPage>
          <PageHeader pageTitle='Utilities' backgroundColor='#038387' />
          <h2 className='ComponentPage-subHeading'>Overview</h2>
          <p>Fabric React includes utilities that allow you to control keyboard navigation behaviors, manage object selection and interaction, and apply custom themes.</p>
        </ComponentPage>
      </div>
    );
  }
}
