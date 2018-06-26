import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { SpinButtonPageProps } from 'office-ui-fabric-react/lib/components/SpinButton/SpinButton.doc';

export const SpinButtonPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...SpinButtonPageProps, ...props }} />
);
