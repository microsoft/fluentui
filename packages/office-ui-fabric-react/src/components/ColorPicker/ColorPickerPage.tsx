import * as React from 'react';
import { ColorPickerBasicExample } from './examples/ColorPicker.Basic.Example';
import { DemoPage } from '../../demo/components/DemoPage';
import { IDemoPageProps } from '../../demo/components/DemoPage.types';
import { ColorPickerStatus } from './ColorPicker.checklist';

const ColorPickerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ColorPicker/examples/ColorPicker.Basic.Example.tsx') as string;
export const ColorPickerPageProps: IDemoPageProps = {
  title: 'ColorPicker',
  componentName: 'ColorPicker',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ColorPicker',
  componentStatus: ColorPickerStatus,
  examples: [
    {
      title: 'Default ColorPicker',
      code: ColorPickerBasicExampleCode,
      view: <ColorPickerBasicExample />
    }
  ],
  propertiesTablesSources: [
    require<
      string
    >('!raw-loader!office-ui-fabric-react/src/components/ColorPicker/ColorPicker.types.ts')
  ],
  overview: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/ColorPicker/docs/ColorPickerOverview.md'),
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true
};

export const ColorPickerPage = (props: { isHeaderVisible: boolean }) =>
  <DemoPage {...{ ...ColorPickerPageProps, ...props }} />;
