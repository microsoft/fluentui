import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { SliderPageProps } from 'office-ui-fabric-react/lib/components/Slider/Slider.doc';

export const SliderPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...SliderPageProps, ...props }} />;
