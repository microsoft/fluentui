import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { SwatchColorPickerPageProps } from '@fluentui/react-examples/lib/react/SwatchColorPicker/SwatchColorPicker.doc';

export const SwatchColorPickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/SwatchColorPicker.page.json')}
    {...{ ...SwatchColorPickerPageProps, ...props }}
  />
);
