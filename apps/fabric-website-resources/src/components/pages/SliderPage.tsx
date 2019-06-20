import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { SliderPageProps } from 'office-ui-fabric-react/lib/components/Slider/Slider.doc';

export const SliderPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Slider.page.json')}
    {...{ ...SliderPageProps, ...props }}
  />
);
