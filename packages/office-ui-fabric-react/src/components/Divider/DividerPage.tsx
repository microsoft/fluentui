import * as React from 'react';
import { VerticalDividerBasicExample } from './examples/VerticalDivider.Basic.Example';
import { DemoPage } from "../../demo/components/DemoPage";
import { IDemoPageProps } from "../../demo/components/DemoPage.types";
import { VerticalDividerCustomExample } from './examples/VerticalDivider.Custom.Example';
import { DividerStatus } from './Divider.checklist';

const VerticalDividerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Divider/examples/VerticalDivider.Basic.Example.tsx') as string;

const VerticalDividerCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Divider/examples/VerticalDivider.Custom.Example.tsx') as string;

export const DividerPageProps: IDemoPageProps = {
  title: 'Divider',
  componentName: 'Divider',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Divider',
  componentStatus: DividerStatus,
  examples: [{
    "title": "Vertical Divider",
    "code": VerticalDividerBasicExampleCode,
    "view": <VerticalDividerBasicExample />
}, {
    "title": "Custom Vertical Divider",
    "code": VerticalDividerCustomExampleCode,
    "view": <VerticalDividerCustomExample />
}],
  propertiesTablesSources: [
  require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/VerticalDivider.types.ts')
],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerOverview.md'),
  bestPractices: require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerBestPractices.md'),
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerDonts.md'),
  isHeaderVisible: true,
};

export const DividerPage = (props: { isHeaderVisible: boolean }) => (<DemoPage { ...{ ...DividerPageProps, ...props } } />);