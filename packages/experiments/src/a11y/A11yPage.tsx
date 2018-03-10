import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
} from '@uifabric/example-app-base';

import A11yManager from './a11yManager/A11yManager';
import ArrowNavigation from './a11yManager/ArrowNavigation';

export class A11yPage extends React.Component<IComponentDemoPageProps, {}> {
  private _a11yManager: A11yManager | undefined;

  public componentDidMount(): void {
    this._a11yManager = A11yManager.create(document.body, {
      prefix: 'a11y'  // only reads attributes starting with data-a11y-...
    });
    this._a11yManager!.registerNavigationMode(ArrowNavigation);
  }

  public render(): JSX.Element {
    return (
      <ComponentPage
        title='A11y'
        componentName='A11yExample'
        exampleCards={
          <div>
            <ExampleCard title='Arrow Navigation Simple Example'>
              <div>
                <button>Element Before</button>
                <p>A simple menu. Both left/right and up/down keys work.</p>
                <div data-a11y-mode='Arrow'>
                  <button>Item 1</button><button>Item 2</button><button>Item 3</button><button>Item 4</button>
                </div>
                <button>Element After</button>
              </div>
            </ExampleCard>

            <ExampleCard title='Arrow Navigation Advanced Example'>
              <div>
                <button>Element Before</button>
                <p>A vertical menu of horizontal submenus. (Embedded zones)</p>
                <div data-a11y-mode='Arrow' data-a11y-modeparams='vertical' data-a11y-id='arrowzone'>
                  <div data-a11y-mode='Arrow' data-a11y-modeparams='horizontal'>
                    SubMenu 1:
                    <button>Item 1</button><button>Item 2</button><button>Item 3</button><button>Item 4</button>
                  </div>
                  <div data-a11y-mode='Arrow' data-a11y-modeparams='horizontal'>
                    SubMenu 2:
                    <button>Item 1</button><button>Item 2</button><button>Item 3</button><button>Item 4</button>
                  </div>
                  <div data-a11y-mode='Arrow' data-a11y-modeparams='horizontal'>
                    SubMenu 3:
                    <button>Item 1</button><button>Item 2</button><button>Item 3</button><button>Item 4</button>
                  </div>
                </div>
                <button>Element After</button>
              </div>
            </ExampleCard>
          </div>
        }
        /* tslint:disable:max-line-length */
        overview={
          <div>
            <p>
              You can use arrows in the menu to navigate between the items. The whole menu is a single tabstop. This is implemented as a Navigation Mode for our a11y platform.
            </p>
          </div>
        }
        /* tslint:enable:max-line-length */
        related={
          <a href='https://dev.office.com/fabric-js/Components/CommandBar/CommandBar.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }

}
