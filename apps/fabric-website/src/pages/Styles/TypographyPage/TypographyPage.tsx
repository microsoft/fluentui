import * as React from 'react';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { Table } from '../../../components/Table/Table';
const pageStyles: any = require('../../PageStyles.module.scss');

const typeRampData = require('../../../data/type-ramp.json');
const typeSizeData = require('../../../data/type-sizes.json');
const typeWeightData = require('../../../data/type-weights.json');

export class TypographyPage extends React.Component<any, any> {
  public render() {
    return (
      <div className={ pageStyles.pageTypography }>
        <PageHeader
          pageTitle='Typography'
          links={
            [
              {
                'text': 'Base',
                'location': 'base'
              },
              {
                'text': 'Size',
                'location': 'size'
              },
              {
                'text': 'Weight',
                'location': 'weight'
              }
            ]
          }
          backgroundColor='#006f94'
        />

        <div className={ pageStyles.u_maxTextWidth }>
          <h2 id='base'>Base classes</h2>
          <p>Fabric includes 10 base font classes that represent the type ramp for the Office Design Language. Each class sets the text size along with a default weight.</p>
        </div>
        <Table responsive={ true } content={ typeRampData } />

        <div className={ pageStyles.u_maxTextWidth }>
          <p>To provide flexibility, text color is not included in these base classes. We recommend using 'neutral primary' for most text on white backgrounds. See the <a href='#/styles/colors'>color documentation</a> for guidance.</p>
        </div>
        <h2 id='size'>Size classes</h2>
        <p>To set the text size independent of the weight, use a size class.</p>
        <Table responsive={ true } content={ typeSizeData } />

        <h2 id='weight'>Weight classes</h2>
        <p>To set the text weight independent of the size, use a weight class.</p>
        <Table responsive={ true } content={ typeWeightData } />
      </div>
    );
  }
}
