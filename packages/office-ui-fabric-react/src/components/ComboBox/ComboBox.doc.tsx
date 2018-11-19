import * as React from 'react';
import { ComboBoxBasicExample } from './examples/ComboBox.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { ComboBoxCustomStyledExample } from './examples/ComboBox.CustomStyled.Example';
import { ComboBoxStatus } from './ComboBox.checklist';

const ComboBoxBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.Basic.Example.tsx') as string;
const ComboBoxBasicExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/ComboBox/ComboBox.Basic.Example.Codepen.txt') as string;
const ComboBoxCustomStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.CustomStyled.Example.tsx') as string;

export const ComboBoxPageProps: IDocPageProps = {
  title: 'ComboBox',
  componentName: 'ComboBox',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ComboBox',
  componentStatus: ComboBoxStatus,
  examples: [
    {
      title: 'ComboBox',
      code: ComboBoxBasicExampleCode,
      view: <ComboBoxBasicExample />,
      codepenJS: ComboBoxBasicExampleCodepen
    },
    {
      title: 'ComboBoxCustomStyled',
      code: ComboBoxCustomStyledExampleCode,
      view: <ComboBoxCustomStyledExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/ComboBox/ComboBox.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/ComboBox/docs/ComboBoxOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/ComboBox/docs/ComboBoxDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/ComboBox/docs/ComboBoxDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
