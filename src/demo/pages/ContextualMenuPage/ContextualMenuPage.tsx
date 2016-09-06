import * as React from 'react';
import {
  Link
} from '../../../index';
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

const ContextualMenuBasicExampleCode = require('./examples/ContextualMenu.Basic.Example.tsx');
const ContextualMenuCheckmarksExampleCode = require('./examples/ContextualMenu.Checkmarks.Example.tsx');
const ContextualMenuDirectionalExampleCode = require('./examples/ContextualMenu.Directional.Example.tsx');
const ContextualMenuCustomizationExampleCode = require('./examples/ContextualMenu.Customization.Example.tsx');

export class ContextualMenuPage extends React.Component<any, any> {
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
          [
            <ExampleCard title='ContextualMenu' code= { ContextualMenuBasicExampleCode }>
              <ContextualMenuBasicExample />
            </ExampleCard>,
            <ExampleCard title='ContextualMenu checked menus example' code={ ContextualMenuCheckmarksExampleCode }>
              <ContextualMenuCheckmarksExample />
            </ExampleCard>,
            <ExampleCard title='ContextualMenu beak/direction test' code={ ContextualMenuDirectionalExampleCode }>
              <ContextualMenuDirectionalExample />
            </ExampleCard>,
            <ExampleCard title='ContextualMenu customization example' code={ ContextualMenuCustomizationExampleCode }>
              <ContextualMenuCustomizationExample />
            </ExampleCard>,
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='ContextualMenu' />,
            <PropertiesTableSet componentName='Callout' renderOnly={ ['DirectionalHint'] } />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/contextualMenu'>ContextualMenus</Link>
            <span> provide a menu for use in context menus and dropdowns.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }
}
