import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListNavigatingFocusPageProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.doc';

export const DetailsListNavigatingFocusPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListNavigatingFocusPageProps, ...props }} />
);
