import * as React from 'react';
import { SpinButtonBasicExample } from './examples/SpinButton.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { SpinButtonBasicDisabledExample } from './examples/SpinButton.BasicDisabled.Example';
import { SpinButtonStatefulExample } from './examples/SpinButton.Stateful.Example';
import { SpinButtonBasicWithIconExample } from './examples/SpinButton.BasicWithIcon.Example';
import { SpinButtonBasicWithIconDisabledExample } from './examples/SpinButton.BasicWithIconDisabled.Example';
import { SpinButtonBasicWithEndPositionExample } from './examples/SpinButton.BasicWithEndPosition.Example';
import { SpinButtonCustomStyledExample } from './examples/SpinButton.CustomStyled.Example';

const SpinButtonBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.Basic.Example.tsx') as string;
const SpinButtonBasicDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicDisabled.Example.tsx') as string;
const SpinButtonStatefulExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.Stateful.Example.tsx') as string;
const SpinButtonBasicWithIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithIcon.Example.tsx') as string;
const SpinButtonBasicWithIconDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithIconDisabled.Example.tsx') as string;
const SpinButtonBasicWithEndPositionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithEndPosition.Example.tsx') as string;
const SpinButtonCustomStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.CustomStyled.Example.tsx') as string;

export const SpinButtonPageProps: IDocPageProps = {
  title: 'SpinButton',
  componentName: 'SpinButton',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/SpinButton',
  examples: [
    {
      title: 'Basic SpinButton',
      code: SpinButtonBasicExampleCode,
      view: <SpinButtonBasicExample />
    },
    {
      title: 'Basic Disabled SpinButton',
      code: SpinButtonBasicDisabledExampleCode,
      view: <SpinButtonBasicDisabledExample />
    },
    {
      title: 'Stateful SpinButton',
      code: SpinButtonStatefulExampleCode,
      view: <SpinButtonStatefulExample />
    },
    {
      title: 'Basic SpinButton With Icon',
      code: SpinButtonBasicWithIconExampleCode,
      view: <SpinButtonBasicWithIconExample />
    },
    {
      title: 'Basic SpinButton With Icon Disabled',
      code: SpinButtonBasicWithIconDisabledExampleCode,
      view: <SpinButtonBasicWithIconDisabledExample />
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
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
