import * as React from 'react';
import { SpinButtonBasicExample } from 'office-ui-fabric-react/lib/components/SpinButton/examples/SpinButton.Basic.Example';
import { DemoPage } from '../DemoPage';
import { IDemoPageProps } from '../DemoPage.types';
import { SpinButtonBasicDisabledExample } from 'office-ui-fabric-react/lib/components/SpinButton/examples/SpinButton.BasicDisabled.Example';
import { SpinButtonStatefulExample } from 'office-ui-fabric-react/lib/components/SpinButton/examples/SpinButton.Stateful.Example';
import { SpinButtonBasicWithIconExample } from 'office-ui-fabric-react/lib/components/SpinButton/examples/SpinButton.BasicWithIcon.Example';
import { SpinButtonBasicWithIconDisabledExample } from 'office-ui-fabric-react/lib/components/SpinButton/examples/SpinButton.BasicWithIconDisabled.Example';
import { SpinButtonBasicWithEndPositionExample } from 'office-ui-fabric-react/lib/components/SpinButton/examples/SpinButton.BasicWithEndPosition.Example';
import { SpinButtonCustomStyledExample } from 'office-ui-fabric-react/lib/components/SpinButton/examples/SpinButton.CustomStyled.Example';
import { SpinButtonStatus } from 'office-ui-fabric-react/lib/components/SpinButton/SpinButton.checklist';

const SpinButtonBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.Basic.Example.tsx') as string;
const SpinButtonBasicDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicDisabled.Example.tsx') as string;
const SpinButtonStatefulExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.Stateful.Example.tsx') as string;
const SpinButtonBasicWithIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithIcon.Example.tsx') as string;
const SpinButtonBasicWithIconDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithIconDisabled.Example.tsx') as string;
const SpinButtonBasicWithEndPositionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithEndPosition.Example.tsx') as string;
const SpinButtonCustomStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.CustomStyled.Example.tsx') as string;

export const SpinButtonPageProps: IDemoPageProps = {
  title: 'SpinButton',
  componentName: 'SpinButton',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/SpinButton',
  componentStatus: SpinButtonStatus,
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
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/SpinButton.types.ts')
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonDonts.md'),
  isHeaderVisible: true
};

export const SpinButtonPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...SpinButtonPageProps, ...props }} />
);
