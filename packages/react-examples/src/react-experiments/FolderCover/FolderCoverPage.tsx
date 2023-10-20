import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { FolderCoverBasicExample } from './FolderCover.Basic.Example';
const FolderCoverBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/FolderCover/FolderCover.Basic.Example.tsx') as string;

export class FolderCoverPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="FolderCover"
        componentName="FolderCover"
        exampleCards={
          <div>
            <ExampleCard title="Folder Cover" isOptIn={true} code={FolderCoverBasicExampleCode}>
              <FolderCoverBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/FolderCover/FolderCover.types.ts'),
            ]}
          />
        }
        overview={
          <div>
            Initialize folder covers first using <code>initializeFolderCovers()</code>.
          </div>
        }
        dos={
          <div>
            <ul>
              <li>Use them to represent a folder which may contain visual content.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>To represent the concept of a folder as opposed to an actual folder item.</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
