import * as React from 'react';
import "./FormPage.scss";

import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

const FormAutosaveExampleCode = require('!raw-loader!experiments/src/components/Form/examples/Form.Autosave.Example.tsx') as string;
const FormBasicExampleCode = require('!raw-loader!experiments/src/components/Form/examples/Form.Basic.Example.tsx') as string;
const FormValidationExampleCode = require('!raw-loader!experiments/src/components/Form/examples/Form.Validation.Example.tsx') as string;

import { FormAutosaveExample } from './examples/Form.Autosave.Example';
import { FormBasicExample } from './examples/Form.Basic.Example';
import { FormValidationExample } from './examples/Form.Validation.Example';

export class FormPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Form'
        componentName='FormExample'
        exampleCards={
          <div>
            <ExampleCard title='Basic Form with one input and a submit button' code={ FormBasicExampleCode }>
              <FormBasicExample />
            </ExampleCard>
            <ExampleCard title='Form with validation and conditional submit button' code={ FormValidationExampleCode }>
              <FormValidationExample />
            </ExampleCard>
            <ExampleCard title='Form with validation and autosave' code={ FormAutosaveExampleCode }>
              <FormAutosaveExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/Form/Form.Props.ts'),
              require<string>('!raw-loader!experiments/src/components/Form/FormBaseInput.Props.ts')
            ] }
          />
        }
        /* tslint:disable:max-line-length */
        overview={
          <div>
            <p>
              Form is a wrapper component that aids in the creation of HTML forms. When used with the included Form input components, it provides a way to consolidate all of your form state into the Form component. The host of the Form only needs to be concerned about the values that are returned from the onSumbit and onUpdated callbacks
            </p>
            <p>
              A set of input components are provided out of the box, including text, dropdown, checkbox, and date. More components can easily be added by extending the FormBaseInput component and rendering the desired component.
            </p>
            <p>
              When the user submits the form, the Form host can listen to the onSubmit callback. The argument to this callback is an object which contains all the form values, keyed by 'inputKey' prop specified on all of the Form input components. The host component can also listen to the onUpdated callback, which is called each time an input is updated. This is useful for forms that should be saved automatically.
            </p>
          </div>
        }
        /* tslint:enable:max-line-length */
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Sort commands in order of importance from left to right or right to left depending on the culture.</li>
              <li>Organize commands into logical groupings.</li>
              <li>Display no more than 5-7 commands.</li>
              <li>Use overflow to house less frequently-used commands.</li>
              <li>In small breakpoints, only have the most recognizable commands render as icon only.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Fill the command bar completely from left to right.</li>
              <li>Use icons only for commands in larger widths.</li>
              <li>Display more than 2-3 items on the right side of the bar (or left side in left to right experiences).</li>
            </ul>
          </div>
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/CommandBar/CommandBar.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }

}
