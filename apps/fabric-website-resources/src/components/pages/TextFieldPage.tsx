import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { TextFieldPageProps } from 'office-ui-fabric-react/lib/components/TextField/TextField.doc';

export const TextFieldPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...TextFieldPageProps, ...props }} />
);
