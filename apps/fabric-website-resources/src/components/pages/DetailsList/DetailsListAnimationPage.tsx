import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListAnimationPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListAnimationPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListAnimationPageProps, ...props }} />
);
