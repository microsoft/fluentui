import * as React from 'react';
import { ToggleBasicExample } from './examples/Toggle.Basic.Example';
import { ToggleCustomLabelExample } from './examples/Toggle.CustomLabel.Example';

import { IDocPageProps } from '../../common/DocPage.types';

const ToggleBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Toggle/examples/Toggle.Basic.Example.tsx') as string;
const ToggleCustomLabelExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Toggle/examples/Toggle.CustomLabel.Example.tsx') as string;

export const TogglePageProps: IDocPageProps = {
  title: 'Toggle',
  componentName: 'Toggle',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Toggle',
  examples: [
    {
      title: 'Basic Toggles',
      code: ToggleBasicExampleCode,
      view: <ToggleBasicExample />
    },
    {
      title: 'Toggles with Custom Labels',
      code: ToggleCustomLabelExampleCode,
      view: <ToggleCustomLabelExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
  nativePropsElement: 'input'
};
