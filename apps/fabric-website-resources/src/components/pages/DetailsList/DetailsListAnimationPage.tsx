import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListAnimationPageProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListAnimationPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListAnimationPageProps, ...props }} />
);
