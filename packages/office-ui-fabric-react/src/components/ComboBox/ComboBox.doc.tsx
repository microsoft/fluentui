import * as React from 'react';
import { ComboBoxBasicExample } from './examples/ComboBox.Basic.Example';
import { ComboBoxTogglesExample } from './examples/ComboBox.Toggles.Example';
import { ComboBoxControlledExample } from './examples/ComboBox.Controlled.Example';
import { ComboBoxVirtualizedExample } from './examples/ComboBox.Virtualized.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { ComboBoxCustomStyledExample } from './examples/ComboBox.CustomStyled.Example';

const ComboBoxBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.Basic.Example.tsx') as string;

const ComboBoxTogglesExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.Toggles.Example.tsx') as string;

const ComboBoxControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.Controlled.Example.tsx') as string;

const ComboBoxVirtualizedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.Virtualized.Example.tsx') as string;

const ComboBoxCustomStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.CustomStyled.Example.tsx') as string;

export const ComboBoxPageProps: IDocPageProps = {
  title: 'ComboBox',
  componentName: 'ComboBox',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ComboBox',
  examples: [
    {
      title: 'Basic uncontrolled ComboBox',
      code: ComboBoxBasicExampleCode,
      view: <ComboBoxBasicExample />
    },
    {
      title: 'ComboBox with toggleable autoComplete and allowFreeform',
      code: ComboBoxTogglesExampleCode,
      view: <ComboBoxTogglesExample />
    },
    {
      title: 'Controlled ComboBox',
      code: ComboBoxControlledExampleCode,
      view: <ComboBoxControlledExample />
    },
    {
      title: 'VirtualizedComboBox',
      code: ComboBoxVirtualizedExampleCode,
      view: <ComboBoxVirtualizedExample />
    },
    {
      title: 'ComboBox with custom styling',
      code: ComboBoxCustomStyledExampleCode,
      view: <ComboBoxCustomStyledExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/ComboBox/docs/ComboBoxOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/ComboBox/docs/ComboBoxDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/ComboBox/docs/ComboBoxDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
