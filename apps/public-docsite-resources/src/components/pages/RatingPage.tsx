import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { RatingPageProps } from '@fluentui/react-examples/lib/react/Rating/Rating.doc';

export const RatingPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/Rating.page.json')}
    {...{ ...RatingPageProps, ...props }}
  />
);
