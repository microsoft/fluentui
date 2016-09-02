import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  ComponentPage
} from '../../components/index';

import { LinkBasicExample } from './examples/Link.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';

let LinkBasicExampleCode = require('./examples/Link.Basic.Example.tsx');

export class LinkPage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState('Basic components', 'Link');
  }

  public render() {
    return (
      <ComponentPage
        title='Link'
        componentName='LinkExample'
        exampleCards={
          [
            <ExampleCard title='Link' code={ LinkBasicExampleCode }>
              <LinkBasicExample />
            </ExampleCard>
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/link'>Links</Link>
            <span> are used as a styled replacement for A tags. All attributes valid on A tags will be passed through.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }

}
