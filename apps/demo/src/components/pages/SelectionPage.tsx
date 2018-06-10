import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { SelectionPageProps } from 'office-ui-fabric-react/lib/utilities/Selection/Selection.doc';

export const SelectionPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...SelectionPageProps, ...props }} />
);
