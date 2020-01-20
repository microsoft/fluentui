import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, Markdown, PropertiesTableSet } from '@uifabric/example-app-base';

import { FocusZonePhotosExample } from './examples/FocusZone.Photos.Example';
// import { FocusZoneListExample } from './examples/FocusZone.List.Example';
// import { FocusZoneDisabledExample } from './examples/FocusZone.Disabled.Example';
// import { FocusZoneTabbableExample } from './examples/FocusZone.Tabbable.Example';
// import { FocusZoneHorizontalMenuExample } from './examples/FocusZone.HorizontalMenu.Example';

const FocusZonePhotosExampleCode = require('!raw-loader!@uifabric/react-focus/src/components/FocusZone/examples/FocusZone.Photos.Example.tsx') as string;
// const FocusZoneListExampleCode = require('!raw-loader!@uifabric/react-focus/src/components/FocusZone/examples/FocusZone.List.Example.tsx') as string;
// const FocusZoneDisabledExampleCode = require('!raw-loader!@uifabric/react-focus/src/components/FocusZone/examples/FocusZone.Disabled.Example.tsx') as string;
// const FocusZoneTabbableCode = require('!raw-loader!@uifabric/react-focus/src/components/FocusZone/examples/FocusZone.Tabbable.Example.tsx') as string;
// const FocusZoneHorizontalMenuExampleCode = require('!raw-loader!@uifabric/react-focus/src/components/FocusZone/examples/FocusZone.HorizontalMenu.Example.tsx') as string;

type ExampleType = { title: string; code: string; view: JSX.Element };

const Examples: ExampleType[] = [
  {
    title: 'Non-uniform photos within bidirectional FocusZone',
    code: FocusZonePhotosExampleCode,
    view: <FocusZonePhotosExample />
  }
  // {
  //   title: 'Nesting FocusZones in list rows',
  //   code: FocusZoneListExampleCode,
  //   view: <FocusZoneListExample />
  // },
  // {
  //   title: 'Disabled FocusZone',
  //   code: FocusZoneDisabledExampleCode,
  //   view: <FocusZoneDisabledExample />
  // },
  // {
  //   title: 'Tabbable FocusZone',
  //   code: FocusZoneTabbableCode,
  //   view: <FocusZoneTabbableExample />
  // },
  // {
  //   title: 'Horizontal menu in FocusZone with all arrows key navigation',
  //   code: FocusZoneHorizontalMenuExampleCode,
  //   view: <FocusZoneHorizontalMenuExample />
  // }
];

export class FocusZonePage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="FocusZone"
        componentName="FocusZone"
        exampleCards={
          <div>
            {Examples.map((example: ExampleType) => (
              <ExampleCard title={example.title} code={example.code}>
                {example.view}
              </ExampleCard>
            ))}
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/react-focus/src/components/FocusZone/FocusZone.types.ts')]}
          />
        }
        overview={
          <Markdown>{require<string>('!raw-loader!@uifabric/react-focus/src/components/FocusZone/docs/FocusZoneOverview.md')}</Markdown>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
