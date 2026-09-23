'use client';

import '@fluentui/react-headless-components-preview-stories/.storybook/tokens.css';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import ExampleRoute from '../components/ExampleRoute';

const HeadlessExampleRoute: ForwardRefComponent<React.ComponentProps<'main'>> = React.forwardRef((props, ref) => (
  <ExampleRoute {...props} ref={ref} collection="headless" />
));

HeadlessExampleRoute.displayName = 'HeadlessExampleRoute';
export default HeadlessExampleRoute;
