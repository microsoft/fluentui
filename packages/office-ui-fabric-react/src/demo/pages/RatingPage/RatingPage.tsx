import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { RatingBasicExample } from './examples/Rating.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const RatingBasicExampleCode = require('./examples/Rating.Basic.Example.tsx');

export class RatingPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Slider');
  }

  public render() {
    return (
      <ComponentPage
        title='Rating'
        componentName='RatingExample'
        exampleCards={
          <ExampleCard title='Rating' code={ RatingBasicExampleCode }>
            <RatingBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet componentName='Rating' />
        }
        overview={
          <div>
            <p>
              Ratings provide insight regarding others’ opinions and experiences with a product, helping users make more-informed purchasing decisions. Users can also rate products they’ve purchased.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Make it clear which product the rating pertains to by making sure the layout and grouping are clear when several products are on the page.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don’t use the rating component for data that has a continuous range, such as the brightness of a photo. Instead, use a slider.</li>
            </ul>
          </div>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
