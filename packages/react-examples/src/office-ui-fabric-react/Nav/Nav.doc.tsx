import * as React from 'react';
import { NavBasicExample } from './Nav.Basic.Example';
import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { NavFabricDemoAppExample } from './Nav.FabricDemoApp.Example';
import { NavNestedExample } from './Nav.Nested.Example';
import { NavCustomGroupHeadersExample } from './Nav.CustomGroupHeaders.Example';
import { NavFocusZoneExample } from './Nav.FocusZone.Example';

const NavBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Nav/Nav.Basic.Example.tsx') as string;
const NavFabricDemoAppExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Nav/Nav.FabricDemoApp.Example.tsx') as string;
const NavNestedExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Nav/Nav.Nested.Example.tsx') as string;
const NavFocusZoneExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Nav/Nav.FocusZone.Example.tsx') as string;
const NavCustomGroupHeadersExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Nav/Nav.CustomGroupHeaders.Example.tsx') as string;

export const NavPageProps: IDocPageProps = {
  title: 'Nav',
  componentName: 'Nav',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/7.0/packages/office-ui-fabric-react/src/components/Nav',
  examples: [
    {
      title: 'Basic nav with sample links',
      code: NavBasicExampleCode,
      view: <NavBasicExample />,
    },
    {
      title: 'Nav similar to the one in this demo app',
      code: NavFabricDemoAppExampleCode,
      view: <NavFabricDemoAppExample />,
    },
    {
      title: 'Nav with nested links',
      code: NavNestedExampleCode,
      view: <NavNestedExample />,
    },
    {
      title: 'Nav with FocusZone props override',
      code: NavFocusZoneExampleCode,
      view: <NavFocusZoneExample />,
    },
    {
      title: 'Nav with custom group header',
      code: NavCustomGroupHeadersExampleCode,
      view: <NavCustomGroupHeadersExample />,
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Nav/docs/NavOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Nav/docs/NavBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
