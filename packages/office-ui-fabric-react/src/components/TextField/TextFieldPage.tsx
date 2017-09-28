import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { TextFieldBasicExample } from './examples/TextField.Basic.Example';
import { TextFieldCustomRenderExample } from './examples/TextField.CustomRender.Example';
import { TextFieldPlaceholderExample } from './examples/TextField.Placeholder.Example';
import { TextFieldMultilineExample } from './examples/TextField.Multiline.Example';
import { TextFieldUnderlinedExample } from './examples/TextField.Underlined.Example';
import { TextFieldBorderlessExample } from './examples/TextField.Borderless.Example';
import { TextFieldErrorMessageExample } from './examples/TextField.ErrorMessage.Example';
import { TextFieldImplementationExamples } from './examples/TextField.ImplementationExamples';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { TextFieldStatus } from './TextField.checklist';

const TextFieldBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Basic.Example.tsx') as string;
const TextFieldCustomRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.CustomRender.Example.tsx') as string;
const TextFieldPlaceholderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Placeholder.Example.tsx') as string;
const TextFieldMultilineExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Multiline.Example.tsx') as string;
const TextFieldUnderlinedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Underlined.Example.tsx') as string;
const TextFieldBorderlessExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Borderless.Example.tsx') as string;
const TextFieldErrorMessageExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.ErrorMessage.Example.tsx') as string;
const TextFieldImplementationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.ImplementationExamples.tsx') as string;

export class TextFieldPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='TextField'
        componentName='TextFieldExample'
        exampleCards={
          <div>
            <ExampleCard
              title='Default TextField with Label'
              code={ TextFieldBasicExampleCode }
            >
              <TextFieldBasicExample />
            </ExampleCard>
            <ExampleCard
              title='TextField with custom Label'
              code={ TextFieldCustomRenderExampleCode }
            >
              <TextFieldCustomRenderExample />
            </ExampleCard>
            <ExampleCard
              title='TextField with Placeholder'
              code={ TextFieldPlaceholderExampleCode }
            >
              <TextFieldPlaceholderExample />
            </ExampleCard>
            <ExampleCard
              title='Multiline TextField'
              code={ TextFieldMultilineExampleCode }
            >
              <TextFieldMultilineExample />
            </ExampleCard>
            <ExampleCard
              title='Underlined TextField'
              code={ TextFieldUnderlinedExampleCode }
            >
              <TextFieldUnderlinedExample />
            </ExampleCard>
            <ExampleCard
              title='Borderless TextField'
              code={ TextFieldBorderlessExampleCode }
            >
              <TextFieldBorderlessExample />
            </ExampleCard>
            <ExampleCard
              title='TextField error message variations'
              code={ TextFieldErrorMessageExampleCode }
            >
              <TextFieldErrorMessageExample />
            </ExampleCard>
            <ExampleCard
              title='Implementation Examples'
              code={ TextFieldImplementationExampleCode }
            >
              <TextFieldImplementationExamples />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/TextField/TextField.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              The TextField component enables a user to type text into an app. It's typically used to capture a single line of text, but can be configured to capture multiple lines of text. The text displays on the screen in a simple, uniform format.
            </p>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Use the TextField to accept data input on a form or page.</li>
              <li>Label the TextField with a helpful name. </li>
              <li>Provide concise helper text that specifies what content is expected to be entered.</li>
              <li>Provide all appropriate states for the control (static, hover, focus, engaged, unavailable, error).</li>
              <li>When part of a form, provide clear designations for which fields are required vs. optional.</li>
              <li>Provide all appropriate methods for submitting provided data (onEnter or a dedicated ‘Submit’ button).</li>
              <li>Provide all appropriate methods of clearing provided data (‘X’ or something similar).</li>
              <li>Allow for selection, copy and paste of field data.</li>
              <li>Whenever possible, format TextField relative to the expected entry (4-digit PIN, 10-digit phone number (3 separate fields), etc).</li>
              <li>When long entries are expected, provide a mechanism for overflow or expansion of the control itself.</li>
              <li>Ensure that the TextField is functional through use of mouse/keyboard or touch when available.</li>
              <li>Ensure that the TextField is accessible through screen reader and/or other accessibility tools.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don’t use a TextField to render basic copy as part of a body element of a page.</li>
              <li>Don’t provide an unlabeled TextField and expect that users will know what to do with it.</li>
              <li>Don’t place a TextField inline with body copy.  </li>
              <li>Don’t be overly verbose with helper text.</li>
              <li>Don’t occlude the entry or allow entry when the active content is not visible.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...TextFieldStatus}
          />
        }
      />
    );
  }
}
