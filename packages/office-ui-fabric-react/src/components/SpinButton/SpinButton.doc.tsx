import * as React from 'react';
import { SpinButtonBasicExample } from './examples/SpinButton.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { SpinButtonBasicDisabledExample } from './examples/SpinButton.BasicDisabled.Example';
import { SpinButtonBasicWithEndPositionExample } from './examples/SpinButton.BasicWithEndPosition.Example';
import { SpinButtonCustomStyledExample } from './examples/SpinButton.CustomStyled.Example';
import { SpinButtonCustomValidateExample } from './examples/SpinButton.CustomValidate.Example';
import { SpinButtonStatus } from './SpinButton.checklist';

const SpinButtonBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.Basic.Example.tsx') as string;
const SpinButtonBasicExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/SpinButton/SpinButton.Basic.Example.Codepen.txt') as string;
const SpinButtonBasicDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicDisabled.Example.tsx') as string;
const SpinButtonBasicWithEndPositionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithEndPosition.Example.tsx') as string;
const SpinButtonCustomStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.CustomStyled.Example.tsx') as string;
const SpinButtonCustomValidateExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.CustomValidate.Example.tsx') as string;

export const SpinButtonPageProps: IDocPageProps = {
  title: 'SpinButton',
  componentName: 'SpinButton',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/SpinButton',
  componentStatus: SpinButtonStatus,
  examples: [
    {
      title: 'Basic SpinButton',
      code: SpinButtonBasicExampleCode,
      view: <SpinButtonBasicExample />,
      codepenJS: SpinButtonBasicExampleCodepen
    },
    {
      title: 'Basic Disabled SpinButton',
      code: SpinButtonBasicDisabledExampleCode,
      view: <SpinButtonBasicDisabledExample />
    },
    {
      title: 'Basic SpinButton With Icon and Positioned at the End',
      code: SpinButtonBasicWithEndPositionExampleCode,
      view: <SpinButtonBasicWithEndPositionExample />
    },
    {
      title: 'Custom Styled SpinButton',
      code: SpinButtonCustomStyledExampleCode,
      view: <SpinButtonCustomStyledExample />
    },
    {
      title: 'Custom Validate SpinButton',
      code: SpinButtonCustomValidateExampleCode,
      view: <SpinButtonCustomValidateExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/SpinButton.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
