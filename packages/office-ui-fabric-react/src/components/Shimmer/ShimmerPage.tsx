import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ShimmerBasicExample } from './examples/Shimmer.Basic.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ShimmerStatus } from './Shimmer.checklist';

const ShimmerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.Basic.Example.tsx') as string;

export class ShimmerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Shimmer'
        componentName='ShimmerExample'
        exampleCards={
          <div>
            <ExampleCard
              title='Generic Shimmer'
              code={ ShimmerBasicExampleCode }
            >
              <ShimmerBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Shimmer/Shimmer.types.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga quisquam laudantium ratione tenetur beatae placeat maxime, unde suscipit est saepe! Sed animi adipisci deleniti. Praesentium dicta ad quam reiciendis quo!
            </p>

            <ul>
              <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis optio, corporis nam dicta officia laboriosam dolores. Fugiat, assumenda ratione laborum quaerat quam, inventore quasi recusandae cupiditate temporibus deserunt soluta. Dolores!</li>
              <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem unde iste repellendus. Dignissimos, numquam! Expedita incidunt voluptatibus porro illo aperiam non, cum nesciunt praesentium blanditiis ipsum? Cum aliquid itaque asperiores.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est praesentium illo at non. Illo laboriosam tempore eligendi et inventore iusto facere sequi exercitationem magni ullam atque laborum, harum commodi iure.</li>
            </ul>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta accusantium aperiam sint exercitationem nam, tenetur voluptatum iste sapiente, quod aliquid voluptas ab qui minus officiis beatae repellat tempore laboriosam nostrum.
              </li>
              <li>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta accusantium aperiam sint exercitationem nam, tenetur voluptatum iste sapiente, quod aliquid voluptas ab qui minus officiis beatae repellat tempore laboriosam nostrum.
              </li>
              <li>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta accusantium aperiam sint exercitationem nam, tenetur voluptatum iste sapiente, quod aliquid voluptas ab qui minus officiis beatae repellat tempore laboriosam nostrum.
              </li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur rem alias placeat vero illo excepturi architecto, minima quo amet illum odit eligendi, praesentium quisquam aut? Quis consequatur illum iure sapiente.
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ShimmerStatus }
          />
        }
      />
    );
  }
}
