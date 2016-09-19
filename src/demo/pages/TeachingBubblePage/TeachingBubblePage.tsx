import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { TeachingBubbleBasicExample } from './examples/TeachingBubble.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';

const TeachingBubbleBasicExampleCode = require('./examples/TeachingBubble.Basic.Example.tsx');

export class TeachingBubblePage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'TeachingBubble');
  }

  public render() {
    return (
      <ComponentPage
        title='TeachingBubble'
        componentName='TeachingBubbleExample'
        exampleCards={
          [
            <ExampleCard title='TeachingBubble' code={ TeachingBubbleBasicExampleCode }>
              <TeachingBubbleBasicExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='TeachingBubble' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/TeachingBubble'>TeachingBubbles</Link>
            <span> allow the user to turn an option on/off.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }
}
