import * as React from 'react';

import { ExampleCard, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { DetailPanelBasicExample } from './Examples/DetailPanel.Basic.Example';
import { DetailPanelL2ContentExample } from './Examples/DetailPanel.L2Content.Example';
import { DetailPanelPivotExample } from './Examples/DetailPanel.Pivot.Example';

const DetailPanelBasicExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/DetailPanel/Examples/DetailPanel.Basic.Example.tsx') as string;
const DetailPanelL2ContentExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/DetailPanel/Examples/DetailPanel.L2Content.Example.tsx') as string;
const DetailPanelPivotExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/DetailPanel/Examples/DetailPanel.Pivot.Example.tsx') as string;

export class DetailPanelPage extends React.PureComponent<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Detail Panel"
        componentName="DetailPanelExample"
        exampleCards={
          <div>
            <ExampleCard title="basic detail panel" code={DetailPanelBasicExampleCode}>
              <DetailPanelBasicExample />
            </ExampleCard>
            <ExampleCard title="detail panel with L2 Content" code={DetailPanelL2ContentExampleCode}>
              <DetailPanelL2ContentExample />
            </ExampleCard>
            <ExampleCard title="detail panel with pivot" code={DetailPanelPivotExampleCode}>
              <DetailPanelPivotExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/dashboard/src/components/DetailPanel/DetailPanel.types.ts')]}
          />
        }
      />
    );
  }
}
