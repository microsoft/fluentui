import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { ColorPickerPageProps } from 'office-ui-fabric-react/lib/components/ColorPicker/ColorPicker.doc';

export const ColorPickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...ColorPickerPageProps, ...props }} />
);
