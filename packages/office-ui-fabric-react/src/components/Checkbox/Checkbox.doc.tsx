import * as React from 'react';
import { CheckboxBasicExample } from './examples/Checkbox.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { CheckboxImplementationExamples } from './examples/Checkbox.ImplementationExamples';
import { CheckboxStatus } from './Checkbox.checklist';

const CheckboxBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Checkbox/examples/Checkbox.Basic.Example.tsx') as string;
const CheckboxBasicExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Checkbox/Checkbox.Basic.Example.Codepen.txt') as string;
const CheckboxImplementationExamplesCode = require('!raw-loader!office-ui-fabric-react/src/components/Checkbox/examples/Checkbox.ImplementationExamples.tsx') as string;
export const CheckboxPageProps: IDocPageProps = {
  title: 'Checkbox',
  componentName: 'Checkbox',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Checkbox',
  componentStatus: CheckboxStatus,
  examples: [
    {
      title: 'Default Checkbox',
      code: CheckboxBasicExampleCode,
      view: <CheckboxBasicExample />,
      codepenJS: CheckboxBasicExampleCodepen
    },
    {
      title: 'Implementation Examples',
      code: CheckboxImplementationExamplesCode,
      view: <CheckboxImplementationExamples />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Checkbox/Checkbox.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Checkbox/docs/CheckboxOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Checkbox/docs/CheckboxDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Checkbox/docs/CheckboxDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
