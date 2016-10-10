import * as React from 'react';
import {
  Link,
  LayerHost
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { TeachingBubbleBasicExample } from './examples/TeachingBubble.Basic.Example';
import { TeachingBubbleCondensedExample } from './examples/TeachingBubble.Condensed.Example';
import { TeachingBubbleIllustrationExample } from './examples/TeachingBubble.Illustration.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';

const TeachingBubbleBasicExampleCode = require('./examples/TeachingBubble.Basic.Example.tsx');
const TeachingBubbleCondensedExampleCode = require('./examples/TeachingBubble.Condensed.Example.tsx');
const TeachingBubbleIllustrationExampleCode = require('./examples/TeachingBubble.Basic.Example.tsx');

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
          <LayerHost>
            <ExampleCard title='TeachingBubble' code={ TeachingBubbleBasicExampleCode }>
              <TeachingBubbleBasicExample />
            </ExampleCard>
            <ExampleCard title='TeachingBubble Condensed' code={ TeachingBubbleCondensedExampleCode }>
              <TeachingBubbleCondensedExample />
            </ExampleCard>
            <ExampleCard title='TeachingBubble with Illustration' code={ TeachingBubbleIllustrationExampleCode }>
              <TeachingBubbleIllustrationExample />
            </ExampleCard>
          </LayerHost>
        }
        propertiesTables={
          <PropertiesTableSet componentName='TeachingBubble' />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/TeachingBubble'>TeachingBubbles</Link>
            <span> allow the user to display important hints on their web pages with a callout box.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }
}
