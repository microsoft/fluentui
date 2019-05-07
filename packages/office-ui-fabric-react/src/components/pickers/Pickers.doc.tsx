import * as React from 'react';
import { PickerCustomResultExample } from './examples/Picker.CustomResult.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { TagPickerBasicExample } from './examples/TagPicker.Basic.Example';

const TagPickerExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/examples/TagPicker.Basic.Example.tsx') as string;
const PickerCustomResultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/examples/Picker.CustomResult.Example.tsx') as string;

export const PickersPageProps: IDocPageProps = {
  title: 'Pickers',
  componentName: 'Pickers',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Pickers',
  examples: [
    {
      title: 'Tag Picker',
      code: TagPickerExampleCode,
      view: <TagPickerBasicExample />
    },
    {
      title: 'Custom Picker (Document Picker)',
      code: PickerCustomResultExampleCode,
      view: <PickerCustomResultExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/pickers/docs/PickersOverview.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
