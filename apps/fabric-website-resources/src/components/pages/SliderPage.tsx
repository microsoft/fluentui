import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { SliderPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/Slider/Slider.doc';

export const SliderPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Slider.page.json')}
    {...{ ...SliderPageProps, ...props }}
  />
);
