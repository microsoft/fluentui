import * as React from 'react';

import { BreadcrumbBasicExample } from './examples/Breadcrumb.Basic.Example';
import { BreadcrumbStaticExample } from './examples/Breadcrumb.Static.Example';
import { IDocPageProps } from '../../common/DocPage.types';

const BreadcrumbBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/examples/Breadcrumb.Basic.Example.tsx') as string;
const BreadcrumbBasicExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Breadcrumb/examples/Breadcrumb.Basic.Example.tsx') as string;
const BreadcrumbStaticExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/examples/Breadcrumb.Static.Example.tsx') as string;
const BreadcrumbStaticExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Breadcrumb/examples/Breadcrumb.Static.Example.tsx') as string;
export const BreadcrumbPageProps: IDocPageProps = {
  title: 'Breadcrumb',
  componentName: 'Breadcrumb',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Breadcrumb',
  examples: [
    {
      title: 'Default Breadcrumb',
      code: BreadcrumbBasicExampleCode,
      codepenJS: BreadcrumbBasicExampleCodepen,
      view: <BreadcrumbBasicExample />
    },
    {
      title: 'Breadcrumb with static width ',
      code: BreadcrumbStaticExampleCode,
      view: <BreadcrumbStaticExample />,
      codepenJS: BreadcrumbStaticExampleCodepen
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/docs/BreadcrumbOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/docs/BreadcrumbDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/docs/BreadcrumbDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
