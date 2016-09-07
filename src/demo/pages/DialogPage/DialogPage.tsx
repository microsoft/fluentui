import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { DialogBasicExample } from './examples/Dialog.Basic.Example';
import { DialogLargeHeaderExample } from './examples/Dialog.LargeHeader.Example';
import { DialogCloseExample } from './examples/Dialog.Close.Example';
import { DialogBlockingExample } from './examples/Dialog.Blocking.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const DialogBasicExampleCode = require('./examples/Dialog.Basic.Example.tsx');
const DialogLargeHeaderExampleCode = require('./examples/Dialog.LargeHeader.Example.tsx');
const DialogCloseExampleCode = require('./examples/Dialog.Close.Example.tsx');
const DialogBlockingExampleCode = require('./examples/Dialog.Blocking.Example.tsx');

export class DialogPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Dialog');
  }

  public render() {
    return (
      <ComponentPage
        title='Dialog'
        componentName='DialogExample'
        exampleCards={
          [
            <ExampleCard title='Dialog' code={ DialogBasicExampleCode }>
              <DialogBasicExample />
            </ExampleCard>,
            <ExampleCard title='Dialog Large Header' code={ DialogLargeHeaderExampleCode }>
              <DialogLargeHeaderExample />
            </ExampleCard>,
            <ExampleCard title='Dialog Close' code={ DialogCloseExampleCode }>
              <DialogCloseExample />
            </ExampleCard>,
            <ExampleCard title='Dialog Blocking' code={ DialogBlockingExampleCode }>
              <DialogBlockingExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Dialog' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/dialog'>Dialogs</Link>
            <span> are used to render a modal window.</span>
          </div>
        }
        route={ this._url }
        showHeader={ this.props.showHeader }>
      </ComponentPage>
    );
  }
}
