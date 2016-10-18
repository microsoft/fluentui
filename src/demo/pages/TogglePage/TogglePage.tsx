import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { ToggleBasicExample } from './examples/Toggle.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const ToggleBasicExampleCode = require('./examples/Toggle.Basic.Example.tsx');

export class TogglePage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Toggle');
  }

  public render() {
    return (
      <ComponentPage
        title='Toggle'
        componentName='ToggleExample'
        exampleCards={
          <ExampleCard title='Toggle' code={ ToggleBasicExampleCode }>
            <ToggleBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet componentName='Toggle' />
        }
        overview={
          <div>
            <p>
              Toggles represent a physical switch that allows users to turn things on or off. Use Toggles to present users with two mutually exclusive options (like on/off), where choosing an option results in an immediate action. Use a Toggle for binary operations that take effect right after the user flips the Toggle. For example, use a Toggle to turn services or hardware components on or off. In other words, if a physical switch would work for the action, a Toggle is probably the best control to use.
            </p>

            <h2 className='ms-font-xl'>Choosing between Toggle and Checkbox</h2>

            <p>
              For some actions, either a Toggle or a Checkbox might work. To decide which control would work better, follow these tips:
            </p>

            <ul>
              <li>Use a Toggle for binary settings when changes become effective immediately after the user changes them.</li>
              <li>In the above example, it's clear with the Toggle that the wireless is set to "On." But with the Checkbox, the user needs to think about whether the wireless is on now or whether they need to check the box to turn wireless on.</li>
              <li>Use a Checkbox when the user has to perform extra steps for changes to be effective. For example, if the user must click a "Submit", "Next", "Ok" button to apply changes, use a Checkbox.</li>
            </ul>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>
                Only replace the On and Off labels if there are more specific labels for the setting. If there are short (3-4 characters) labels that represent binary opposites that are more appropriate for a particular setting, use them. For example, you might use "Show/Hide" if the setting is "Show images."
              </li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              Don’t use a Toggle if the user will have to do something else or go somewhere else in order to experience its effect. If any extra step is required for changes to be effective, you should use a checkbox and corresponding "Apply" button instead of a Toggle.
            </ul>
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Toggle.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
