import * as React from 'react';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { Table } from '../../../components/Table/Table';
const pageStyles: any = require('../../PageStyles.module.scss');

const utilitiesData = require('../../../data/utilities.json');

export class UtilitiesPage extends React.Component<any, any> {
  public render() {
    return (
      <div className={ pageStyles.basePage }>
        <PageHeader pageTitle='Utilities' backgroundColor='#006f94' />
        <div className={ pageStyles.u_maxTextWidth }>
          <h2>Helper utilities</h2>
          <p>Fabric comes with a variety of utility classes that you can use to improve your app&rsquo;s accessibility, layout, text styling, and more.</p>
        </div>
        <Table content={ utilitiesData } />
      </div>
    );
  }
}
