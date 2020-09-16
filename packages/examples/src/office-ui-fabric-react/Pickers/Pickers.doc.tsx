import * as React from 'react';
import { PickerCustomResultExample } from './examples/Picker.CustomResult.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { TagPickerBasicExample } from './examples/TagPicker.Basic.Example';

const TagPickerExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Pickers/examples/TagPicker.Basic.Example.tsx') as string;
const PickerCustomResultExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Pickers/examples/Picker.CustomResult.Example.tsx') as string;

export const PickersPageProps: IDocPageProps = {
  title: 'Pickers',
  componentName: 'Pickers',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Pickers',
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
  overview: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Pickers/docs/PickersOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Pickers/docs/PickersBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
