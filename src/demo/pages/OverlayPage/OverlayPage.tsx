import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { AppState } from '../../components/App/AppState';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';
import { OverlayDarkExample } from './examples/Overlay.Dark.Example';
import { OverlayLightExample } from './examples/Overlay.Light.Example';

const OverlayLightExampleCode = require('./examples/Overlay.Light.Example.tsx');
const OverlayDarkExampleCode = require('./examples/Overlay.Dark.Example.tsx');

export class OverlayPage extends React.Component<IComponentDemoPageProps, any> {
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
          <div>
            <ExampleCard title='Light' code={ OverlayLightExampleCode }>
              <OverlayLightExample />
            </ExampleCard>
            <ExampleCard title='Dark' code={ OverlayDarkExampleCode }>
              <OverlayDarkExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet componentName='Overlay' />
        }
        overview={
          <div>
            <p>
              Overlays are used to render a semi-transparent layer on top of existing UI. Overlays help focus the user on the content that sits above the added layer and are often used to help designate a modal or blocking experience. Overlays can be seen used in conjunction with Panels and Dialogs.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use a dark Overlay with a first-run experience.</li>
              <li>Use a white Overlay for dialogs and panels.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use an Overlay when you want the user to interact with the UI that is being covered.</li>
            </ul>
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Overlay.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
