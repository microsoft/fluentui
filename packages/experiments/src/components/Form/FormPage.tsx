import * as React from 'react';
import './FormPage.scss';

import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

const FormAutosaveExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Form/examples/Form.Autosave.Example.tsx') as string;

const FormBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Form/examples/Form.Basic.Example.tsx') as string;

const FormValidationExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Form/examples/Form.Validation.Example.tsx') as string;

import { FormAutosaveExample } from './examples/Form.Autosave.Example';
import { FormBasicExample } from './examples/Form.Basic.Example';
import { FormValidationExample } from './examples/Form.Validation.Example';

export class FormPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Form"
        componentName="FormExample"
        exampleCards={
          <div>
            <ExampleCard title="Basic Form with one input and a submit button" code={FormBasicExampleCode}>
              <FormBasicExample />
            </ExampleCard>
            <ExampleCard title="Form with validation and conditional submit button" code={FormValidationExampleCode}>
              <FormValidationExample />
            </ExampleCard>
            <ExampleCard title="Form with validation and autosave" code={FormAutosaveExampleCode}>
              <FormAutosaveExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader!@uifabric/experiments/src/components/Form/Form.types.ts'),
              require<string>('!raw-loader!@uifabric/experiments/src/components/Form/FormBaseInput.types.ts')
            ]}
          />
        }
        /* tslint:disable:max-line-length */
        overview={
          <div>
            <p>
              Form is a wrapper component that aids in the creation of HTML forms. When used with the included Form input components, it
              provides a way to consolidate all of your form state into the Form component. The host of the Form only needs to be concerned
              about the values that are returned from the onSumbit and onUpdated callbacks
            </p>
            <p>
              A set of input components are provided out of the box, including text, dropdown, checkbox, and date. More components can
              easily be added by extending the FormBaseInput component and rendering the desired component.
            </p>
            <p>
              When the user submits the form, the Form host can listen to the onSubmit callback. The argument to this callback is an object
              which contains all the form values, keyed by 'inputKey' prop specified on all of the Form input components. The host component
              can also listen to the onUpdated callback, which is called each time an input is updated. This is useful for forms that should
              be saved automatically.
            </p>
          </div>
        }
        /* tslint:enable:max-line-length */
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Wrap multiple form inputs under one Form component</li>
              <li>Use any layout you want within the Form component. The inputs do not have to be direct children</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Store the Form values in the parent component. The Form component will take care of all the state</li>
              <li>Control the form inputs using value. Their values are managed by the Form compoennt</li>
            </ul>
          </div>
        }
        related={<a href="https://dev.office.com/fabric-js/Components/CommandBar/CommandBar.html">Fabric JS</a>}
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
