import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { TextFieldBasicExample } from './examples/TextField.Basic.Example';
import { TextFieldErrorMessageExample } from './examples/TextField.ErrorMessage.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const TextFieldBasicExampleCode = require('./examples/TextField.Basic.Example.tsx');
const TextFieldErrorMessageExampleCode = require('./examples/TextField.ErrorMessage.Example.tsx');

export class TextFieldPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'TextField');
  }

  public render() {
    return (
      <ComponentPage
        title='TextField'
        componentName='TextFieldExample'
        exampleCards={
          <div>
            <ExampleCard title='TextField variations' code={ TextFieldBasicExampleCode }>
              <TextFieldBasicExample />
            </ExampleCard>
            <ExampleCard title='TextField error message variations' code={ TextFieldErrorMessageExampleCode }>
              <TextFieldErrorMessageExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet componentName='TextField' />
        }
        overview={
          <div>
            <p>
              The TextField component enables a user to type text into an app. It's typically used to capture a single line of text, but can be configured to capture multiple lines of text. The text displays on the screen in a simple, uniform format.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
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
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/TextField.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
