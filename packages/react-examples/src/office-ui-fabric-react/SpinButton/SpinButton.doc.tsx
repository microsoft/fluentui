import * as React from 'react';
import { SpinButtonBasicExample } from './SpinButton.Basic.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { SpinButtonBasicDisabledExample } from './SpinButton.BasicDisabled.Example';
import { SpinButtonStatefulExample } from './SpinButton.Stateful.Example';
import { SpinButtonBasicWithIconExample } from './SpinButton.BasicWithIcon.Example';
import { SpinButtonBasicWithIconDisabledExample } from './SpinButton.BasicWithIconDisabled.Example';
import { SpinButtonBasicWithEndPositionExample } from './SpinButton.BasicWithEndPosition.Example';
import { SpinButtonCustomStyledExample } from './SpinButton.CustomStyled.Example';

const SpinButtonBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/SpinButton/SpinButton.Basic.Example.tsx') as string;
const SpinButtonBasicDisabledExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/SpinButton/SpinButton.BasicDisabled.Example.tsx') as string;
const SpinButtonStatefulExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/SpinButton/SpinButton.Stateful.Example.tsx') as string;
const SpinButtonBasicWithIconExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/SpinButton/SpinButton.BasicWithIcon.Example.tsx') as string;
const SpinButtonBasicWithIconDisabledExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/SpinButton/SpinButton.BasicWithIconDisabled.Example.tsx') as string;
const SpinButtonBasicWithEndPositionExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/SpinButton/SpinButton.BasicWithEndPosition.Example.tsx') as string;
const SpinButtonCustomStyledExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/SpinButton/SpinButton.CustomStyled.Example.tsx') as string;

export const SpinButtonPageProps: IDocPageProps = {
  title: 'SpinButton',
  componentName: 'SpinButton',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/7.0/packages/office-ui-fabric-react/src/components/SpinButton',
  examples: [
    {
      title: 'Basic SpinButton',
      code: SpinButtonBasicExampleCode,
      view: <SpinButtonBasicExample />,
    },
    {
      title: 'Basic Disabled SpinButton',
      code: SpinButtonBasicDisabledExampleCode,
      view: <SpinButtonBasicDisabledExample />,
    },
    {
      title: 'Stateful SpinButton',
      code: SpinButtonStatefulExampleCode,
      view: <SpinButtonStatefulExample />,
    },
    {
      title: 'Basic SpinButton With Icon',
      code: SpinButtonBasicWithIconExampleCode,
      view: <SpinButtonBasicWithIconExample />,
    },
    {
      title: 'Basic SpinButton With Icon Disabled',
      code: SpinButtonBasicWithIconDisabledExampleCode,
      view: <SpinButtonBasicWithIconDisabledExample />,
    },
    {
      title: 'Basic SpinButton With Icon and Positioned at the End',
      code: SpinButtonBasicWithEndPositionExampleCode,
      view: <SpinButtonBasicWithEndPositionExample />,
    },
    {
      title: 'Custom Styled SpinButton',
      code: SpinButtonCustomStyledExampleCode,
      view: <SpinButtonCustomStyledExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/SpinButton/docs/SpinButtonOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/SpinButton/docs/SpinButtonBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
