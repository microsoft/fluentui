import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { SelectionPageProps } from '@fluentui/react-examples/lib/react/Selection/Selection.doc';

export const SelectionPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...SelectionPageProps, ...props }} />
);
