import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { SliderPageProps } from '@fluentui/react-examples/lib/react-slider/Slider/Slider.doc';

export const SliderPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/Slider.page.json')}
    {...{ ...SliderPageProps, ...props }}
  />
);
