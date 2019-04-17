import * as React from 'react';
import { NavBasicExample } from './examples/Nav.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { NavFabricDemoAppExample } from './examples/Nav.FabricDemoApp.Example';
import { NavNestedExample } from './examples/Nav.Nested.Example';
import { NavStatus } from './Nav.checklist';
import { NavCustomGroupHeadersExample } from 'office-ui-fabric-react/lib/components/Nav/examples/Nav.CustomGroupHeaders.Example';

const NavBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.Basic.Example.tsx') as string;
const NavBasicExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.Basic.Example.tsx') as string;
const NavFabricDemoAppExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.FabricDemoApp.Example.tsx') as string;
const NavFabricDemoAppExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.FabricDemoApp.Example.tsx') as string;
const NavNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.Nested.Example.tsx') as string;
const NavNestedExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.Nested.Example.tsx') as string;
const NavCustomGroupHeadersExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.CustomGroupHeaders.Example.tsx') as string;
const NavCustomGroupHeadersExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.CustomGroupHeaders.Example.tsx') as string;

export const NavPageProps: IDocPageProps = {
  title: 'Nav',
  componentName: 'Nav',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Nav',
  componentStatus: NavStatus,
  examples: [
    {
      title: 'Basic nav with sample links',
      code: NavBasicExampleCode,
      codepenJS: NavBasicExampleCodepen,
      view: <NavBasicExample />
    },
    {
      title: 'Nav similar to the one in this demo app',
      code: NavFabricDemoAppExampleCode,
      codepenJS: NavFabricDemoAppExampleCodepen,
      view: <NavFabricDemoAppExample />
    },
    {
      title: 'Nav with nested links',
      code: NavNestedExampleCode,
      codepenJS: NavNestedExampleCodepen,
      view: <NavNestedExample />
    },
    {
      title: 'Nav with custom group header',
      code: NavCustomGroupHeadersExampleCode,
      codepenJS: NavCustomGroupHeadersExampleCodepen,
      view: <NavCustomGroupHeadersExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Nav/Nav.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Nav/docs/NavOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Nav/docs/NavDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Nav/docs/NavDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
