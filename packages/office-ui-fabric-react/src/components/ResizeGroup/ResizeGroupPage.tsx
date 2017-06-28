import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ResizeGroupOverflowSetExample } from './examples/ResizeGroup.OverflowSet.Example';
import { ResizeGroupCacheKeyExample } from './examples/ResizeGroup.CacheKey.Example';

const ResizeGroupBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/examples/ResizeGroup.OverflowSet.Example.tsx') as string;

const ResizeGroupCacheCode = require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/examples/ResizeGroup.CacheKey.Example.tsx') as string;

export class ResizeGroupPage extends React.Component<any, any> {
  public render() {
    return (
      <ComponentPage
        title='ResizeGroup'
        componentName='ResizeGroupExample'
        exampleCards={
          <LayerHost>
            <ExampleCard title='ResizeGroup' code={ ResizeGroupBasicExampleCode }>
              <ResizeGroupOverflowSetExample />
            </ExampleCard>
            <ExampleCard title='ReszieGroup with cache key' code={ ResizeGroupCacheCode }>
              <ResizeGroupCacheKeyExample />
            </ExampleCard>
          </LayerHost>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/ResizeGroup.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/ResizeGroup'>ResizeGroup</Link>
            <span> supplement content associated with a specific UI component.</span>
          </div>
        }
      />
    );
  }
}
