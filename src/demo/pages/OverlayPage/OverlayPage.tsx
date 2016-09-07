import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { OverlayBasicExample } from './examples/Overlay.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';

const OverlayBasicExampleCode = require('./examples/Overlay.Basic.Example.tsx');

export class OverlayPage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Overlay');
  }

  public render() {
    return (
      <ComponentPage
        title='Overlay'
        componentName='OverlayExample'
        exampleCards={
          [
            <ExampleCard title='Overlay' code={ OverlayBasicExampleCode }>
              <OverlayBasicExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Overlay' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/Overlay'>Overlays</Link>
            <span> are used to render a semi transparent overlaying div on top of content. This can be used in modal situations, such as Dialogs, which render on top of existing content.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }

}
