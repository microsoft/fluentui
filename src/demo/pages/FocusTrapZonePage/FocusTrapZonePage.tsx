import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import FocusTrapZoneBoxExample from './examples/FocusTrapZone.Box.Example';
let FocusTrapZoneBoxExampleCode = require('./examples/FocusTrapZone.Box.Example');

import FocusTrapZoneBoxExampleWithFocusableItem from './examples/FocusTrapZone.Box.FocusOnCustomElement.Example';
let FocusTrapZoneBoxExampleWithFocusableItemCode =
    require('./examples/FocusTrapZone.Box.FocusOnCustomElement.Example');
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import FocusTrapZoneBoxClickExample from './examples/FocusTrapZone.Box.Click.Example';
let FocusTrapZoneBoxClickExampleCode = require('./examples/FocusTrapZone.Box.Click.Example');

export class FocusTrapZonePage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'FocusTrapZone');
  }

  public render() {
    return (
      <ComponentPage
        title='FocusTrapZone'
        componentName='FocusTrapZoneExample'
        exampleCards={
          [
            <ExampleCard title='Simple Box' code={ FocusTrapZoneBoxExampleCode }>
              <FocusTrapZoneBoxExample />
            </ExampleCard>,
            <ExampleCard title='Simple Box with focus on custom focusable element' code={ FocusTrapZoneBoxExampleWithFocusableItemCode }>
                <FocusTrapZoneBoxExampleWithFocusableItem />
            </ExampleCard>,
            <ExampleCard title='Simple Box with Clicking outside Trap Zone enabled' code={ FocusTrapZoneBoxClickExampleCode }>
              <FocusTrapZoneBoxClickExample/>
            </ExampleCard>,
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='FocusTrapZone' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/utilities/FocusTrapZone'>FocusTrapZone</Link>
            <span> is used to trap the focus in any html element. Pressing tab will circle focus within the inner focusable elements of the FocusTrapZone.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }
}
