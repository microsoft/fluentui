import * as React from 'react';
import { ComboBoxBasicExample } from './examples/ComboBox.Basic.Example';
import { ComboBoxTogglesExample } from './examples/ComboBox.Toggles.Example';
import { ComboBoxControlledExample } from './examples/ComboBox.Controlled.Example';
import { ComboBoxVirtualizedExample } from './examples/ComboBox.Virtualized.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { ComboBoxCustomStyledExample } from './examples/ComboBox.CustomStyled.Example';
import { ComboBoxStatus } from './ComboBox.checklist';

const ComboBoxBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.Basic.Example.tsx') as string;
const ComboBoxBasicExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/ComboBox/ComboBox.Basic.Example.Codepen.txt') as string;

const ComboBoxTogglesExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.Toggles.Example.tsx') as string;
const ComboBoxTogglesExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/ComboBox/ComboBox.Toggles.Example.Codepen.txt') as string;

const ComboBoxControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.Controlled.Example.tsx') as string;
const ComboBoxControlledExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/ComboBox/ComboBox.Controlled.Example.Codepen.txt') as string;

const ComboBoxVirtualizedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.Virtualized.Example.tsx') as string;
const ComboBoxVirtualizedExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/ComboBox/ComboBox.Virtualized.Example.Codepen.txt') as string;

const ComboBoxCustomStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.CustomStyled.Example.tsx') as string;
const ComboBoxCustomStyledExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/ComboBox/ComboBox.CustomStyled.Example.Codepen.txt') as string;

export const ComboBoxPageProps: IDocPageProps = {
  title: 'ComboBox',
  componentName: 'ComboBox',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ComboBox',
  componentStatus: ComboBoxStatus,
  examples: [
    {
      title: 'Basic uncontrolled ComboBox',
      code: ComboBoxBasicExampleCode,
      view: <ComboBoxBasicExample />,
      codepenJS: ComboBoxBasicExampleCodepen
    },
    {
      title: 'ComboBox with toggleable autoComplete and allowFreeform',
      code: ComboBoxTogglesExampleCode,
      view: <ComboBoxTogglesExample />,
      codepenJS: ComboBoxTogglesExampleCodepen
    },
    {
      title: 'Controlled ComboBox',
      code: ComboBoxControlledExampleCode,
      view: <ComboBoxControlledExample />,
      codepenJS: ComboBoxControlledExampleCodepen
    },
    {
      title: 'VirtualizedComboBox',
      code: ComboBoxVirtualizedExampleCode,
      view: <ComboBoxVirtualizedExample />,
      codepenJS: ComboBoxVirtualizedExampleCodepen
    },
    {
      title: 'ComboBox with custom styling',
      code: ComboBoxCustomStyledExampleCode,
      view: <ComboBoxCustomStyledExample />,
      codepenJS: ComboBoxCustomStyledExampleCodepen
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
