import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListKeyboardOverridesProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListKeyboardOverridesPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListKeyboardOverridesProps, ...props }} />
);
