import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import NavProps from './NavProps';

import NavBasicExample from './examples/Nav.Basic.Example';
import NavFabricDemoAppExample from './examples/Nav.FabricDemoApp.Example';
import NavNestedExample from './examples/Nav.Nested.Example';

let NavBasicExampleCode = require('./examples/Nav.Basic.Example.tsx');
let NavFabricDemoAppExampleCode = require('./examples/Nav.FabricDemoApp.Example.tsx');
let NavNestedExampleCode = require('./examples/Nav.Nested.Example.tsx');

export default class NavPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='NavExample'>
        <h1 className='ms-font-xxl'>Nav</h1>

        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/Nav'>Navs</Link>
          <span> provide a navigation control to expose internal and external links. Navigation bars typically are rendered vertically to the side of the page content.</span>
        </div>

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Basic Nav with one link' code={ NavBasicExampleCode }>
          <NavBasicExample />
        </ExampleCard>

        <ExampleCard title='Navigation menu used in this Fabric React demo app' code={ NavFabricDemoAppExampleCode }>
          <NavFabricDemoAppExample />
        </ExampleCard>

        <ExampleCard title='Nested navigation menu (without group header)' code={ NavNestedExampleCode }>
          <NavNestedExample />
        </ExampleCard>

        <PropertiesTable properties={ NavProps } />
      </div>
    );
  }

}
