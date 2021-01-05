import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { ColorPickerPageProps } from '@fluentui/react-examples/lib/react/ColorPicker/ColorPicker.doc';

export const ColorPickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/ColorPicker.page.json')}
    {...{ ...ColorPickerPageProps, ...props }}
  />
);
