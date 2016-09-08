
import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { LayerBasicExample } from './examples/Layer.Basic.Example';
import { LayerInteractiveExample } from './examples/Layer.Interactive.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';

const LayerBasicExampleCode = require('./examples/Layer.Basic.Example.tsx');
const LayerInteractiveExampleCode = require('./examples/Layer.Interactive.Example.tsx');

export class LayerPage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Layer');
  }

  public render() {
    return (
       <ComponentPage
        title='Layer'
        componentName='LayerExample'
        exampleCards={
          [
            <ExampleCard title='Basic' code={ LayerBasicExampleCode }>
              <LayerBasicExample />
            </ExampleCard>,
            <ExampleCard title='Interactive' code={ LayerInteractiveExampleCode }>
              <LayerInteractiveExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Layer' />
          ]
        }
        overview={
          <div>
            <p>
              {`Layers are used to render content outside of a DOM tree, at the end of the document. This allows content to escape traditional boundaries caused by "overflow: hidden" css rules and keeps it on the top without using z-index rules. This is useful for example in ContextualMenu and Tooltip scenarios, where the content should always overlay everything else.`}
            </p>
            <p>{
              `There are some special considerations. Due to the nature of rendering content elsewhere asynchronously, React refs within content will not be resolvable synchronously at the time the Layer is mounted. Therefore, to use refs correctly, use functional refs ( ref={ (el) => { this._root = el; } ) rather than string refs ( ref='root' ). Additionally measuring the physical Layer element will not include any of the children, since it won't render it. Events that propgate from within the content will not go through the Layer element as well.`
            }</p>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }
}
