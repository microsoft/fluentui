import * as React from 'react';
import { PickerCustomResultExample } from './Picker.CustomResult.Example';
import { TagPickerCustomRemoveIconExample } from './TagPicker.CustomRemoveIcon.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { TagPickerBasicExample } from './TagPicker.Basic.Example';
import { TagPickerInlineExample } from './TagPicker.Inline.Example';

const TagPickerExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Pickers/TagPicker.Basic.Example.tsx') as string;
const TagPickerInlineExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Pickers/TagPicker.Inline.Example.tsx') as string;
const PickerCustomResultExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Pickers/Picker.CustomResult.Example.tsx') as string;
const TagPickerCustomRemoveIconExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Pickers/TagPicker.CustomRemoveIcon.Example.tsx') as string;

export const PickersPageProps: IDocPageProps = {
  title: 'Pickers',
  componentName: 'Pickers',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Pickers',
  examples: [
    {
      title: 'Tag Picker',
      code: TagPickerExampleCode,
      view: <TagPickerBasicExample />,
    },
    {
      title: 'Tag Picker with inline suggestions',
      code: TagPickerInlineExampleCode,
      view: <TagPickerInlineExample />,
    },
    {
      title: 'Custom Picker (Document Picker)',
      code: PickerCustomResultExampleCode,
      view: <PickerCustomResultExample />,
    },
    {
      title: 'Custom Remove Icon',
      code: TagPickerCustomRemoveIconExampleCode,
      view: <TagPickerCustomRemoveIconExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Pickers/docs/PickersOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Pickers/docs/PickersBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
