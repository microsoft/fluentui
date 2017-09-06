
import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { LayerBasicExample } from './examples/Layer.Basic.Example';
import { LayerHostedExample } from './examples/Layer.Hosted.Example';

const LayerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Layer/examples/Layer.Basic.Example.tsx') as string;
const LayerHostedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Layer/examples/Layer.Hosted.Example.tsx') as string;

export class LayerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Layer'
        componentName='LayerExample'
        exampleCards={
          <div>
            <ExampleCard title='Basic layered content' code={ LayerBasicExampleCode }>
              <LayerBasicExample />
            </ExampleCard>
            <ExampleCard title='Using LayerHost to control projection' code={ LayerHostedExampleCode }>
              <LayerHostedExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Layer/Layer.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              A Layer is a technical component that does not have specific Design guidance.
            </p>
            <p>
              { `Layers are used to render content outside of a DOM tree, at the end of the document. This allows content to escape traditional boundaries caused by "overflow: hidden" css rules and keeps it on the top without using z-index rules. This is useful for example in ContextualMenu and Tooltip scenarios, where the content should always overlay everything else.` }
            </p>
            <p>{
              `There are some special considerations. Due to the nature of rendering content elsewhere asynchronously, React refs within content will not be resolvable synchronously at the time the Layer is mounted. Therefore, to use refs correctly, use functional refs ( ref={ (el) => { this._root = el; } ) rather than string refs ( ref='root' ). Additionally measuring the physical Layer element will not include any of the children, since it won't render it. Events that propgate from within the content will not go through the Layer element as well.`
            }</p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>{
                'Use functional refs ( ref={ (el) => { this._root = el; } ).'
              }
              </li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>{ 'Don\'t use string refs ( ref=\'root\' ).' }</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      >
      </ComponentPage>
    );
  }
}
