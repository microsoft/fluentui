import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { DocumentTitleBarExample } from './examples/DocumentTitleBar.Basic.Example';

const DocumentTitleBarExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DocumentTitleBar/examples/DocumentTitleBar.Basic.Example.tsx') as string;

export class DocumentTitleBarPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Document Title Bar'
        componentName='DocumentTitleBarExample'
        exampleCards={
          <div>
            <ExampleCard title='Document Title Bar example' code={ DocumentTitleBarExampleCode }>
              <DocumentTitleBarExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/DocumentTitleBar/DocumentTitleBar.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              A Document Title Bar allows users to perform various actions related to the current document's metadata, such as renaming, viewing saved location and version history.
            </p>
            <p>
              A consumer of this component may customize the appearance of the Document Title Bar by setting the corresponding colors in the Theme object.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Pass true to the "hasVersions" property only if the current document has version history.</li>
              <li>Provide callback for "onRenameDocument".</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don't pass a "filePath" that is too long.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
