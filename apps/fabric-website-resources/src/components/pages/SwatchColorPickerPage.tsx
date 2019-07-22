import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { SwatchColorPickerPageProps } from 'office-ui-fabric-react/lib/components/SwatchColorPicker/SwatchColorPicker.doc';

export const SwatchColorPickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/SwatchColorPicker.page.json')}
    {...{ ...SwatchColorPickerPageProps, ...props }}
  />
);
