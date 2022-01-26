import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { SliderPageProps } from '@fluentui/react-examples/lib/react/Slider/Slider.doc';

export const SliderPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Slider.page.json')} {...{ ...SliderPageProps, ...props }} />
);
