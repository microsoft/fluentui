import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { TeachingDialogBasicExample } from './examples/TeachingDialog.Basic.Example';

const TeachingDialogBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TeachingDialog/examples/TeachingDialog.Basic.Example.tsx') as string;

export class TeachingDialogPage extends React.Component<any, any> {
  public render() {
    return (
      <ComponentPage
        title='TeachingDialog'
        componentName='TeachingDialogExample'
        exampleCards={
          <LayerHost>
            <ExampleCard title='TeachingDialog' code={ TeachingDialogBasicExampleCode }>
              <TeachingDialogBasicExample />
            </ExampleCard>
          </LayerHost>
        }
        propertiesTables={
          <PropertiesTableSet componentName='TeachingDialog'
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/TeachingDialog/TeachingDialog.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/TeachingDialog'>TeachingDialogs</Link>
            <span> allow the user to display important hints on their web pages with a callout box.</span>
          </div>
        }
      />
    );
  }
}
