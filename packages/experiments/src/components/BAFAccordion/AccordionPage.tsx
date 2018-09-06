/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';
import * as React from 'react';
import { AccordionBasicExample } from './examples/Accordion.Basic.Example';

// tslint:disable-next-line:no-var-requires
const AccordionBasicExampleCode = require('!raw-loader!business-app-fabric/src/components/Accordion/examples/Accordion.Basic.Example.tsx') as string;

export class AccordionPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title={'Accordion'}
        componentName="AccordionExample"
        exampleCards={
          <div>
            <ExampleCard title="Basic Accordion" code={AccordionBasicExampleCode}>
              <AccordionBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!business-app-fabric/src/components/Accordion/Accordion.types.tsx')]}
          />
        }
        overview={
          <div>
            <p>
              The Accordion component creates a collapsible section where a parent button is used to show or hide the
              children elements.
            </p>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
