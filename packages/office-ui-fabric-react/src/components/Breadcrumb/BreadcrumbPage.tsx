import * as React from 'react';

import { DemoPage } from "../../demo/components/DemoPage";
import { IDemoPageProps } from "../../demo/components/DemoPage.types";
import { BreadcrumbStatus } from './Breadcrumb.checklist';
import { BreadcrumbBasicExample } from './examples/Breadcrumb.Basic.Example';
import { BreadcrumbStaticExample } from './examples/Breadcrumb.Static.Example';

const BreadcrumbBasicExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/examples/Breadcrumb.Basic.Example.tsx'
) as string;
const BreadcrumbStaticExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/examples/Breadcrumb.Static.Example.tsx'
) as string;
export const BreadcrumbPageProps: IDemoPageProps = {
  title: 'Breadcrumb',
  componentName: 'Breadcrumb',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Breadcrumb',
  componentStatus: BreadcrumbStatus,
  examples: [{
    "title": "Default Breadcrumb",
    "code": BreadcrumbBasicExampleCode,
    "view": <BreadcrumbBasicExample />
}, {
    "title": "Breadcrumb with static width ",
    "code": BreadcrumbStaticExampleCode,
    "view": <BreadcrumbStaticExample />
}],
  propertiesTablesSources: [
  require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/Breadcrumb.types.ts')
],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/docs/BreadcrumbOverview.md'),
  bestPractices: "",
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/docs/BreadcrumbDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/docs/BreadcrumbDonts.md'),
  isHeaderVisible: true,
};

export const BreadcrumbPage = (props: { isHeaderVisible: boolean }) => (<DemoPage { ...{ ...BreadcrumbPageProps, ...props } } />);