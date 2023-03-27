import * as React from 'react';
import { ComboBoxBasicExample } from './ComboBox.Basic.Example';
import { ComboBoxFreeInputExample } from './ComboBox.FreeInput.Example';
import { ComboBoxInlineExample } from './ComboBox.Inline.Example';
import { ComboBoxTogglesExample } from './ComboBox.Toggles.Example';
import { ComboBoxControlledExample } from './ComboBox.Controlled.Example';
import { ComboBoxControlledMultiExample } from './ComboBox.ControlledMulti.Example';
import { ComboBoxSelectAllExample } from './ComboBox.SelectAll.Example';
import { ComboBoxVirtualizedExample } from './ComboBox.Virtualized.Example';
import { ComboBoxErrorHandlingExample } from './ComboBox.ErrorHandling.Example';
import { ComboBoxCustomStyledExample } from './ComboBox.CustomStyled.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

const ComboBoxBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ComboBox/ComboBox.Basic.Example.tsx') as string;
const ComboBoxFreeInputExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ComboBox/ComboBox.FreeInput.Example.tsx') as string;
const ComboBoxInlineExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ComboBox/ComboBox.Inline.Example.tsx') as string;
const ComboBoxTogglesExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ComboBox/ComboBox.Toggles.Example.tsx') as string;
const ComboBoxControlledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ComboBox/ComboBox.Controlled.Example.tsx') as string;
const ComboBoxControlledMultiExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ComboBox/ComboBox.ControlledMulti.Example.tsx') as string;
const ComboBoxSelectAllExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ComboBox/ComboBox.SelectAll.Example.tsx') as string;
const ComboBoxVirtualizedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ComboBox/ComboBox.Virtualized.Example.tsx') as string;
const ComboBoxErrorHandlingExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ComboBox/ComboBox.ErrorHandling.Example.tsx') as string;
const ComboBoxCustomStyledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ComboBox/ComboBox.CustomStyled.Example.tsx') as string;

export const ComboBoxPageProps: IDocPageProps = {
  title: 'ComboBox',
  componentName: 'ComboBox',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/ComboBox',
  examples: [
    {
      title: 'Basic uncontrolled ComboBox',
      code: ComboBoxBasicExampleCode,
      view: <ComboBoxBasicExample />,
    },
    {
      title: 'ComboBox with allowFreeInput',
      code: ComboBoxFreeInputExampleCode,
      view: <ComboBoxFreeInputExample />,
    },
    {
      title: 'ComboBox with inline dropdown',
      code: ComboBoxInlineExampleCode,
      view: <ComboBoxInlineExample />,
    },
    {
      title: 'ComboBox with toggleable autoComplete and allowFreeform',
      code: ComboBoxTogglesExampleCode,
      view: <ComboBoxTogglesExample />,
    },
    {
      title: 'Controlled ComboBox',
      code: ComboBoxControlledExampleCode,
      view: <ComboBoxControlledExample />,
    },
    {
      title: 'Controlled multi-select ComboBox',
      code: ComboBoxControlledMultiExampleCode,
      view: <ComboBoxControlledMultiExample />,
    },
    {
      title: 'ComboBox with select all option',
      code: ComboBoxSelectAllExampleCode,
      view: <ComboBoxSelectAllExample />,
    },
    {
      title: 'VirtualizedComboBox',
      code: ComboBoxVirtualizedExampleCode,
      view: <ComboBoxVirtualizedExample />,
    },
    {
      title: 'ComboBox with error handling',
      code: ComboBoxErrorHandlingExampleCode,
      view: <ComboBoxErrorHandlingExample />,
    },
    {
      title: 'ComboBox with custom styling',
      code: ComboBoxCustomStyledExampleCode,
      view: <ComboBoxCustomStyledExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ComboBox/docs/ComboBoxOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ComboBox/docs/ComboBoxBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
