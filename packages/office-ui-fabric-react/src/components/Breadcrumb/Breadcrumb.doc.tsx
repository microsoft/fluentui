import * as React from 'react';

import { BreadcrumbStatus } from './Breadcrumb.checklist';
import { BreadcrumbBasicExample } from './examples/Breadcrumb.Basic.Example';
import { BreadcrumbStaticExample } from './examples/Breadcrumb.Static.Example';
import { IDocPageProps } from '../../common/DocPage.types';

const BreadcrumbBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/examples/Breadcrumb.Basic.Example.tsx') as string;
const BreadcrumbStaticExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/examples/Breadcrumb.Static.Example.tsx') as string;
const BreadcrumbStaticExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Breadcrumb/Breadcrumb.Static.Example.Codepen.txt') as string;
export const BreadcrumbPageProps: IDocPageProps = {
  title: 'Breadcrumb',
  componentName: 'Breadcrumb',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Breadcrumb',
  componentStatus: BreadcrumbStatus,
  examples: [
    {
      title: 'Default Breadcrumb',
      code: BreadcrumbBasicExampleCode,
      view: <BreadcrumbBasicExample />
    },
    {
      title: 'Breadcrumb with static width ',
      code: BreadcrumbStaticExampleCode,
      view: <BreadcrumbStaticExample />,
      codepenJS: BreadcrumbStaticExampleCodepen
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/Breadcrumb.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/docs/BreadcrumbOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/docs/BreadcrumbDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/docs/BreadcrumbDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
