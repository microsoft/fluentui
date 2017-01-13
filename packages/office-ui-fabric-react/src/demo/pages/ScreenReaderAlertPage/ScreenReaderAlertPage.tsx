import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';
import { ScreenReaderAlertBasicExample } from './examples/ScreenReaderAlert.Basic.Example';
import { ScreenReaderAlertRepeatExample } from './examples/ScreenReaderAlert.Repeat.Example';
import { ScreenReaderAlertSpinnerExample } from './examples/ScreenReaderAlert.Spinner.Example';

const ScreenReaderAlertBasicExampleCode = require('./examples/ScreenReaderAlert.Basic.Example.tsx');
const ScreenReaderAlertRepeatExampleCode = require('./examples/ScreenReaderAlert.Repeat.Example.tsx');
const ScreenReaderAlertSpinnerExampleCode = require('./examples/ScreenReaderAlert.Spinner.Example.tsx');

export class ScreenReaderAlertPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'UTILITIES', 'ScreenReaderAlert');
  }

  public render() {
    return (
      <ComponentPage
        title='ScreenReaderAlert'
        componentName='ScreenReaderAlertExample'
        exampleCards={
          <div>
            <ExampleCard title='ScreenReaderAlert basic' code={ ScreenReaderAlertBasicExampleCode }>
              <ScreenReaderAlertBasicExample />
            </ExampleCard>
            <ExampleCard title='ScreenReaderAlert repeat same message' code={ ScreenReaderAlertRepeatExampleCode }>
              <ScreenReaderAlertRepeatExample />
            </ExampleCard>
            <ExampleCard title='ScreenReaderAlert with Spinner' code={ ScreenReaderAlertSpinnerExampleCode }>
              <ScreenReaderAlertSpinnerExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet componentName='ScreenReaderAlert' />
        }
        overview={
          <div>
            <p>
              ScreenReaderAlerts are used to read out the notifications on the page to the blind people with the help of screen readers like JAWS, Chrome VOX and NVDA. It is implemented by live region and overcomes some known issues about live region when using with React.
            </p>
            <p>
              It renders an addition element for screen reader only, so using this component while the text/ui is visible will duplicate the text in the DOM. You should use vanilla live region attributes instead if you don't want this duplicate element.
            </p>
            <p>
              This component has been tested through following combination of screen readers and browsers:
            </p>
            <ul>
              <li>
                1. <strong>Narrator in windows 10 Enterprise 14393.577</strong> with <strong>Edge 38.14393.0.0</strong>.
              </li>
              <li>
                2. <strong>NVDA 2016.4</strong> with <strong>FireFox v50.1.0</strong>.
              </li>
              <li>
                3. <strong>Chrome VOX v53</strong> with <strong>Chrome v54</strong>.
                <br />
                Note: ReadingMode.ReadAfterOtherContent option is currently not supported in ChromeVOX, text will be read immediately.
              </li>
              <li>
                4. <strong>JAWS 18</strong> with <strong>IE 11</strong>.
              </li>
            </ul>

            <p>
              To try the demo in this page, you should at least using one kind of screen reader. E.g. JAWS, ChromeVOX, NVDA.
              Better use the browser recommendated by the screen reader you're using. E.g. IE11 with JAWS, Chrome with ChromeVOX, FireFox with NVDA.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use if it would be hard for blind people to know dynamic changes on the page.</li>
              <li>Pay attention to user experience for blind users: do they have enough information they need?</li>
              <li>Use it to notify user the status change of async tasks.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don't trigger multiple read-outs at the same time.</li>
              <li>Don't provide useless information to users</li>
              <li>Don't use in very frequent scenarios. E.g. Notifying downlond status from 1% to 100%.</li>
            </ul>
          </div>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
