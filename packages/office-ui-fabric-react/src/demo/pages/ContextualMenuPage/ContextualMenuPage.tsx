import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { ContextualMenuBasicExample } from './examples/ContextualMenu.Basic.Example';
import { ContextualMenuCheckmarksExample } from './examples/ContextualMenu.Checkmarks.Example';
import { ContextualMenuDirectionalExample } from './examples/ContextualMenu.Directional.Example';
import { ContextualMenuCustomizationExample } from './examples/ContextualMenu.Customization.Example';

import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const ContextualMenuBasicExampleCode = require('./examples/ContextualMenu.Basic.Example.tsx');
const ContextualMenuCheckmarksExampleCode = require('./examples/ContextualMenu.Checkmarks.Example.tsx');
const ContextualMenuDirectionalExampleCode = require('./examples/ContextualMenu.Directional.Example.tsx');
const ContextualMenuCustomizationExampleCode = require('./examples/ContextualMenu.Customization.Example.tsx');

export class ContextualMenuPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'ContextualMenu');
  }

  public render() {
    return (
      <ComponentPage
        title='ContextualMenu'
        componentName='ContextualMenuExample'
        exampleCards={
          <div>
            <ExampleCard title='ContextualMenu' code= { ContextualMenuBasicExampleCode }>
              <ContextualMenuBasicExample />
            </ExampleCard>
            <ExampleCard title='ContextualMenu checked menus example' code={ ContextualMenuCheckmarksExampleCode }>
              <ContextualMenuCheckmarksExample />
            </ExampleCard>
            <ExampleCard title='ContextualMenu beak/direction test' code={ ContextualMenuDirectionalExampleCode }>
              <ContextualMenuDirectionalExample />
            </ExampleCard>
            <ExampleCard title='ContextualMenu customization example' code={ ContextualMenuCustomizationExampleCode }>
              <ContextualMenuCustomizationExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <div>
            <PropertiesTableSet componentName='ContextualMenu' />
            <PropertiesTableSet componentName='Callout' renderOnly={ ['DirectionalHint'] } />
          </div>
        }
        overview={
          <div>
            <p>
              ContextualMenus are lists of commands that are based on the context of selection, mouse hover or keyboard focus. They are one of the most effective and highly used command surfaces, and can be used in a variety of places.
            </p>
            <p>
              There are variants that originate from a command bar, or from cursor or focus. Those that come from CommandBars use a beak that is horizontally centered on the button. Ones that come from right click and menu button do not have a beak, but appear to the right and below the cursor. ContextualMenus can have submenus from commands, show selection checks, and icons.
            </p>
            <p>
              Organize commands in groups divided by rules. This helps users remember command locations, or find less used commands based on proximity to others. One should also group sets of mutually exclusive or multiple selectable options. Use icons sparingly, for high value commands, and don’t mix icons with selection checks, as it makes parsing commands difficult. Avoid submenus of submenus as they can be difficult to invoke or remember.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use to display commands.</li>
              <li>Divide groups of commands with rules.</li>
              <li>Use selection checks without icons.</li>
              <li>Provide submenus for sets of related commands that aren’t as critical as others.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use them to display content.</li>
              <li>Show commands as one large group.</li>
              <li>Mix checks and icons.</li>
              <li>Create submenus of submenus.</li>
            </ul>
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/ContextualMenu.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
