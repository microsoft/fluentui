import * as React from 'react';
import { PickerCustomResultExample } from './Picker.CustomResult.Example';

import { IDocPageProps } from '@fluentui/react-internal/lib/common/DocPage.types';
import { TagPickerBasicExample } from './TagPicker.Basic.Example';

const TagPickerExampleCode = require('!raw-loader!@fluentui/react-examples/src/react/Pickers/TagPicker.Basic.Example.tsx') as string;
const PickerCustomResultExampleCode = require('!raw-loader!@fluentui/react-examples/src/react/Pickers/Picker.CustomResult.Example.tsx') as string;

export const PickersPageProps: IDocPageProps = {
  title: 'Pickers',
  componentName: 'Pickers',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-internal/src/components/Pickers',
  examples: [
    {
      title: 'Tag Picker',
      code: TagPickerExampleCode,
      view: <TagPickerBasicExample />,
    },
    {
      title: 'Custom Picker (Document Picker)',
      code: PickerCustomResultExampleCode,
      view: <PickerCustomResultExample />,
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/react-examples/src/react/Pickers/docs/PickersOverview.md'),
  bestPractices: require<string>('!raw-loader!@fluentui/react-examples/src/react/Pickers/docs/PickersBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
