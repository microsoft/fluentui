import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListAnimationPageProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.doc';

export const DetailsListAnimationPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListAnimationPageProps, ...props }} />
);
